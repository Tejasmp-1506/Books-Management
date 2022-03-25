const mongoose = require('mongoose');
const validator = require('validator');


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
        type : ObjectId,
        required : true,
        ref :  user
    },

    ISBN: {
        type : String,
        required : true,
        unique : true
    },

    category: {
        type : string,
        required : true
    },

    subcategory: {
        type : string,
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
        type : boolean, 
        default: false
    },
    releasedAt: {
        type : Date,
        required : true
    } 


      

},  {timestamp : true});


module.exports = mongoose.Model('book' , bookSchema)
//It probably means that we are making a model inside our mongoose Database which will be named books and would have schema like that of bookSchema you are creating
