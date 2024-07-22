const express = require('express');
const router = express.Router()
const User = require('./User');
const bcrypt = require("bcrypt");
async function hashPassword(plaintextPassword) {
    const hash = await bcrypt.hash(plaintextPassword, 10);
    return hash;
    // Store hash in the database
}
 
// compare password
async function comparePassword(plaintextPassword, hash) {
    const result = await bcrypt.compare(plaintextPassword, hash);
    return result;
}
const nodemailer = require('nodemailer');
let mailTransporter =
    nodemailer.createTransport(
        {
            service: 'gmail',
            auth: {
                user: 'eventopia202466@gmail.com',
                pass: 'oimgyyjsplrgexur'
            }
        }
    );


router.use(express.json());


// Route for user page
router.get('/', (req, res) => {
    res.send('This is my user page');
});



// Registration Method
router.post('/registeruser', async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });

        if (existingUser) {
            return res.status(409).json({ message: 'Email already registered' });
        }
        const password = req.body.password
        const hpass = await hashPassword(password)
        const data = new User({
            name: req.body.name,
            email: req.body.email,
            password: hpass,
            contact: req.body.contact,
            address: req.body.address
        });

        const dataToSave = await data.save();
        let mailDetails = {
            from: 'eventopia202466@gmail.com',
            to: req.body.email,
            subject: 'Notification for Registration on EVENTOPIA',
            text: `Thank you ${req.body.name}for registered With EVENTOPIA, Now you can login ! Your password is ${req.body.password}`
        };
         
        mailTransporter
            .sendMail(mailDetails,
                function (err, data) {
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

// Other routes...
router.get('/getAlluser', async(req, res) => {
    try{
        const data = await User.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});

router.post('/Loginuser', async (req, res) => {
    try {
        const users = await User.find({ email: req.body.email });

        if (users.length > 0) {
            const user = users[0]; // Access the first user in the array
            const savedPassword = user.password;
            const result = await comparePassword(req.body.password, savedPassword);

            if (result) {
                res.status(200).json({
                    _id: user._id, 
                    name: user.name,
                    email: user.email,
                    contact: user.contact,
                    address: user.address,
                    message: "User logged in successfully!"
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


router.get('/getuserby/:id',async (req, res) => {
    try{
        const data = await User.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
    
});
router.get('/getuserbyemail/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.delete('/deleteuser/:id', async (req, res) => {
    try {
        // Find the user by ID first
        const user = await User.findById(req.params.id);
        const u = user.email;
        console.log(u)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        let mailDetails = {
            from: 'eventopia202466@gmail.com',
            to: user.email,

            subject: 'Notification for Delete  Acount on EVENTOPIA',
            text: `Dear ${user.name} Your acount delete Sucessfully ` 
        };
         
        mailTransporter
            .sendMail(mailDetails,
                function (err, data) {
                    if (err) {
                        console.log('Error Occurs');
                    } else {
                        console.log('Email sent successfully');
                    }
                });

             await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'Account deleted successfully' });
      
        
    } catch (error) {
        console.error('Error handling the deletion:', error);
        res.status(500).json({ message: 'Error deleting user' }); // Custom error message
    }
});
function generateOTP() {
    return Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit OTP
}

let otps = {}; // Store OTPs temporarily

// Request to update password
router.post('/requestUpdatePassword', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
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
            const user = await User.findOne({ email });
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


module.exports = router