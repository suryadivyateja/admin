const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config/database');
const admin = require('./routes/admin');
const user = require('./routes/user');
const org = require('./routes/organisation')


const app = express();

//port 
const port = 3000;

// Mongoose
mongoose.connect(config.database);

mongoose.connection.on('connected',()=>{
    console.log(`connected to database `);
});
// Display error if any
mongoose.connection.on('error', (err) => {
    if (err) {
        console.log(`error is ${err}`);
    }
});
//cors
app.use(cors());
//body-parser
app.use(bodyParser.json());
//router
app.use('/admin', admin);
app.use('/user', user);
app.use('/org', org);



app.listen(port,()=>{
    console.log(`server started on ${port}`);
})