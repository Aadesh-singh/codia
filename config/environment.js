const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});

const development = {
    name: 'development',
    asset_path: '/assets',
    session_cookie_key: 'blahsomething',
    db: 'codia_db',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',             //gmail simple mail transfer protocol host
        port: 587,
        secure: false,
        auth: {                         //the auth details of the user who send the mail
            user: 'thecodiaorg@gmail.com',
            pass: 'Codia@2021'
        }
    },
    google_client_id: "184780315512-s9ija3k6632p8gv5rsjjl1mvbkbmvfec.apps.googleusercontent.com",
    google_client_secret: "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",
    google_callback_url: "http://localhost:8000/user/auth/google/callback",
    jwt_secret: 'codia',
    morgan: {
        mode: 'dev',
        options: {stream: accessLogStream}
    }
}


const production = {
    name: process.env.CODIA_ENVIRONMENT,
    asset_path: process.env.CODIA_ASSETS_PATH,
    session_cookie_key: process.env.CODIA_SESSION_COOKIE,
    db: process.env.CODIA_DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',             //gmail simple mail transfer protocol host
        port: 587,
        secure: false,
        auth: {                         //the auth details of the user who send the mail
            user: process.env.CODIA_GMAIL_USERNAME,
            pass: process.env.CODIA_GMAIL_PASSWORD
        }
    },
    google_client_id: process.env.CODIA_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.CODIA_GOOGLE_CLIENT_SECRET,
    google_callback_url: process.env.CODIA_GOOGLE_CALLBACK_URL,
    jwt_secret: process.env.CODIA_JWT_SECRET,
    morgan: {
        mode: 'combined',
        options: {stream: accessLogStream}
    }
}


module.exports = eval(process.env.CODIA_ENVIRONMENT) == undefined ? development : eval(process.env.CODIA_ENVIRONMENT);
