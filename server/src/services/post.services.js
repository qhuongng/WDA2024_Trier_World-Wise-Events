const Post = require('../models/Post')
const Event = require('../models/Event')
const User = require('../models/user')
const ReplyService = require('./postReply.services')
const ImageService = require('./image.services')

const createPost = async (data) => {
    try {
        const event = await Event.findById(data.idEvent)
        if (!event) throw new Error("Event not found")
        const user = await User.findById(data.idUser)
        if (!user) throw new Error("User not found")
        const newPost = await Post.create(data)
        let apiString = ""
        if (!user.avatar.startsWith("http")) {
            apiString = `${process.env.REACT_APP_SERVER_BASE_URL}/api/image/getImage/${user.avatar}`
        } else {
            apiString = user.avatar
        }
        if (newPost) return {
            ...newPost.toObject(),
            username: user.username,
            avatar: apiString
        }
    } catch (error) {
        throw new Error(error)
    }
}

const getListPost = async (idEvent) => {
    try {
        const event = await Event.findById(idEvent)
        if (!event) throw new Error("Event not found")
        const existPosts = await Post.find({ idEvent: idEvent }) || []
        if (existPosts.length == 0) return { data: [] }

        const data = await Promise.all(existPosts.map(async (post) => {
            const user = await User.findById(post.idUser);
            let apiString = ""
            if (!user.avatar.startsWith("http")) {
                apiString = `${process.env.REACT_APP_SERVER_BASE_URL}/api/image/getImage/${user.avatar}`
            } else {
                apiString = user.avatar
            }
            return {
                ...post.toObject(),
                username: user.username,
                avatar: apiString
            }
        }));

        return { data: data }
    } catch (error) {
        throw new Error(error)
    }
}

const deletePost = async (idPost) => {
    try {
        const currenPost = await Post.findById(idPost)
        if (!currenPost) throw new Error("Post not found")
        const listPostReply = await ReplyService.getListReply(idPost);
        listPostReply.data.map(async (reply) => {
            await ReplyService.deleteReply(reply._id)
        })
        if (currenPost.image !== "") {
            await ImageService.deleteImage(currenPost.image)
        }
        await Post.findByIdAndDelete(idPost)
        return true;
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = { createPost, getListPost, deletePost }