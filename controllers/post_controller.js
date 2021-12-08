const Post = require('../models/post');
const Comment = require('../models/comment');

// module.exports.posts = function(req, res){
//     return res.end('<h1>all posts</h1>');
// }


module.exports.createPost = async function(req, res){
    try{
        const post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

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