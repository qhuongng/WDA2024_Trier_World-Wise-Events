const router = require('express').Router();
const eventController = require('../controller/eventController');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/createEvent', upload.array('images', 5), eventController.createEvent);
router.get('/getListEvent', eventController.getListEvent);
router.get('/getEvent/:id', eventController.getEvent);
router.get('/getAllEvent', eventController.getAllEvent);
router.get('/getListEventByKeyword', eventController.getListEventByKeyword);

module.exports = router