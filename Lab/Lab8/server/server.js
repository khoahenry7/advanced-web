const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/advanced-web-lab8')
        console.log('connect successfully')
    }
    catch (err) {
        console.log("connection failed")
    }
}

module.exports = { connect }
