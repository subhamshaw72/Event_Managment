const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    desc: {
        required: true,
        type: String // Changed from Number to String assuming desc is a description
    },
    image: {
        required: true,
        type: String
    },
    image_id: {
        required: true,
        type: String
    },
});

module.exports = mongoose.model('About', dataSchema);
