const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({

    title:{
        type : String,
        required : true,
        enum : ["Mr", "Mrs", "Miss"]
    },

    name: {
        type : String,
        required : true
    },

    phone: {
        type : String,
        reqired : true,
        unique : true
    },


    email: {
        type : String,
        required : true,
        unique: true,
        lowercase : true
    }, 
    password: {
        type : String,
        required : true
    },

    address: {
      street: {type : String},
      city: {type : String},
      pincode: {type : String}
    },


}, {timestamp : true});

module.exports = mongoose.model('user', userSchema)
//It probably means that we are making a model inside our mongoose Database which will be named books and would have schema like that of bookSchema you are creating
