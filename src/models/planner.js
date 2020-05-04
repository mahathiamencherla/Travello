const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
            }
        },
        default: 1
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
                throw new Error ("Password must contain atleast one number and letter")
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

plannerSchema.methods.generateAuthToken = async function () {
    const planner = this
    const token = jwt.sign({_id: planner._id.toString() },'thisistravelloplanner')

    planner.tokens = planner.tokens.concat({ token })
    await planner.save()
    
    return token
}

plannerSchema.statics.findByCredentials = async (destination, password) => {
    const planner = await Planner.findOne({destination })
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