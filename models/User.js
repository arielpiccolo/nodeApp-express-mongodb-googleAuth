const mongoose = require('mongoose');

// create Schema for after login 
 const UserSchema = new mongoose.Schema({
     googleId: {
         type: String,
         required: true  
     },
     displayName: {
        type: String,
        required: true  
    },   
    firstName: {
        type: String,
        required: true  
    },
    lastName: {
        type: String,
        required: true  
    },
    image: {
        type: String,
        required: true  
    },
 })     