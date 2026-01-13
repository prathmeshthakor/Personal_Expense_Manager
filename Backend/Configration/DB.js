const mongoose = require("mongoose")
const connectDB = ()=> {
    try {
    mongoose.connect("mongodb://localhost:27017/JOY")
    console.log ("mongodb connected")
} catch (err) {
    console.error(err.message)
    process.exit(1)
}
}
module.exports=connectDB;




