const mongoose = require('mongoose')
const url = process.env.mongoURI  
//const url = 'mongodb://127.0.0.1:27017/travello-api'
mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})