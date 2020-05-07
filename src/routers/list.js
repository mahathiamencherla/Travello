const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const List = require('../models/list')

router.get('/testlist', (req,res) => {
    res.send('This is from my List router')
})

router.post('/idea', auth, async (req, res) => {

    const list = new List({
        ...req.body,
        owner: req.planner._id
    })
    try {
        await list.save()
        res.status(201).send(list)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/idea', auth, async (req, res) => {
    const major = Math.ceil(req.planner.peopleCount/2)
    console.log(major)
    try{
        console.log("inside try")
        const list = await List.find({ vetoCount: {$lt: major}, owner: req.planner._id})
        if(!list){
            res.sendStatus(404)
        }
        res.send(list)
    }catch(e){
        res.sendStatus(500)
    }
})

router.get('/veto', auth, async (req, res) => {
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

module.exports = router