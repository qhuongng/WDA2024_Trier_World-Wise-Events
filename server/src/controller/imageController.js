const imageService = require('../services/image.services')

const getImage = async (req, res, next) => {
    try {
        const imageId = req.params.id;
        if (!imageId) {
            throw new Error('The ImageId is required');
        }
        const img = await imageService.getImage(imageId);
        res.contentType(img.contentType);
        res.send(img.data);
    } catch (e) {
        next(e);
    }
}

const saveImage = async (req, res, next) => {
    try {
        const files = req.files.map(file => ({
            data: file.buffer,
            contentType: file.mimetype
        }));

        const savedFiles = await Promise.all(files.map(file => imageService.saveImage(file)));

        const savedFileIds = savedFiles.map(savedFile => savedFile._id);
        res.status(200).json(savedFileIds)
    } catch (e) {
        next(e)
    }
}

module.exports = {
    getImage,
    saveImage
}