const express = require('express');
const router = express.Router()
const message = require('./Book');
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



router.get('/',async(req,res)=>{
    res.send('This is my Booking ')
})


// Registration Method
router.post('/getorder', async (req, res) => {

    const data = new message({
        name: req.body.name,
        location: req.body.location,
        email: req.body.email,
        phone: req.body.phone,
        Nameofevent: req.body.Nameofevent,
        Dateofevent: req.body.Dateofevent,

       
    
        
    });
    try {
        const dataToSave = await data.save();
       
        let mailDetails = {
            from: 'eventopia202466@gmail.com',
            to: req.body.email,
            subject: 'Booking on EVENTOPIA',
            text: `Thank you: ${req.body.name} for your booking With EVENTOPIA. We will contact you regarding the event: ${req.body.Nameofevent}.`
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
        res.status(200).json(dataToSave);
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(400).json({ message: error.message });
    }
       
    
        
    
    
});

router.get('/getorderbyemail/:email', async (req, res) => {
    try {
        const data = await message.find({ email: req.params.email });
        if (!data || data.length === 0) {
            return res.status(404).json({ message: 'No orders found for this email' });
        }
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/deleteorder/:id', async (req, res) => {
    try {
        // Find the order by ID first to get the email and other details
        const order = await message.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Prepare the email details
        let mailDetails = {
            from: 'eventopia202466@gmail.com',
            to: order.email,  // Use the email from the found order
            subject: 'Cancel Your Event',
            text: `Dear ${order.name}, your booking for ${order.Nameofevent} has been cancelled.`
        };

        // Send the email
        await mailTransporter.sendMail(mailDetails);

        // Delete the order
        await message.findByIdAndDelete(req.params.id);

        res.json({ message: 'Order cancelled successfully' });
    } catch (error) {
        console.error('Error handling the cancellation:', error);
        res.status(500).json({ message: error.message });
    }
});
router.post('/rejectorder/:id', async (req, res) => {
    try {
        const order = await message.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        let mailDetails = {
            from: 'eventopia202466@gmail.com',
            to: order.email,
            subject: 'Reject Event',
            text: `Dear ${order.name}, your booking for ${order.Nameofevent} has been rejected.`
        };

        await mailTransporter.sendMail(mailDetails);

        // Save the booking details before deleting for sending response
        const rejectedBookingDetails = order;

        // Delete the order
        await message.findByIdAndDelete(req.params.id);

        res.json({ message: 'Order rejected and deleted successfully', order: rejectedBookingDetails });
    } catch (error) {
        console.error('Error handling the rejection:', error);
        res.status(500).json({ message: error.message });
    }
});



router.get('/getAllbooking', async(req, res) => {
    try{
        const data = await message.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});
router.post('/acceptorder/:id', async (req, res) => {
    try {
        const order = await message.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        let mailDetails = {
            from: 'eventopia202466@gmail.com',
            to: order.email,
            subject: 'Accept Event',
            text: `Dear ${order.name}, your booking for ${order.Nameofevent} on ${order.Dateofevent} has been accepted. `
        };

        await mailTransporter.sendMail(mailDetails);

        order.status = 'accepted';
        await order.save();

        res.json({ message: 'Order accepted successfully', order });
    } catch (error) {
        console.error('Error handling the acceptance:', error);
        res.status(500).json({ message: error.message });
    }
});
router.patch('/updateorder/:id', async (req, res) => {
    try {
      const order = await message.findById(req.params.id);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      // Update only the fields that are allowed to be changed
      if (req.body.location) order.location = req.body.location;
      if (req.body.phone) order.phone = req.body.phone;
      if (req.body.Dateofevent) order.Dateofevent = req.body.Dateofevent;
  
      await order.save();
      res.json({ message: 'Order updated successfully', order });
    } catch (error) {
      console.error('Error updating the order:', error);
      res.status(500).json({ message: error.message });
    }
  });


module.exports = router