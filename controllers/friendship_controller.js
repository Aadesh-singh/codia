const User = require('../models/user');
const Friendship = require('../models/friendship');


module.exports.addFriend = async function(req, res){
    try{
        let user = await User.findById(req.user._id);
        const friendship = await Friendship.create({
            from_user: user._id,
            to_user: req.params.id
        });
        // req.user.friends.push(friendship);
        user.friends.push(friendship);
        user.save();
        console.log(friendship);
        console.log(user.friends);
        return res.redirect('/');
    }
    catch(err){
        console.log('Error in establishing friendship', err);
        return res.redirect('back');
    }
}

module.exports.removeFriend = async function(req, res){
    try{
        const user = await User.findById(req.user._id);
        const friendship = await Friendship.findOne({to_user: req.params.id, from_user: user._id});
        // const friendship = await Friendship.findOne(
        //                                 {$or: [
        //                                     {to_user: user._id, from_user: req.params.id}, 
        //                                     {to_user: req.params.id, from_user: user._id}
        //                                 ]});
        if(!friendship){
            console.log('Friendship does not exist');
            return res.redirect('back');
        }
        const id = friendship._id;
        friendship.remove();
        let index = user.friends.indexOf(id);
        user.friends.splice(index, 1);
        user.save();
        return res.redirect('/');
    }catch(e){
        console.log('Error in removing friend: ',e);
        return res.status(501).json({
            message: 'Server error Occured'
        });
    }
}