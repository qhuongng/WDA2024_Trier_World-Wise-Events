const eventServices = require('../services/event.services')

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
        const data = {
            eventName: eventName,
            city: city,
            country: country,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            description: description,
            images: files,
            isOngoing: false
        }
        const newEvent = await eventServices.addEvent(data);
        res.status(200).json(newEvent.data.images[0].data);
    } catch (error) {
        next(error)
    }
}


module.exports = {
    createEvent
}