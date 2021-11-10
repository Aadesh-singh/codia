const express = require('express');
const cookieParser = require('cookie-parser');
const expressLayout = require('express-ejs-layouts');
const port = 8000;
const path = require('path');
const app = express();

const db = require('./config/mongoose');
const user = require('./models/user');
const signIn = require('./models/signin');
const signUp = require('./models/signUp');

// used for session cookies
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const { Mongoose } = require('mongoose');

// use static files 
app.use(express.static('./assets'));

// use cookie parser
app.use(express.urlencoded());

app.use(cookieParser());




// views
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));


// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codia',
    // TODO change the secret at the time of deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000* 60* 100)
    },
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb://localhost/codia_db',
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongo-db ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

// use express routers
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in loading the server: ${err}`);
        return;
    }
    console.log(`Server is up and running at port: ${port}`);
});