const express = require('express')
const nodemailer = require('nodemailer')
const router = new express.Router()
const auth = require('../middleware/auth')
const Planner = require('../models/planner')
const bcrypt = require('bcryptjs')

router.get('/test', (req,res) => {
    res.send('This is from my PLANNER router')
})

router.post('/create', async (req,res) => {
    const planner = new Planner(req.body)

    try {
        const token = await planner.generateAuthToken()
        await planner.save()

        let transporter = nodemailer.createTransport({
			service:'gmail',
			secure: false,
			port:25,
			auth: {
				user: 'travelloapi@gmail.com',
				pass: process.env.password
			},
			tls: {
				rejectUnauthorized: false
			}

		});
		let HelperOptions = {
			from: '"Travello" <travelloapi@gmail.com',
			to: req.body.email,
			subject: 'Welcome to Travello!',
			html: 'Dear Member,<br><br>Good to see you on the Travello app!<br> Hope you have fun planning your trip with your family and friends!<br><br><br> Thank you,<br> Travello Team'

		};

		transporter.sendMail(HelperOptions,(err,info)=> {
			if(err){
				return res.json({error:"noEmail", success: true, token})
			}
			return res.json({success: true, token})
		});
    } catch (error) {
        res.json({error,success:false})
    }
    
})

router.post('/join', async (req,res) => {

    try {
        const planner = await Planner.findByCredentials(req.body.email, req.body.password)
        const token = await planner.generateAuthToken()
        res.send({ planner, token })
    } catch (error) {
        res.json({error, success: false})     
    }
})

router.post('/forgotPass', async(req,res) => {    
    try {
        const planner = await Planner.findOne({ destination: req.body.destination, email: req.body.email })
        const token = await planner.generateAuthToken()                
        if(!planner) {
            return res.json({error: "Invalid credentials, try again.", success: false })
        }
        await planner.save()        
        let transporter = nodemailer.createTransport({
			service:'gmail',
			secure: false,
			port:25,
			auth: {
				user: 'travelloapi@gmail.com',
				pass: process.env.password
			},
			tls: {
				rejectUnauthorized: false
			}
		});
		let HelperOptions = {
			from: '"Travello" <travelloapi@gmail.com',
			to: req.body.email,
			subject: 'Password Recovery',
			html: `Dear Member,<br><br>You have requested to recover your password.<br> Click here to <a href= "https://travelloapi.herokuapp.com/recovery/${token}">recover</a>.<br> Please ignore if this was not done by you!<br><br><br>Thank you,<br> Travello Team'`
		};
		transporter.sendMail(HelperOptions,(err,info)=> {
			if(err){
				res.json({server: false})
			}
			res.json({success: true})
		});        
    } catch(error) {
        res.json({error, success:false})
    }
})

router.get('/recovery/:token', async (req, res) => {
    res.render('recovery', {
        title: "Recover your password!",
        description: "Enter new credentials.."
    })
})

router.patch('/recovery/:token', auth,async (req, res) => {
    try{     
        req.planner.password = req.body.pwd
        await req.planner.save()
        res.json({success:true})
    }catch(error){
        console.log(error)
        res.json({error,success:false})
    }
})

router.get('/me/:token', auth, async (req, res) => {    
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

router.post('/changePassword/:token', auth, async (req, res) => {
    const planner = req.planner 
    const isMatch = await bcrypt.compare(req.body.password, planner.password) 
    if(!isMatch) {
        return res.json({error:"Password is incorrect!", success: false})
    }
    res.json({success: true})
})

module.exports = router