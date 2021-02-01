const mongoose = require('mongoose')

var connectDB = async (req, res, next) => {
    try {
        await mongoose.connect("mongodb://localhost:27017", {useNewUrlParser: true, useUnifiedTopology: true })
        console.log("DB connected!")
    } catch (error) {
        console.log("Error!!")
    }
}

module.exports = connectDB

