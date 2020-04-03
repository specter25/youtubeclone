const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const multer = require('multer');
const { auth } = require("../middleware/auth");
const ffmpeg = require('fluent-ffmpeg')
const { Video } = require("../models/Video")
const { Subscriber } = require("../models/Subscriber")
//=================================
//             Video
//=================================

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4') {
            return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
        }
        cb(null, true)
    }
})
var upload = multer({ storage: storage }).single("file")


//=================================
//             User
//=================================


router.post("/uploadfiles", (req, res) => {
    console.log("command shifted here");
    upload(req, res, err => {
        if (err) {
            console.log(err);
            return res.json({ success: false, err })
        }
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
    })

});


router.post("/thumbnail", (req, res) => {

    let thumbsFilePath = "";
    let fileDuration = "";

    ffmpeg.ffprobe(req.body.filePath, function (err, metadata) {
        // console.dir(metadata);
        // console.log(metadata.format.duration);

        fileDuration = metadata.format.duration;
    })


    ffmpeg(req.body.filePath)
        .on('filenames', function (filenames) {
            console.log('Will generate ' + filenames.join(', '))
            thumbsFilePath = "uploads/thumbnails/" + filenames[0];
        })
        .on('end', function () {
            console.log('Screenshots taken');
            return res.json({ success: true, thumbsFilePath: thumbsFilePath, fileDuration: fileDuration })
        })
        .screenshots({
            // Will take screens at 20%, 40%, 60% and 80% of the video
            count: 3,
            folder: 'uploads/thumbnails',
            size: '320x240',
            // %b input basename ( filename w/o extension )
            filename: 'thumbnail-%b.png'
        });

});


router.post("/uploadVideo", async (req, res) => {
    try {
        const video = new Video(req.body);
        await video.save();
        return res.status(200).json({ success: true })
    } catch (err) {
        if (err) {
            console.log(err);
            return res.status(400).json({ success: false, err })
        }
    }

});

router.post("/uploadVideo", async (req, res) => {
    try {
        const video = new Video(req.body);
        await video.save();
        return res.status(200).json({ success: true })
    } catch (err) {
        if (err) {
            console.log(err);
            return res.status(400).json({ success: false, err })
        }
    }

});


router.get("/getVideos", async (req, res) => {
    Video.find().populate('writer').exec((err, videos) => {
        if (err) return res.status(400).send(err)
        res.status(200).json({ success: true, videos })
    })

});



router.post("/getVideo", (req, res) => {

    Video.findOne({ "_id": req.body.videoId })
        .populate('writer')
        .exec((err, video) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, video })
        })
});


router.post("/getSubscriptionVideos", async (req, res) => {

    let subscriberUser = []
    try {
        //find all the users that i am subscribed to
        var subscribers = await Subscriber.find({ 'userFrom': req.body.userFrom });
        subscribers.map((subscriber, i) => {
            subscriberUser.push(subscriber.userTo)
        })
        //find all the videos uploded by those users
        const videos = await Video.find({ writer: { $in: subscriberUser } }).populate('writer')
        res.status(200).json({ success: true, videos })



    } catch (error) {
        if (error) return res.status(400).send(err);
    }
});




module.exports = router;


//video3
//create upload files path
//import multer , goto docs , copy storage code and change destination naem to /uploads
//create an uploads folder
//change the name by which the file is going to be saved from
// this file.fieldname + '-' + Date.now() to `${Date.now()} _${file.originalname}`
//also create the fileFilter method nad add.single(file) in the uploads line
// then call uploads in the route and complete the route

//video4
//creating thumbnail route
//require ffmpeg
//goto docs of fluent-ffmpeg
//create a folder in uploads folder for the thumbnails feature
//copy the code and for the duration use the ffprobe feature of it
//also configure the filepath variable after taking the screenshots
// as thumbsFilePath = "uploads/thumbnails/" + filenames[0];
//goback to on drop feature

//video5 
//create the uploadvideo route

//video6
//craete the get all videos route
//in the video schema we have only the id of the writer but we want to have all the info of that writer so
//we have to pupulate it

//video7
//make the get indivisual video route

//video8
//create the route to get all the subscribed videos