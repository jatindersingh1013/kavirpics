const express = require('express')
const hbs = require('express-handlebars')
const fs = require ('fs')
const server = express()

const routes = require('./routes')

// Server configuration
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs({ extname: 'hbs' }))
server.set('view engine', 'hbs')

server.use('/myson',routes)

// Your routes/router(s) should go here

server.get('/', (request, response) => {
    fs.readFile('./data.json','utf8',(err, data) => {
     console.log(data)
    if (err) return response.status(500).send(err.message)
    const parsedData = JSON.parse(data)
    response.render('home', parsedData)
  })
})



module.exports = server
