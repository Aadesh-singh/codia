const express = require('express');
const cookieParser = require('cookie-parser');
const port = 8000;
const path = require('path');
const app = express();

const db = require('./config/mongoose');
const user = require('./models/user');
const signIn = require('./models/signin');
const signUp = require('./models/signUp');

// use static files 
app.use(express.static('./assets'));

// use cookie parser
app.use(express.urlencoded());

app.use(cookieParser());


// use express routers
app.use('/', require('./routes'));

// views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));


app.listen(port, function(err){
    if(err){
        console.log(`Error in loading the server: ${err}`);
        return;
    }
    console.log(`Server is up and running at port: ${port}`);
});