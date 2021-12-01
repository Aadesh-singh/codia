const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.posts = function(req, res){
    return res.end('<h1>all posts</h1>');
}

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

module.exports.createComment = function(req, res){
    Comment.create({
        content: req.body.content,
        user: req.user._id,
        // post: req    TODO -start point  
    }, function(err, comment){
        if(err){
            console.log('Error while creating the comment: ', err);
            return;
        }
        console.log('Comment Added successfully: ', comment);
        return res.redirect('back');
    });
}