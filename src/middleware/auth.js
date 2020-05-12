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

    } catch(error) {
    
    // res.redirect(401, '/join');  
    res.set('Content-Type', 'text/html');
    res.status(401).send('<!DOCTYPE html><html><head><title>Invalid!</title><link rel="icon" href="/img/travelloicon.png"><link rel="stylesheet" href="/css/logout.css"><link href=\'https://fonts.googleapis.com/css?family=Montserrat\' rel=\'stylesheet\'></head><body><div class="logo"><img class="imglogo" src="/img/travello2.png"></div><div><p>Invalid login credentials! Try again</p></div></body><script type="text/javascript">function Redirect() { window.location="/join"; } document.write("You will be redirected to the login page in 5 seconds..."); setTimeout(\'Redirect()\', 5000); </script></html> ')
      
    }
}

module.exports = auth