const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req, res){
    Post.findById(req.body.post, function(err, post){           // while creating comment we check if post exist then create
        if(err){                                                // create comment and while creating comment append the comment id in Post schema itself.    
            console.log('Error in find the post: ', err);
            return;
        }
        if(post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function(err, comment){
                if(err){
                    console.log('Error in Creating the comment: ', err);
                    return;
                }
                console.log('comment created succesfully !!!', comment);
                post.comments.push(comment);        // Updating the existing data
                post.save();                        // saving the updated data - while updating the existing document in DB, it only update it on the ram hence we have to save the data like this to reflect on DB.

                res.redirect('/');
            });
        }
    });
}