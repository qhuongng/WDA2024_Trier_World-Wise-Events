const Event = require('../models/Event')

const addEvent = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            //console.log(data);
            const existEvent = await Event.findOne({ eventName: data.eventName })
            if (existEvent) reject({ message: "Event already exists" })
            else {
                if (new Date(data.startDate) < new Date() && new Date(data.startDate) < new Date()) data.isOngoing = true
                else data.isOngoing = false
                const newEvent = await Event.create(data);
                if (!newEvent) reject("Can't create new event, try againt")
                else resolve({ data: newEvent })
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    addEvent
}