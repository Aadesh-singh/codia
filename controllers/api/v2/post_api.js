module.exports.index = function(req, res){
    return res.status(200).json({
        message: "List of all posts in v2",
        data: {
            posts: [] 
        }
    });
}