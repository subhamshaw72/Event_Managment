const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    location:{
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    phone: {
        required: true,
        type: Number
    },
    Nameofevent: {
        required: true,
        type: String
    }, 
    Dateofevent: {
        required: true,
        type: String
    },
     status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    }
})

module.exports = mongoose.model('Book', dataSchema)