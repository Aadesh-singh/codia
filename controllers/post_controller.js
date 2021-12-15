const Post = require('../models/post');
const Comment = require('../models/comment');

// module.exports.posts = function(req, res){
//     return res.end('<h1>all posts</h1>');
// }


module.exports.createPost = async function(req, res){
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        if(req.xhr){
            // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
            post = await post.populate('user', 'name');

            return res.status(200).json({
                data: {
                    post: post
                },
                message: 'Post Created!'
            });
        }

        req.flash('success', 'Post Published Successfully!!!');
        return res.redirect('back');
    } catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }

}


module.exports.destroy = async function(req, res){
    try {
        const post = await Post.findById(req.params.id);

        if(post.user == req.user.id){
            post.remove();

            const comment = await Comment.deleteMany({post: req.params.id});

            if(req.xhr){
                
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: 'Post deleted'
                });
            }

            req.flash('success', 'Post Deleted Successfully');
            return res.redirect('back');
        } else {
            
            req.flash('error', 'You are Not Authorised for this act');
            return res.redirect('back');
        }
    } catch (err) {
        req.flash('error', err);
        return;
    }
}