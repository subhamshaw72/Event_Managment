const express = require('express');
const router = express.Router()
const Event = require('./Event');


router.get('/',async(req,res)=>{
    res.send('This is my helper page ')
})


// Registration Method
router.post('/registerhelper', async (req, res) => {
    const data = new Event({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        contact: req.body.contact,
        address: req.body.address,
        Role: req.body.Role
    });

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(400).json({ message: error.message });
    }
});

// Other routes...
router.get('/getAllHelper', async(req, res) => {
    try{
        const data = await Event.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});

router.get('/gethelperby/:id',async (req, res) => {
    try{
        const data = await Event.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
    
});

router.patch('/updatehelper/:id',async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Event.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
});

router.delete('/delete/:id',async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Event.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
});

router.post('/Loginhelper/', async(req, res) => {
    try{
        const data = await Event.find({email: req.body.email, password: req.body.password});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});

router.post('/gethelperbyrole',async (req, res) => {
    try{
        const data = await Event.find({Role : req.body.Role});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});

router.post('/searchbyaddress', async(req, res) => {
    try{
        const data = await Event.find({address: {$regex : req.body.address, $options: 'i'}});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
   
});
module.exports = router