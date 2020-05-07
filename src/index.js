const express = require('express')
const path = require('path')
const hbs = require('hbs')
require('./db/mongoose')
const plannerRouter = require('./routers/planner')

const pubdir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

const app = express()


app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(pubdir))

const port = process.env.PORT || 3001

app.use(express.json())

app.get('/', (req,res)=> {
    res.render('index', {
        title: 'Travello',
        description: 'Select a planner for your group!'
    })
})

app.get('/create', (req,res)=> {
    res.render('create', {
        title: 'Create Planner',
        description: 'Create a planner for your group!'
    })
})

app.get('/join', (req,res)=> {
    res.render('join', {
        title: 'Join Planner',
        description: 'Join an existing planner!'
    })
})

app.get('/me', (req,res)=> {
    res.render('me', {
        title: 'Welcome to your planner!',
        description: 'Choose what you want to do'
    })
})

app.use(plannerRouter)


app.listen(port, () => {
    console.log("Server is on port: " + port)
})