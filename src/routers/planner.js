const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
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

router.get('/me/:token', auth, async (req, res) => {
    //res.send(req.planner)
    const planner = req.planner
    res.render('me', {
        title: 'Welcome to your planner!',
        description: 'Choose what you want to do',
        dest: "Your destination: " + planner.destination,
        grpNo: "Number of people: "  + planner.peopleCount,
        email: "Admin email: " +planner.email
    })
})

router.post('/logout/:token', auth, async (req, res) => {
    try {
        req.planner.tokens = req.planner.tokens.filter((token) => {
            return token.token !== req.params.token
        })
        
        await req.planner.save()
        res.json({success: true})
        
    } catch (error) {
        res.json({success: false})
    }
})

router.patch('/me/:token', auth, async (req, res) => {
    try {
        const planner = await Planner.findOneAndUpdate({_id: req.planner._id},{ $set: {email: req.body.email}},{ new: true, runValidators: true})
        if(!planner){
            res.sendStatus(404)
        }
        await req.planner.save()
        res.send(planner)
    } catch (error) {
        res.sendStatus(500)
    }
})

module.exports = router