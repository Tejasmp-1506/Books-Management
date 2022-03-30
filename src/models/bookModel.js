const mongoose = require('mongoose');
const validator = require('validator');
const ObjectId = mongoose.Schema.Types.ObjectId


const bookSchema = new mongoose.Schema({

    title: {
        type : String,
        required : true,
        unique : true
    },

    excerpt: {
        type : String,
        required : true
       }, 

    userId: {
        type: ObjectId,
        ref: "user",
        required: true,
        trim: true
    },

    ISBN: {
        type : String,
        required : true,
        unique : true
    },

    category: {
        type : String,
        required : true
    },

    subcategory: {
        type : String,
        required : true
        },

    reviews: {
        type : Number,
        default: 0, 
    },

    comment:{
            type : String
        },

    deletedAt: {
        type : Date,
    }, 

    isDeleted: {
        type : Boolean, 
        default: false
    },
    releasedAt: {
        type : Date,
        required : true
    } 


      

},  {timestamp : true});


module.exports = mongoose.model('book' , bookSchema)
//It probably means that we are making a model inside our mongoose Database which will be named books and would have schema like that of bookSchema you are creating
