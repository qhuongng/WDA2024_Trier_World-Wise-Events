const eventServices = require('../services/event.services')
const imageServices = require('../services/image.services')

const createEvent = async (req, res, next) => {
    try {
        const { eventName, city, country, startDate, endDate, description } = req.body;
        if (!eventName || !city || !country || !startDate || !endDate || !description) {
            throw new Error("Input is required")
        }
        const files = req.files.map(file => ({
            data: file.buffer,
            contentType: file.mimetype
        }));
        const savedFiles = await Promise.all(files.map(file => imageServices.saveImage(file)));

        const savedFileIds = savedFiles.map(savedFile => savedFile._id.toString());

        const data = {
            eventName: eventName,
            city: city,
            country: country,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            description: description,
            images: savedFileIds,
            isOngoing: false
        }
        const newEvent = await eventServices.addEvent(data);
        res.status(200).json(newEvent);
    } catch (error) {
        next(error)
    }
}

const getListEvent = async (req, res, next) => {
    try {
        const page = req.query.page;
        const limit = req.query.limit;
        if (!page || !limit) throw new Error("Query is required")
        let queryObj = {}
        if (req.query.keyword) {
            const keyword = JSON.parse(JSON.stringify(req.query.keyword));
            queryObj.$or = [
                { eventName: { $regex: keyword, $options: 'i' } },
                { city: { $regex: keyword, $options: 'i' } },
                { country: { $regex: keyword, $options: 'i' } }
            ];
        }
        const listEvent = await eventServices.getListEvent(queryObj, page, limit);
        res.status(200).json(listEvent);
    } catch (error) {
        next(error)
    }
}

const getEvent = async (req, res, next) => {
    try {
        const eventId = req.params.id;
        if (!eventId) {
            throw new Error('The eventId is required');
        }
        const event = await eventServices.getEvent(eventId);
        if (event) res.status(200).json(event)
    } catch (error) {
        next(error)
    }
}


module.exports = {
    createEvent, getListEvent, getEvent
}