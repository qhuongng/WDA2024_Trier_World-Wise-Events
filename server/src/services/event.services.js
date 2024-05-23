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
    await checkDate()
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
            .exec() || [];

        return { data: events }
    } catch (error) {
        throw new Error(error);
    }
}

const getEvent = async (id) => {
    await checkDate()
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
        const allEvents = await Event.find();
        for (const event of allEvents) {
            const startDate = new Date(event.startDate);
            const endDate = new Date(event.endDate);
            const now = new Date();

            const isOngoing = startDate <= now && endDate > now;

            await Event.updateOne(
                { _id: event._id },
                { $set: { isOngoing } }
            );
        }
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    addEvent,
    getListEvent,
    getEvent
}