// setting  up new model resource in mongodb for the stories


const mongoose = require('mongoose');

// create Schema for after login 
 const StorySchema = new mongoose.Schema({
     title: {
         type: String,
         required: true,
         trim: true  
     },
     body: {
        type: String,
        required: true  
    },   
    status: {
        type: String,
        default: 'public',
        enum: ['public','private']  
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'  
    },
    createAt: {
        type: Date,
        default: Date.now
    }
 })     
 module.exports = mongoose.model('Story', StorySchema)
