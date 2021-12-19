const nodemailer = require('../config/nodemailer');


exports.newPost = (post) => {
    console.log('Inside a new Post');
    let htmlString = nodemailer.renderTemplate({post: post}, '/posts/new_posts.ejs');

    nodemailer.transporter.sendMail({
        from: 'thecodiaorg@gmail.com',
        to: post.user.email,
        subject: 'Codia: You Post is Published',
        html: htmlString
    }, 
    (err, info)=>{
        if(err){
            console.log('Error in sending mail: ', err);
            return;
        }
        console.log('Message Sent', info);
        return;
    });
}