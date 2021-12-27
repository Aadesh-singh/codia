const mongoose = require('mongoose');

const likeschema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId
    },
    // this defines the object id of liked object
    likable: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    // this field is used to define the type of liked object since this is a dynamic reference
    onModel: {
        type: String,
        required: true,
        enum: ['Post', 'Comment']
    }
}, {
    timestamps: true
});

const Like = mongoose.model('Like', likeschema);

module.exports = Like;