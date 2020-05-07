const mongoose = require('mongoose')
const validator = require('validator')

const listSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    vetoCount: {
        type: Number,
        default: 0
    },
    cost: {
        type: Number,
        default: 0
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Planner'
    }
}, {
    timestamps: true    
})

const List = mongoose.model('List', listSchema)

module.exports = List
