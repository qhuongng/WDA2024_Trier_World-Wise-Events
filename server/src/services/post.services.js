const Post = require('../models/Post')
const Event = require('../models/Event')
const User = require('../models/user')

const createPost = async (data) => {
    try {
        const event = await Event.findById(data.idEvent);
        if (!event) throw new Error("Event not found");
        const user = await User.findById(data.idUser);
        if (!user) throw new Error("User not found");
        const newPost = await Post.create(data)
        let apiString = ""
        if (!user.avatar.startsWith("http")) {
            apiString = `http://localhost:3600/api/image/getImage/${user.avatar}`
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
        const event = await Event.findById(idEvent);
        if (!event) throw new Error("Event not found");
        const existPosts = await Post.find({ idEvent: idEvent }) || []
        if (existPosts.length == 0) return { data: [] }

        const data = await Promise.all(existPosts.map(async (post) => {
            const user = await User.findById(post.idUser);
            let apiString = ""
            if (!user.avatar.startsWith("http")) {
                apiString = `http://localhost:3600/api/image/getImage/${user.avatar}`
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

module.exports = { createPost, getListPost }