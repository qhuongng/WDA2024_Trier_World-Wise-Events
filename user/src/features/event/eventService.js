import axios from "axios";

const getEvents = async () => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/api/event/getAllEvent`);
    if (response.data) {
        return response.data;
    }
};

const getPagedEvents = async (url) => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/api/event/getListEvent${url}`);
    if (response.data) {
        return response.data;
    }
};

const getKeywordEvents = async (url) => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/api/event/getListEventByKeyword${url}`);
    if (response.data) {
        return response.data;
    }
};

const getSingleEvent = async (id) => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/api/event/getEvent/${id}`);
    if (response.data) {
        return response.data;
    }
};

export const eventService = {
    getEvents,
    getKeywordEvents,
    getSingleEvent,
    getPagedEvents
};
