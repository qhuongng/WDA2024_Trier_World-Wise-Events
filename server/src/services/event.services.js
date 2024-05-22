const Event = require('../models/Event')

const addEvent = async (data) => {
    try {
        const existEvent = await Event.findOne({ eventName: data.eventName })
        if (existEvent) throw new Error("Event already exists");
        else {
            if (new Date(data.startDate) < new Date() && new Date(data.startDate) < new Date()) data.isOngoing = true
            else data.isOngoing = false
            const newEvent = await Event.create(data);
            if (!newEvent) throw new Error("Can't create new event, try againt")
            else {
                return {
                    data: newEvent
                }
            }
        }
    } catch (error) {
        throw new Error(error)
    }
}

const getListEvent = async (queryStr, page, limit) => {
    checkDate
    try {
        const projection = {
            eventName: 1,
            city: 1,
            country: 1,
            startDate: 1,
            endDate: 1,
            images: { $slice: 1 }, // Lấy ảnh đầu tiên (nếu có)
            isOngoing: 1,
            location: 1
        };
        const skip = (page - 1) * limit;
        const eventCount = await Event.countDocuments();
        if (skip >= eventCount) throw new Error("This page does not exists")

        const events = await Event.find(queryStr, projection)
            .skip(skip)
            .limit(limit)
            .exec();

        return { data: events }
    } catch (error) {
        throw new Error(error);
    }
}

const getEvent = async (id) => {
    checkDate
    try {
        const event = Event.findById(id);
        if (!event) throw new Error("Event is not exist")
        return event
    } catch (error) {
        throw new Error(error)
    }
}

const checkDate = async () => {
    try {
        const allEvent = await Event.find();
        allEvent.map((event) => {
            if (new Date(event.startDate) <= new Date() && new Date(event.startDate) <= new Date()) event.isOngoing = true
            else event.isOngoing = false
        })
        await allEvent.save();
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    addEvent,
    getListEvent,
    getEvent
}