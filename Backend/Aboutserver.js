const express = require('express');
const router = express.Router();
const About = require('./About'); // Correctly import the About model
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dgxez4jic', // Ensure this is your actual Cloudinary cloud name
    api_key: '591921794523767',
    api_secret: 'Ib1mv4V_RGlLxOS5KVYNMGPaOVs'
});

router.get('/', (req, res) => {
    res.send('About');
});

router.post('/upload_About', async (req, res) => {
    const data = new About({
        name: req.body.name,
        desc: req.body.desc, // Ensure this matches the front-end field
        image: req.body.image,
        image_id: req.body.image_id
    });

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/getAllabout', async (req, res) => {
    try {
        const totalEvents = await About.countDocuments(); // Count all documents in Booking collection
       
        const data = await About.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get('/getAllabout2', async (req, res) => {
    try {
        const totalEvents = await About.countDocuments(); // Count all documents in Booking collection
       
      
        res.json({ totalEvents });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.delete('/delete_About/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const details = await About.findById(id);
        const image_id = details.image_id;

        try {
            await cloudinary.uploader.destroy(image_id); // Await the Cloudinary operation
        } catch (error) {
            console.log(error);
            return res.send({ error: "Error deleting image from Cloudinary" });
        }

        await About.findByIdAndDelete(id);
        res.status(201).json({ message: 'About Deleted From Cloudinary & Database' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/getAboutById/:id', async (req, res) => {
    try {
        const data = await About.findById(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.patch('/updateAbout/:id', async (req, res) => {
    const details = await About.findById(req.params.id);
    const image_id = details.image_id;

    try {
        await cloudinary.uploader.destroy(image_id); // Await the Cloudinary operation
    } catch (error) {
        console.log(error);
        return res.send({ error: "Error deleting image from Cloudinary" });
    }

    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await About.findByIdAndUpdate(id, updatedData, options);
        res.send(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


module.exports = router;
