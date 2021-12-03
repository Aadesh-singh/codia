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

module.exports.destroy = function(req, res){
    Comment.findById(req.params.id, function(err, comment){
        if(err){
            console.log('Error in finding the comment: ', err);
            return;
        }
        Post.findById(comment.post, function(err, post){
            
            // check if either user owns the comment or user owns the post itsef only then user is authorised to delete the comment.
            if(comment.user == req.user.id || req.user.id == post.user){
                    // record post id before deleting the comment else post id of that comment will vanish.
                    let postId = comment.post;
                    comment.remove();
        
                    //while deleting a element in database we had to update that document like in this case when we have to delete element of array in post document then we have to find post and update the comments in it.
                    Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}}, function(err, post){
                        return res.redirect('back');
                    });
                } else{
                    return res.redirect('back');
                }
        });
    });
}