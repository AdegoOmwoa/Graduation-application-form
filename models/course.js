const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseName: {
        required:true,
        type:String
    },
    creditHours: {
        required:true,
        type:Number
    }
})

module.exports = mongoose.model("course-credits", courseSchema);