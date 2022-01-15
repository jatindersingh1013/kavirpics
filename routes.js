const express = require('express')
const fs = require('fs')
const router = express.Router()

router.get('/:id', (request, response) => {
    const id = Number(request.params.id)
    fs.readFile('./data.json','utf8',(err, data) => {
    if (err) return response.status(500).send(err.message)
    
    const parsedData = JSON.parse(data)
    // console.log(parsedData)
    const picDetails = parsedData.myson.find(data => data.id === id)
    response.render('details', picDetails)
  })
})


router.get('/:id/edit', (request, response) => {
  const id = Number(request.params.id)
  fs.readFile('./data.json','utf8',(err, data) => {
  if (err) return response.status(500).send(err.message)
  const parsedData = JSON.parse(data)
  const picDetails = parsedData.myson.find(data => data.id === id)
  response.render('edit', picDetails)
})
})



router.post('/:id/edit', (request, response) => {
  fs.readFile('./data.json','utf8',(err, data) => {
  const id = Number(request.params.id)
  const newArr = JSON.parse(data).myson
  const updateArr = newArr.map((data) => {
    if (data.id === id){
      const newObj = request.body
      newObj.id = id
      return newObj
    }
      return data
})

    const newData = {
      myson: updateArr
  }

  fs.writeFile('./data.json', JSON.stringify(newData,null,2), (err) => {
    if(err) {
      return response.status(500) 
    }
    else {
      response.redirect('/myson/' + id)
    }
})
})
})

module.exports = router