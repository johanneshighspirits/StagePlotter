const path = require('path')
const express = require('express')
const app = express()

app.use(express.static(__dirname + '/dist/public'))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/public/index.html'))
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))

