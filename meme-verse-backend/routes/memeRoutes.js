const router = require('express').Router(); 
const {shareMeme,getMemes,like,comment}=require('../controllers/memeController') 
const upload = require("../middlewares/multer");
const authorize = require('../middlewares/authorize');

router.route('/share')
    .post([authorize],upload.single("meme"),shareMeme)

router.route('/getalls')
    .get([authorize],getMemes)

router.route('/like')
    .put([authorize],like)

router.route('/comment')
    .put([authorize],comment)

module.exports = router;