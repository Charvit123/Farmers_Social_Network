const disscussSchema = require('../models/discussionmodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/userModel');

const dissCtrl={
    addDetails: async (req, res) => {
        try {
            const { title, description, picture,id} = req.body;
            const user = await Users.findById(id).select('-password');
            const Detail = new disscussSchema({
                title:title, description:description, images:picture,user
            });

            await Detail.save();

            res.json({
                msg: 'Details added Successfully :)',
                Detail,
            });
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    showDetails:async (req, res) =>{
        try {
            const getDiscussions = await disscussSchema.find().sort('-createdAt');

            res.json({
                getDiscussions
            })
        } catch (error) {
            
        }
    }
}
module.exports = dissCtrl;