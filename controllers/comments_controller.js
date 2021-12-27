const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mail/comment_mail');
const Like = require('../models/like');
// for parallel jobs
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_workers');


// while creating comment append the comment id in Post schema itself.
module.exports.create = async function(req, res){
    try {
        const post = await Post.findById(req.body.post);
        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            post.comments.push(comment);        // Updating the existing data
            post.save();                        // saving the updated data - while updating the existing document in DB, it only update it on the ram hence we have to save the data like this to reflect on DB.

            //this line will populaye user field with its name and email
            comment = await comment.populate('user', 'name email');
            // send email to user
            // commentsMailer.newComment(comment); 
            
            let job = queue.create('emails', comment).save(function(err){
                if(err){
                    console.log('Error in sending to the queue: ', err);
                    return;
                }
                console.log('job enqueued ', job.id);
            });

            if(req.xhr){
                
                return res.status(200).json({
                    data: {
                        comment: comment,
                        post_id: req.body.post
                    },
                    message: 'comment created Successfully'
                });
            }
            
            req.flash('success', 'You comment is added');
            return res.redirect('/');
        }
    } catch (error) {
        req.flash('error', error);
        return;
    }
}

module.exports.destroy = async function(req, res){
    try {
        const comment = await Comment.findById(req.params.id);
        const post = await Post.findById(comment.post);

        // check if either user owns the comment or user owns the post itsef only then user is authorised to delete the comment.
        if(comment.user == req.user.id || post.user == req.user.id ){
            let postId =comment.post;
            
            comment.remove();
            //while deleting a element in database we had to update that document like in this case when we have to delete element of array in post document then we have to find post and update the comments in it.
            const like = await Like.deleteMany({likable: req.params.id, onModel: 'Comment'});
            const post = await Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}});
            
            if(req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: 'Comment Deleted!!'
                });
            }

            req.flash('success', 'Comment Deleted Successfully');
            return res.redirect('/');
        }
    } catch (error) {
        req.flash('error', error);
        return;
    }
}
