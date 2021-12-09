console.log('this is a server file');

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/Thomas', (req, res) => {
  res.send('Hello Thomas!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
