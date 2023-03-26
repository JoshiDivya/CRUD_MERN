const { text } = require('express')
const mongoose = require('mongoose')



const userSchema  = new mongoose.Schema({
    userName :{
        type: String,
        required : true
    },
    age: {
        type: Number,
        required: true
    },
    country:{
        type: String,
        required : true
    },
    position:{
        type: String,
        required : true
    },
    salary:{
        type: Number,
        required : true
    }
})

const User = mongoose.model('User',userSchema);
module.exports = User;