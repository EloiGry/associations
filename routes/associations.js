const express = require("express")
const app = express()

let associations = require("../associations.json")
let messages = require("../messages.json")

const successIfExists = (req, res, next) => {
    const { slug } = req.params
    const association = associations.find(association => association.slug === slug)
  
    if (association) {
      next()
    } else {
      res.send(404).send('Association not found')
    }
  }

  const validateMessage = (req, res, next) => {
    const message = {
        "name" : "",
        "message" : "",
        "date" : "",
        "association" : "",

    }

    const allowedKeys = Object.keys(message)
    const bodyKeys = Object.keys(req.body)
    const invalidKey = bodyKeys.find(key => !allowedKeys.includes(key))

  
    if (invalidKey) {
      res.status(400).send("Requete invalide")
    } else {
      next()
    }
  }

app.get('/', (req, res) => {
    res.json(associations)
})

app.get('/:slug', successIfExists, (req, res) => {
    const { slug } = req.params 
    const association = associations.find(association => association.slug === slug)
    
    res.json(association)
  })

app.get('/message', (req, res) => {
    res.json(messages)
})

app.post('/', (req, res) => {
    console.log(req.body)
  
    const association = {
      slug: req.body.name.toLowerCase().split(' ').join(''),
      ...req.body
    }

  
    associations = [ ...associations, association ]
    res.json(association)
})

app.post('/message', validateMessage, (req, res) => {
  
    const message = {
      ...req.body
    }

    const isExistAssociation = associations.some(association => 
        association.name.toLowerCase().split(' ').join('') === message.association.toLowerCase().split(' ').join('')
        )

    if (isExistAssociation) {
        messages = [ message, ...messages]
        res.json(message)
    } else {
        res.send(404).send('Association not exist')
    }

    
})


  

module.exports = app