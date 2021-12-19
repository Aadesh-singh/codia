const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',             //gmail simple mail transfer protocol host
    port: 587,
    secure: false,
    auth: {                         //the auth details of the user who send the mail
        user: 'thecodiaorg@gmail.com',
        pass: 'Codia@2021'
    }
});

let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mail', relativePath),
        data,
        function(err, template){
            if(err){
                console.log('Error in rendering template', err);
                return;
            }

            mailHTML = template;
        }
    )
    return mailHTML;
}


module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}