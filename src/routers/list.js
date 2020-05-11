const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const List = require('../models/list')

router.get('/testlist', (req,res) => {
    res.send('This is from my List router')
})

router.post('/idea/:token', auth, async (req, res) => {
    try {
        const existing = await List.find({ description: req.body.description, owner: req.planner._id})
        if (existing.length !== 0) {
            return res.status(400).send('Idea already exists! Try another one.')
        }
        const list = new List({
            ...req.body,
            owner: req.planner._id })
        await list.save()
        res.status(201).send(list)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/idea/:token', auth, async(req, res) => {
    res.render('idea_test', {
        title: 'IDEA LIST',
        description: 'Start Thinking!',
        destination: req.planner.destination,
        grpNo: req.planner.peopleCount
    })

})


router.get('/idea/data/:token', auth, async (req, res) => { //get data
    const major = Math.ceil(req.planner.peopleCount/2)
    try{
        const list = await List.find({ vetoCount: {$lt: major}, owner: req.planner._id})
        if(!list){
            res.sendStatus(404)
        }
        res.send(list)
    }catch(e){
        res.sendStatus(500)
    }
})

router.get('/veto/data/:token', auth, async (req, res) => {
    const major = Math.ceil(req.planner.peopleCount/2)
    try{
        const list = await List.find({ vetoCount: {$gt: major}, owner: req.planner._id})
        if(!list){
            res.sendStatus(404)
        }
        res.send(list)
    }catch(e){
        res.sendStatus(500)
    }
})

router.get('/veto/:token', auth, async(req, res) => {
    res.render('veto_test', {
        title: 'VETO LIST',
        description: 'Maybe Next time!',
        destination: req.planner.destination,
        grpNo: req.planner.peopleCount    
    })

})
module.exports = router