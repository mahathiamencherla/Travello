const express = require('express')
const router = new express.Router()
//const auth = require('../middleware/auth')
const Planner = require('../models/planner')

router.get('/test', (req,res) => {
    res.send('This is from my PLANNER router')
})

router.post('/create', async (req,res) => {
    const planner = new Planner(req.body)

    try {
        const token = await planner.generateAuthToken()
        await planner.save()
        res.status(201).send({planner, token})
    } catch (error) {
        res.status(400).send(error)
    }
    
})

router.post('/join', async (req,res) => {

    try {
        const planner = await Planner.findByCredentials(req.body.destination, req.body.password)
        const token = await planner.generateAuthToken()
        res.send({ planner, token })
    } catch (e) {
        res.status(400).send(e)       
    }
})

module.exports = router