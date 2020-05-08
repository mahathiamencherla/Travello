const jwt = require('jsonwebtoken')
const Planner = require('../models/planner')

const auth = async (req, res, next) => {
    try {
        // auth flow assumes that the token is given as a url parameter
        // example url: http://localhost:3001/me/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWI1NjY5MjBhNDNkOTZiN2FhYjhkN2IiLCJpYXQiOjE1ODg5NDcwNDF9.I2-g2q_bK6ptT9l1GFFFqFU2NmMBdnI8oSOpsevdfHU
        const token = req.params.token 
        const decoded = jwt.verify(token, 'thisistravelloplanner')
        const planner = await Planner.findOne({ _id: decoded._id, 'tokens.token': token })

        if(!planner) {
            throw new Error()
        }
        req.token = token
        req.planner = planner
        next ()

    } catch(e) {
        res.status(401).send({ error: 'Please Authenticate.' })
    }
}

module.exports = auth