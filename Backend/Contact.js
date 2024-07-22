const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    message: {
        required: true,
        type: String
    }, 
    response: {
        type: String,
        default: null
    }
  
})

module.exports = mongoose.model('Contact', dataSchema)