const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser')
mongoose.connect('mongodb://localhost:27017/contactDance', {useNewUrlParser: true});
const port = 8000;

//Defin emongoose schema

const  contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

const Contact = mongoose.model('Contact', contactSchema);


//Express Specific STUFF
app.use('/static', express.static('static'));
app.use(express.urlencoded());

//PUG SPECIFIC STUFF
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views') );

// END POINTS 
app.get('/', (req, res) =>{
    const params = { }
    res.status(200).render('home.pug', params);
});

app.get('/contact', (req, res) =>{
    const params = { }
    res.status(200).render('contact.pug', params);
});

app.post('/contact', (req, res) =>{
    let myData  = new Contact(req.body);
    myData.save().then(() =>{
        res.send("This item has been saved to the database");
    }).catch(() =>{
        res.status(400).send("Item was not saved to the database")
    });
    // res.status(200).render('contact.pug');
});






app.listen(port, ()=>{
    console.log(`The application started successfully no port ${port}`);
});