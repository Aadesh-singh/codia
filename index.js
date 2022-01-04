const express = require('express');
const env = require('./config/environment');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const expressLayout = require('express-ejs-layouts');
const port = 8000;
const path = require('path');
const app = express();
require('./config/view_helper')(app);
const db = require('./config/mongoose');
const user = require('./models/user');
// const signIn = require('./models/signin');
// const signUp = require('./models/signUp');

// used for session cookies
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo');
const { Mongoose } = require('mongoose');

const sassMiddleware = require('node-sass-middleware-5');
// const sassMiddleware = require('node-sass');
const flash = require('connect-flash');
const middleware = require('./config/middleware');

// setting up the chat server to be used with socket.io
const http = require('http');
const chatServer = http.createServer(app);
const chatSockets = require('./config/chat_socket').chatSockets(chatServer);
chatServer.listen(5000);
console.log('Chat server is listening on port 5000');


if(env.name == 'development'){
    app.use(sassMiddleware({
        src: path.join(__dirname, env.asset_path, '/scss/'),
        dest: path.join(__dirname, env.asset_path, '/css/'),
        debug: true,
        outputStyle: 'extended',
        prefix: '/css'
    }));
}

// use cookie parser
app.use(express.urlencoded());

app.use(cookieParser());

// use static files 
app.use(express.static(path.join(__dirname, env.asset_path)));

// make the uplaods available for browser
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(logger(env.morgan.mode, env.morgan.options));

// views
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));


// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codia',
    // TODO change the secret at the time of deployment in production mode
    secret: env.session_cookie_key,
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
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(middleware.setFlash);

// use express routers
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in loading the server: ${err}`);
        return;
    }
    console.log(`Server is up and running at port: ${port}`);
});