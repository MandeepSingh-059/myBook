const connectToMongo = require('./db');
connectToMongo();


const express = require('express')
const app = express()
const port = 3000


//These are the diffrent endpoints
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/login', (req, res) => {
  res.send('Hello login!')
})
app.get('/signup', (req, res) => {
  res.send('Hello signup!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})