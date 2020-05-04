const express = require('express')
require('./db/mongoose')
const plannerRouter = require('./routers/planner')

//const Planner = require('./models/planner')


const app = express()
const port = process.env.PORT || 3001

app.use(express.json())

app.use(plannerRouter)


app.listen(port, () => {
    console.log("Server is on port: " + port)
})