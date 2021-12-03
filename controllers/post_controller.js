const Post = require('../models/post');
const Comment = require('../models/comment');

// module.exports.posts = function(req, res){
//     return res.end('<h1>all posts</h1>');
// }

module.exports.createPost = function(req, res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    }, function(err, post){
        if(err){
            console.log(`Error Occured while creating the Post `, err);
            return;
        }
        console.log('Post Created: ',post);
        return res.redirect('back');
    });
}


module.exports.destroy = function(req, res){
    Post.findById(req.params.id, function(err, post){
        if(err){
            console.log('Error in finding the post: ',err);
            return;
        }
        //req.user._id will return a object id while req.user.id returns that same object id in string format.
        if(post.user == req.user.id){
            post.remove();

            Comment.deleteMany({post: req.params.id}, function(err){
                if(err){
                    console.log('error in deleting comments: ', err);
                    return;
                }
                return res.redirect('back');
            });
        } else {
            console.log('You are not authorised to commit this act!!!');
            return res.redirect('back'); 
        } 
    });
}