const router = require('express').Router();
const imageController = require('../controller/imageController')

router.get('/getImage/:id', imageController.getImage);

module.exports = router