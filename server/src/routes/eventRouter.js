const router = require('express').Router();
const eventController = require('../controller/eventController');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/createEvent', upload.array('images', 5), eventController.createEvent)

module.exports = router