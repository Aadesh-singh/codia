const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function(req, res){
    const posts = await Post.find({})
                    .sort('-createdAt')
                    .populate('user')
                    .populate({
                        path: 'comments',
                        populate: {
                            path: 'user'
                        }
                    });
    return res.status(200).json({
        message: "List of All Posts",
        data: {
            posts: posts
        }
    });
}

module.exports.destroy = async function(req, res){
    try {
        const post = await Post.findById(req.params.id);

        if(post.user == req.user.id){
            post.remove();

            const comment = await Comment.deleteMany({post: req.params.id});

            
            return res.status(200).json({
                message: "deleted Successfully"
            });
        } 
        else {
            return res.status(401).json({
                message: "You cannot delete this Post"
            });
        }
    } catch (err) {
        console.log(err);
        return res.json(500, {
            message: 'Internal Server Error'
        });
    }
}