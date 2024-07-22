const express = require('express');
const router = express.Router();
const Message = require('./Contact'); // Ensure this path is correct
const nodemailer = require('nodemailer');

// Replace with your actual email credentials
const emailUser = 'eventopia202466@gmail.com';
const emailPass = 'oimgyyjsplrgexur';

router.get('/', async (req, res) => {
    res.send('This is my message');
});

// Registration Method
router.post('/getmessage', async (req, res) => {
    const data = new Message({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    });

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(400).json({ message: error.message });
    }
});

// Route to get all contact messages
router.get('/getallmessages', async (req, res) => {
    try {
        const messages = await Message.find();
        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ message: error.message });
    }
});

// Route to respond to a contact message
router.post('/respond', async (req, res) => {
    const { email, response } = req.body;

    // Check if email and response are provided
    if (!email || !response) {
        return res.status(400).json({ message: 'Email and response are required' });
    }

    try {
        // Find the message by email (assuming email is unique)
        const message = await Message.findOne({ email: email });
        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }

        // Update the message with the response
        message.response = response;
        await message.save();

        // Set up nodemailer transport
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: emailUser,
                pass: emailPass
            }
        });

        const mailOptions = {
            from: emailUser,
            to: email,
            subject: 'Response to your message',
            text: response
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ message: error.message });
            }
            console.log('Email sent: ' + info.response);
            res.status(200).json({ message: 'Response sent successfully!' });
        });
    } catch (error) {
        console.error('Error responding to message:', error);
        res.status(500).json({ message: error.message });
    }
});

// Route to get a specific message by ID
router.get('/gethelperby/:id', async (req, res) => {
    try {
        const data = await Message.findById(req.params.id);
        if (!data) {
            return res.status(404).json({ message: 'Message not found' });
        }
        res.json(data);
    } catch (error) {
        console.error('Error fetching message:', error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
