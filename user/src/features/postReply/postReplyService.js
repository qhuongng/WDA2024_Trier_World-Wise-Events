import axios from "axios";

const getPostReply = async (idPost) => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_URL}/postReply/getListPostReply/${idPost}`
  );
  if (response.data) {
    return response.data;
  }
};

const createPostReply = async (data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_SERVER_URL}/postReply/createPostReply`,
    data
  );
  if (response.data) {
    return response.data;
  }
};

export const postReplyService = { getPostReply, createPostReply };
