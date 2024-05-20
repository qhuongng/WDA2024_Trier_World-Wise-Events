const Image = require('../models/Image')

const saveImage = async (files) => {
    try {
        const saveImg = await Image.create(files);
        if (!saveImg) {
            throw new Error('Error in save image')
        }
        return saveImg
    } catch (e) {
        throw new Error(e)
    }
}

const getImage = async (id) => {
    try {
        const check = await Image.findById(id);

        if (!check) {
            throw new Error('The Image not found')
        } else {
            return check
        }
    } catch (e) {
        throw new Error(e)
    }
}

module.exports = { saveImage, getImage }