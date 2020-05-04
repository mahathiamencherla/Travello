const jwt = require('jsonwebtoken')
const Planner = require('../models/planner')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ','')
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