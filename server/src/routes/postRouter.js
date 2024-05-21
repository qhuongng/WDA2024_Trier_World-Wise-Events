const router = require('express').Router();
const postController = require('../controller/postController');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/createPost', upload.single('image'), postController.createPost);
router.get('/getListPost/:id', postController.getListPost);

module.exports = router