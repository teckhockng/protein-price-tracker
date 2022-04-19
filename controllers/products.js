const express = require('express')
const router = express.Router()
const Product = require('../models/product')

// GET: /api/products => fetch all products
router.get('/', (req, res) => {
  // use Heroku Postgre model to fetch and return all products
  Product.query('SELECT * FROM products', (err, results) => {
    if (err){
      return res.json(err).status(400) //400: Bad request
    }
    else{
        return res.json(results["rows"]).status(200) //200: OK
    }
  })
})

// POST: /api/products => receive form post with new product data
router.post('/', (req,res) => {
  Product.query(`INSERT INTO products (product_name, price, store_name, url, weight_g) VALUES ('${req.body.name}', ${req.body.price}, '${req.body.store}', '${req.body.url}', '${req.body.weight}')`, (err, product) => {
    if (err){
      return res.json(err).status(400)
    }
    else {
      console.log(product)
      return res.json(product).status(201) // 201: Resource Created
    }
  })
})

// DELETE: /api/products/product_to_delete => delete row with the same attributes
router.delete('/:_name:_price', (req, res) => {
  Product.query(`DELETE FROM products WHERE "product_name" = '${req.body.name}' AND "price" = '${req.body.price}' AND "store_name" = '${req.body.store}' AND "url" = '${req.body.url}' AND "weight_g" = '${req.body.weight}'`, (err, product) => {
    if (err) {
      return res.json(err).status(400)
    }
    else {
      return res.json(product).status(204) // 204: No Content
    }
  })
})

// PUT: /api/products/product_to_update => update the row with the same attributes
router.put('/:name:_price', (req,res) => {
  Product.query(`UPDATE products SET "product_name" = '${req.body.product.name}',"price" = '${req.body.product.price}', "store_name" = '${req.body.product.store}', "url" = '${req.body.product.url}',"weight_g" = '${req.body.product.weight}'
  WHERE "product_name" = '${req.body.product_to_update.name}' AND "price" = '${req.body.product_to_update.price}' AND "store_name" = '${req.body.product_to_update.store}' AND "url" = '${req.body.product_to_update.url}' AND "weight_g" = '${req.body.product_to_update.weight}'`, (err, product) => {
    console.log(req.body.product)
    console.log(req.body.product_to_update)

    if (err) {
      return res.json(err).status(400)
    }
    else{
      return res.json(product).status(202) //202: Accepted
    }
  })
})

module.exports = router