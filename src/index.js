const express = require('express')
require('./db/mongoose')

const app = express()
const port = process.env.PORT || 3001

app.use(express.json())

app.listen(port, () => {
    console.log("Server is on port: " + port)
})