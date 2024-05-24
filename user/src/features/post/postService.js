import axios from "axios";

const getListPost = async (idEvent) => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_API_URL}/post/getListPost/${idEvent}`
  );
  if (response.data) {
    return response.data;
  }
};

const createPost = async (data) => {
  console.log(`data: ${data}`);
  const response = await axios.post(
    `${process.env.REACT_APP_SERVER_API_URL}/post/createPost`,
    data
  );
  if (response.data) {
    return response.data;
  }
};

export const postService = { getListPost, createPost };
