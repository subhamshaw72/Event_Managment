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
    password: {
        required: true,
        type: String
    },
    contact: {
        required: true,
        type: Number
    },
    address: {
        required: true,
        type: String
    },
    status: {
        required: true,
        type: String,
        default :"Active"
    }

})

module.exports = mongoose.model('User', dataSchema)