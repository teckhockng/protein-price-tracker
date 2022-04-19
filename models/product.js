// use PG module to to interact with Heroku Postgres
const pg = require('pg')

//if not in production mode, use .env file for db connection string
if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

//try to connect
const config = {
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false
  }
}
const pool = new pg.Pool(config)

pool.connect().then((res) =>{
  console.log('Connection succeed')
}).catch(() => {
  console.log('Connection failed')
})

// create a connection to Heroku POstgres
// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false
//   }
// });
//
// client.connect();

// query database to display information on the website
// client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
//   if (err) throw err;
//   for (let row of res.rows) {
//     console.log(JSON.stringify(row));
//   }
//   client.end();
// });

// make the model public so the controller can use it for CRUD
module.exports = pool
// {
//   query: (text, params) => pool.query(text, params),
// }
