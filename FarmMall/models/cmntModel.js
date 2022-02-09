const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    cmnt: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId, ref: 'user'
    },
    postId: {
        type: mongoose.Types.ObjectId, ref:'discuss'
    },
    postUserId: {
        type: mongoose.Types.ObjectId, ref:'user'
    }
},{
    timestamps: true
});

module.exports = mongoose.model('comment', commentSchema);