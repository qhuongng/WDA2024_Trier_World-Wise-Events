const router = require('express').Router();
const PostReplyController = require('../controller/postReplyController')

router.post('/createPostReply', PostReplyController.createPostReply);
router.get('/getListPostReply/:id', PostReplyController.getListReply);

module.exports = router