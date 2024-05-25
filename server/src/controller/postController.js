const postService = require('../services/post.services')
const imageServices = require('../services/image.services')

const createPost = async (req, res, next) => {
    try {
        const { idEvent, idUser, text } = req.body;
        if (!idEvent || !idUser || !text) throw new Error("Input is required");
        let saveFile = "";
        if (req.file) {
            const file = {
                data: req.file.buffer,
                contentType: req.file.mimetype
            }
            const saved = await imageServices.saveImage(file);
            saveFile = saved._id.toString();
        }
        const data = {
            idEvent: idEvent,
            idUser: idUser,
            text: text,
            image: saveFile
        }
        const newPost = await postService.createPost(data);
        res.status(200).json(newPost);

    } catch (error) {
        next(error)
    }
}

const getListPost = async (req, res, next) => {
    try {
        const idEvent = req.params.id;
        if (!idEvent) throw new Error('The EventId is required');
        const postList = await postService.getListPost(idEvent);
        res.status(200).json(postList);
    } catch (error) {
        next(error)
    }
}

const deletePost = async (req, res, next) => {
    try {
        const listIdPost = req.body.listId;
        if (!listIdPost) throw new Error('The PostId is required');
        const check = await listIdPost.map(async (idPost) => {
            const checkDelete = await postService.deletePost(idPost);
            return checkDelete;
        })

        res.status(200).json(check);
    } catch (error) {
        next(error)
    }
}

module.exports = { createPost, getListPost, deletePost }