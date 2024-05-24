import axios from "axios";
import { getAuthUser } from "../../utils/authStorage";

const getQuestions = async (id) => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_API_URL}/quiz/getListQuestions/${id}`);
    if (response.data) {
        return response.data;
    } else {
        throw new Error('No data received from API');
    }
};

// const addResult = async (result) => {
//     const user = getAuthUser();
//     const response = await axios.post(`${process.env.REACT_APP_SERVER_API_URL}/quiz/createResult`,
//         result,
//         {
//             headers: {
//                 Authorization: "Bearer " + user.token,
//             },
//         });

//     if (response.data) {
//         return response.data;
//     }
// }

const addResult = async (result) => {
    const response = await axios.post(`${process.env.REACT_APP_SERVER_API_URL}/quiz/createResult`, result);

    if (response.data) {
        return response.data;
    }
}

const getAllResult = async (id) => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_API_URL}/quiz/getUserResult/${id}`);
    if (response.data) {
        return response.data;
    } else {
        throw new Error('No data received from API');
    }
}

export const quizService = {
    getQuestions,
    addResult,
    getAllResult
};
