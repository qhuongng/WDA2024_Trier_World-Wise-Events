import axios from "axios";

const getQuestions = async (id) => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/quiz/getListQuestions/${id}`);
    if (response.data) {
        return response.data;
    } else {
        throw new Error('No data received from API');
    }
};

export const quizService = {
    getQuestions,
};
