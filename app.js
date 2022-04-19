const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

//create the express app & enable form parsing for POST and PUT requests
const app = express()
app.use(bodyParser.json())

// enable .env in dev mode
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

//enable cors for client site
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,DELETE,HEAD,OPTIONS"
}))

// db connnection
// Heroku Postgres connection
const pg = require('pg')

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
var client = new pg.Client(config)

client.connect().then((res) =>{
}).catch((err) => {
  console.log('Connection failed' + err)
})

// controller reference
const products = require('./controllers/products')
const req = require('express/lib/request')
app.use('/api/products', products)

// route all http request to our single page index.html from the angular bundle we copied in
app.use(express.static(__dirname + '/public'))
app.get('*', (req,res) => {
  res.sendFile(__dirname + '/public/index.html')
})

//start server & make public
const port = process.env.PORT || 3000
app.listen(port)
module.exports = app
