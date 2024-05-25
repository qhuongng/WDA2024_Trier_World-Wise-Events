const mongoose = require('mongoose')
const Image = new mongoose.Schema({
    data: Buffer,
    contentType: String
});

const imgSchema = mongoose.model('Image', Image);

module.exports = imgSchema;
