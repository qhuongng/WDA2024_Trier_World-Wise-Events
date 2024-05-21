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
        if (newPost) return { data: newPost }
    } catch (error) {
        throw new Error(error)
    }
}

const getListPost = async (idEvent) => {
    try {
        const event = await Event.findById(idEvent);
        if (!event) throw new Error("Event not found");
        const existPosts = await Post.find({ idEvent: idEvent })
        if (existPosts) return { data: existPosts }
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = { createPost, getListPost }