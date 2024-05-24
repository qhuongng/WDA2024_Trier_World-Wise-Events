import axios from "axios";

const getPostReply = async (idPost) => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_API_URL}/postReply/getListPostReply/${idPost}`
  );
  if (response.data) {
    return response.data;
  }
};

export const postReplyService = { getPostReply };
