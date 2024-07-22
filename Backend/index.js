const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const mongoString = 'mongodb+srv://subhamshaw527:WxI7JMsrq9IdOC3m@cluster0.a61najh.mongodb.net/Event_managment';

// mongodb+srv://subhamshaw527:WxI7JMsrq9IdOC3m@cluster0.a61najh.mongodb.net/
// WxI7JMsrq9IdOC3m
// const Event = require('./Event');

mongoose.connect(mongoString, { useNewUrlParser: true, useUnifiedTopology: true });

const database = mongoose.connection;

database.on('error', (error) => {
    console.error('Database connection error:', error);
});

database.once('connected', () => {
    console.log('Database Connected');
});

const app = express();

app.use(express.json());
app.use(cors({
    origin:'*'
}))


// Registration Method
const userroute = require('./userserver')
const EventServer = require('./EventServer')
const meaasgeServer = require('./Contactserver')
const Bookserver = require('./Bookserver')
const adminserver = require('./adminserver')
 const manage = require('./Manage')
 const About = require('./Aboutserver')
app.use('/userserver', userroute)
app.use('/EventServer',EventServer)
app.use('/Contactserver',meaasgeServer)
app.use('/Bookserver',Bookserver)
app.use('/adminserver',adminserver)
 app.use('/Manage',manage)
 app.use('/Aboutserver',About)
app.get('/',async(req,res)=>{
    res.send('Welcome to Event Managment System')
})


app.listen(8000, () => {
    console.log(`Server Started at ${8000}`);
});
