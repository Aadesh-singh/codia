const nodemailer = require('../config/nodemailer');


exports.newPassword = (token, email) => {
    console.log('Inside forget password mailer');
    console.log('token.acesstoken: ', token.accessToken);

    let link = 'http://localhost:8000/user/forgetpassword/?accesstoken='+token.accessToken;

    nodemailer.transporter.sendMail({
        from: 'thecodiaorg@gmail.com',
        to: email,
        subject: 'Forget Password',
        html: '<a href=" ' + link + '">click me</a>'
        // html: `<a href="">clickme</a>`
    }, 
    (err, info)=>{
        if(err){
            console.log('Error in sending mail: ', err);
            return;
        }
        console.log('messgae Sent', info);
        return;
    });
}