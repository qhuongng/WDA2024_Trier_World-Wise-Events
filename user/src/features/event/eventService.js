import axios from "axios";


const getEvents = async () => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/event/getListEvent`);
    if (response.data) {
        return response.data;
    }
};

const getPagedEvents = async (url) => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/event/getListEvent${url}`);
    if (response.data) {
        return response.data;
    }
};

const getSingleEvent = async (id) => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/event/getEvent/${id}`);
    if (response.data) {
        return response.data;
    }
};
export const eventService = {
    getEvents,
    getSingleEvent,
    getPagedEvents
};
