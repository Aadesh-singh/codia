const Comment = require('../models/comment');
const Post = require('../models/post');


// while creating comment append the comment id in Post schema itself.
module.exports.create = async function(req, res){
    try {
        const post = await Post.findById(req.body.post);
        if(post){
            const comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            post.comments.push(comment);        // Updating the existing data
            post.save();                        // saving the updated data - while updating the existing document in DB, it only update it on the ram hence we have to save the data like this to reflect on DB.

            
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
            const post = await Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}});
            
            req.flash('success', 'Comment Deleted Successfully');
            return res.redirect('/');
        }
    } catch (error) {
        req.flash('error', error);
        return;
    }
}
