const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const List = require('./list')

const plannerSchema = new mongoose.Schema({
    destination: {
        type: String,
        required: true,                      
        trim: true
    },
    peopleCount: {
        type: Number,
        trim: true,
        validate(value) {             
            if (value < 1){
                throw new Error ('Number of people must be atleast 1')
            }else if(value%1 !== 0){
                throw new Error ("Disabled people also count as 1, please don't include fractions")
            }
        },
        default: 1
    }, 
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        unique:true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email')
            }
        }
    },   
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        validate(pwd) {
            const letter = /[a-zA-Z]/; 
            const number = /[0-9]/;
            if(!(number.test(pwd) && letter.test(pwd))){
                throw new Error ("Password must contain atleast one number and one letter")
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }

    }]
 }, {
     timestamps: true
})

plannerSchema.virtual('List', {
    ref: 'List',
    localField: '_id',
    foreignField: 'owner'
})

plannerSchema.methods.generateAuthToken = async function () {
    const planner = this
    const token = jwt.sign({_id: planner._id.toString() },process.env.secretKey)

    planner.tokens = planner.tokens.concat({ token })
    await planner.save()
    
    return token
}

plannerSchema.statics.findByCredentials = async (email, password) => {
    const planner = await Planner.findOne({email })
    if(!planner) {
        throw new Error('Unable to login!')
    }

    const isMatch = await bcrypt.compare(password, planner.password)

    if(!isMatch) {
        throw new Error('Unable to login!')
    }

    return planner
}

plannerSchema.pre('save', async function(next) {      
    const planner = this

    if (planner.isModified('password')) {
        planner.password = await bcrypt.hash(planner.password, 8)
    }

    next()
})  

const Planner = mongoose.model('Planner', plannerSchema)

module.exports = Planner