const express = require('express');
const router = express.Router();
const Admin = require('./Admin');
const nodemailer = require('nodemailer');
const bcrypt = require("bcrypt");

async function hashPassword(plaintextPassword) {
    const hash = await bcrypt.hash(plaintextPassword, 10);
    return hash;
}

async function comparePassword(plaintextPassword, hash) {
    const result = await bcrypt.compare(plaintextPassword, hash);
    return result;
}

let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'eventopia202466@gmail.com',
        pass: 'oimgyyjsplrgexur'
    }
});

router.get('/', async (req, res) => {
    res.send('This is my Admin ');
});

// Registration Method
router.post('/adminregister', async (req, res) => {
    try {
        const existingUser = await Admin.findOne({ email: req.body.email });

        if (existingUser) {
            return res.status(409).json({ message: 'Email already registered' });
        }
        const password = req.body.password;
        const hpass = await hashPassword(password);
        const data = new Admin({
            name: req.body.name,
            email: req.body.email,
            password: hpass,
            phone: req.body.phone,
        });

        const dataToSave = await data.save();
        let mailDetails = {
            from: 'eventopia202466@gmail.com',
            to: req.body.email,
            subject: 'Notification for Admin Registration on EVENTOPIA',
            text: `Thank you for registering with EVENTOPIA! Your password is ${req.body.password}`
        };

        mailTransporter.sendMail(mailDetails, (err, data) => {
            if (err) {
                console.log('Error Occurs');
            } else {
                console.log('Email sent successfully');
            }
        });
        res.status(201).json(dataToSave);
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(400).json({ message: error.message });
    }
});

router.post('/Loginadmin', async (req, res) => {
    try {
        const users = await Admin.find({ email: req.body.email });

        if (users.length > 0) {
            const user = users[0]; // Access the first user in the array
            const savedPassword = user.password;
            const result = await comparePassword(req.body.password, savedPassword);

            if (result) {
                res.status(200).json({
                    _id: user._id, 
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    message: "Admin logged in successfully!"
                });
            } else {
                res.status(401).json({ message: "Incorrect password" });
            }
        } else {
            res.status(404).json({ message: "Account not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

function generateOTP() {
    return Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit OTP
}

let otps = {}; // Store OTPs temporarily

// Request to update password
router.post('/requestUpdatePassword', async (req, res) => {
    try {
        const user = await Admin.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const otp = generateOTP();
        otps[user.email] = otp; // Save OTP temporarily

        let mailDetails = {
            from: 'eventopia202466@gmail.com',
            to: user.email,
            subject: 'OTP for Password Update on EVENTOPIA',
            text: `Your OTP for password update is ${otp}`
        };

        mailTransporter.sendMail(mailDetails, function (err, data) {
            if (err) {
                console.log('Error Occurs');
            } else {
                console.log('Email sent successfully');
            }
        });

        res.json({ message: 'OTP sent to your email' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update password
router.post('/updatePassword', async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        if (otps[email] && otps[email] == otp) {
            const user = await Admin.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const hashedPassword = await hashPassword(newPassword);
            user.password = hashedPassword;
            await user.save();

            delete otps[email]; // Remove OTP after successful password update

            let mailDetails = {
                from: 'eventopia202466@gmail.com',
                to: user.email,
                subject: 'Password Updated Successfully on EVENTOPIA',
                text: `Your password has been updated successfully. Your new password is ${newPassword}`
            };

            mailTransporter.sendMail(mailDetails, function (err, data) {
                if (err) {
                    console.log('Error Occurs');
                } else {
                    console.log('Email sent successfully');
                }
            });

            res.json({ message: 'Password updated successfully' });
        } else {
            res.status(400).json({ message: 'Invalid OTP' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
