const PostReplyService = require('../services/postReply.services')

const createPostReply = async (req, res, next) => {
    try {
        const { idPost, idUser, text } = req.body;
        if (!idPost || !idUser || !text) throw new Error("Input is required");
        const data = {
            idPost: idPost,
            idUser: idUser,
            text: text
        }
        const newReply = await PostReplyService.createPostReply(data);
        if (newReply) res.status(200).json(newReply);
    } catch (error) {
        next(error)
    }
}

const getListReply = async (req, res, next) => {
    try {
        const idPost = req.params.id;
        if (!idPost) throw new Error("Input is required");
        const listReply = await PostReplyService.getListReply(idPost);
        if (listReply) res.status(200).json(listReply)
    } catch (error) {
        next(error)
    }
}

module.exports = { createPostReply, getListReply }