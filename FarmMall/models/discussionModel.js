const mongoose = require('mongoose');

const disscussSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    images:{
        type:Array,
        require:true
    },
    user:{
        type: mongoose.Types.ObjectId, 
        ref: 'user'
    }
},{
    timestamps: true
})

module.exports = mongoose.model('discuss', disscussSchema);