const nodemailer = require('../config/nodemailer');


// this is the another way of exporting a method    
exports.newComment = (comment) => {
    console.log('Inside a newComment mailer');
    // htmlString contain the html
    let htmlString = nodemailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');

    nodemailer.transporter.sendMail({
        from: 'thecodiaorg@gmail.com',
        to: comment.user.email, 
        subject: 'Codia: Your comment added!!!',
        html: htmlString
    },
    (err, info)=>{          //callback function
        if(err){
            console.log('Error in sending the mail: ',err);
            return;
        }
        // console.log('Message sent', info);
        return;
    });
}