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
        res.json({error,success:false})
    }
    
})

router.post('/join', async (req,res) => {

    try {
        const planner = await Planner.findByCredentials(req.body.destination, req.body.password)
        const token = await planner.generateAuthToken()
        res.send({ planner, token })
    } catch (error) {
        res.json({error, success: false})     
    }
})

router.get('/me/:token', auth, async (req, res) => {
    //res.send(req.planner)
    const planner = req.planner
    res.render('me', {
        title: 'Welcome to your planner!',
        description: 'Choose what you want to do',
        dest: "Destination: " + planner.destination,
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

router.get('/profile/:token', auth, async (req, res) => {
    const planner = req.planner
    res.render('profile', {
        title: 'Edit your planner profile!',
        description: 'Choose what you want to do',
        dest: planner.destination,
        grpNo: planner.peopleCount,
        email: planner.email
    })
})

router.patch('/profile/:token', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const removeNull = updates.filter((update) => req.body[update] !== "") 
    const allowedUpdates = ['destination', 'peopleCount','email']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) {
        return res.status(400).send({error: "Invalid update!"})
    }

    try {

        removeNull.forEach((update) => req.planner[update] = req.body[update])

        await req.planner.save()

        res.json({planner:req.planner, success: true})
    } catch (error) {
        res.json({error, success: false})
    }
})

module.exports = router