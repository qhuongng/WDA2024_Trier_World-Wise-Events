const PostReply = require('../models/PostReply')
const Post = require('../models/Post')
const User = require('../models/user')

const createPostReply = async (data) => {
    try {
        const post = await Post.findById(data.idPost);
        if (!post) throw new Error("Post not found");
        const user = await User.findById(data.idUser);
        if (!user) throw new Error("User not found");
        const newReply = await PostReply.create(data);
        if (newReply) return { data: newReply }
    } catch (error) {
        throw new Error(error)
    }
}

const getListReply = async (idPost) => {
    try {
        const post = await Post.findById(idPost);
        if (!post) throw new Error("Post not found");
        const replyList = await PostReply.find({ idPost: idPost });
        if (replyList) return { data: replyList }
    } catch (error) {
        throw new Error(error)
    }
}
module.exports = { createPostReply, getListReply }