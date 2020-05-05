const express = require('express')
const router = new express.Router()

const List = require('../models/list')

router.get('/testlist', (req,res) => {
    res.send('This is from my List router')
})

router.get('/me', async (req, res) => {
    try{
        const list = await List.find({})
        if(!task){
            res.sendStatus(404)
        }
        res.send(task)
    }catch(e){
        res.sendStatus(500)
    }
})


module.exports = router