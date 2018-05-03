const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const PORT = process.env.PORT || 5000;

const app = express();
//bodyParser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//mongo config
const db = require('./config/keys').mongoURI;

//connect to db
mongoose.connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => {throw err;});

//Passport middleware
app.use(passport.initialize());
//passport config
require('./config/passport')(passport);

//use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);

});