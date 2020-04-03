const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const multer = require('multer');
const { auth } = require("../middleware/auth");
const ffmpeg = require('fluent-ffmpeg')
const { Video } = require("../models/Video")
const { Subscriber } = require("../models/Subscriber")

const { Comment } = require("../models/Comment")


router.post("/saveComment", async (req, res) => {

    try {
        var comment = new Comment(req.body);
        var comm = await comment.save();
        var result = await Comment.find({ '_id': comm._id }).populate('writer');
        return res.status(200).json({ success: true, result });


    } catch (error) {
        if (error) return res.status(400).send(err)
    }
});


router.post("/getComment", async (req, res) => {

    try {

        var comments = await Comment.find({ 'postId': req.body.videoId }).populate('writer');
        return res.status(200).json({ success: true, comments });


    } catch (error) {
        if (error) return res.status(400).send(err)
    }

});

module.exports = router;