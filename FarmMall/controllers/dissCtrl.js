const disscussSchema = require("../models/discussionmodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../models/userModel");
const Comments = require("../models/cmntModel");
const { request } = require("express");

const dissCtrl = {
  addDetails: async (req, res) => {
    try {
      const { title, description, picture, id } = req.body;
      const user = await Users.findById(id);
      const Detail = new disscussSchema({
        title: title,
        description: description,
        images: picture,
        user,
      });

      await Detail.save();

      res.json({
        msg: "Details added Successfully :)",
        Detail,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  showDetails: async (req, res) => {
    try {
      const getDiscussions = await disscussSchema.find().sort("-createdAt");

      res.json({
        msg: "Details showed Successfully :)",
        getDiscussions,
      });
    } catch (error) { }
  },
  usersPost: async (req, res) => {
    const getUsersPost = await disscussSchema.find({ user: req.body.id }).sort("-createdAt");
    res.json({
      msg: "usersPost",
      getUsersPost,
    })
  },
  deletePost: async (req, res) => {
    try {
      const post = await disscussSchema.findByIdAndDelete({ _id: req.body.id });
      const cmnt = await Comments.find({ postId: req.body.id }).deleteMany({ postId: req.body.id })

      res.json({
        msg: 'Post Removed',
      })
    }
    catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  addComment: async (req, res) => {
    try {
      const { cmnt, id, postId, postUser } = req.body;

      const com = await disscussSchema.findOne({ _id: postId });
      if (!com)
        return res.status(400).json({ msg: "This Post does not exist." });

      const newCmnt = new Comments({
        cmnt,
        postId,
        postUser,
        user: id,
      });

      await newCmnt.save();

      res.json({
        msg: "News Added XD",
        newCmnt,
      });
    } catch (err) {
      return res.status(500).json({ msg: "error" });
    }
  },

  comment: async (req, res) => {
    try {
      const comments = await Comments.find({ postId: req.body.postId });
      if (!comments)
        return res.status(400).json({ msg: "This News does not exist" });

      res.json({
        comments,
      });
      // console.log(comments);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }

    // console.log(req.body);
  },
  deleteCmnt: async (req, res) => {
    try {
      const cmnt = await Comments.findOneAndDelete({ _id: req.body.id })
      res.json({
        msg: 'Cmnt Removed',
      })
    }
    catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
};
module.exports = dissCtrl;
