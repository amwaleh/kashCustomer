/* eslint-disable no-console */
const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')
var cors = require('cors')

const user = require('./utils/users')

const port = parseInt(process.env.PORT, 10) || 3000
const env = process.env.NODE_ENV
const dev = env !== 'production'
const app = next({
  dir: '.',
  dev
})

const handle = app.getRequestHandler()

let server
app
  .prepare()
  .then(() => {
    server = express()
    server.use(bodyParser.json())
     server.post('/createUser', (req, res) => {
      user.createUser({
          username: req.body.username,
          password: req.body.password
        })
        .then(data => {
          return res.sendStatus(201)
        }).catch(error => res.status(400).json(error))

    })

       server.post('/login', (req, res) => {
         user
           .authenticate({
             username: req.body.username,
             password: req.body.password
           })
           .then((data) => {
             if (data.success) res.status(200).json(data)
             else res.sendStatus(401)
           })
       })
    server.all('*', (req, res) => handle(req, res))

    server.listen(port, err => {
      if (err) {
        throw err
      }
      console.log(`> Ready on port ${port} [${env}]`)
    })
  })
  .catch(err => {
    console.log('An error occurred, unable to start the server')
    console.log(err)
  })