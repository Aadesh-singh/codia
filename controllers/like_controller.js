const Like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.toggleLike = async function(req, res){
    try {
        //likes/toggle/?id=abscsd&type=Post
        let likable;
        let deleted = false;

        if(req.query.type == 'Post'){
            likable  = await Post.findById(req.query.id).populate('likes');
        }else {
            likable  = await Comment.findById(req.query.id).populate('likes');
        }

        // check if like already exist
        let existingLike = await Like.findOne({
            user: req.user._id,
            likable: req.query.id,
            onModel: req.query.type
        });

        // if like already exist then delete it
        if(existingLike){
            likable.likes.pull(existingLike._id);
            likable.save();

            existingLike.remove();
            deleted = true;
        }else{
            // create a new Like
            let newLike = await Like.create({
                user: req.user._id,
                likable: req.query.id,
                onModel: req.query.type
            });

            likable.likes.push(newLike);
            likable.save();
        }

        return res.status(200).json({
            message: 'Reques successfull',
            data: {
                deleted: deleted
            }
        });

    } catch (error) {
        console.log(error);
        return res.json(500, {
        message: 'Internal Server Error'
        });
    }
}