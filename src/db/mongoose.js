const mongoose = require('mongoose')

mongoose.connect(process.env.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})

// mongoose.connect('mongodb://127.0.0.1:27017/travello-api', {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true
// })