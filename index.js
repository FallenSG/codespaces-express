const express = require('express')
const mongoose = require('mongoose')
const ENV = require('dotenv').config().parsed
const path = require('path')
const bodyParser = require('body-parser')

const db = ENV.db
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.engine('pug', require('pug').renderFile)

app.use('/', require('./routes/index'))

mongoose.connect(db)
  .then(() => console.log("Connected to DB"))
  .catch(() => console.log("Error Connecting DB"))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
