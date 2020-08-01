const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    //comment belongs to a user so we do reference to a user
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    //post on which comment is there
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
},{
    timestamps: true
});

const Comment = mongoose.model('Comment',commentSchema);
module.exports = Comment;


