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
        console.log('Post Created: ', post);
        return res.redirect('back');
    } catch(err){
        console.log('Error while creating the Post', err);
        return;
    }

}


module.exports.destroy = async function(req, res){
    try {
        const post = await Post.findById(req.params.id);

        if(post.user == req.user.id){
            post.remove();

            const comment = await Comment.deleteMany({post: req.params.id});
            console.log('Post deleted successfully: ', post);
            return res.redirect('back');
        } else {
            console.log('You are Unauthorized !!!');
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error: ', err);
        return;
    }
}