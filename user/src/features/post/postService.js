import axios from "axios";

const getListPost = async (idEvent) => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_BASE_URL}/api/post/getListPost/${idEvent}`
  );
  if (response.data) {
    return response.data;
  }
};

const createPost = async (data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_SERVER_BASE_URL}/api/post/createPost`,
    data
  );
  if (response.data) {
    return response.data;
  }
};

export const postService = { getListPost, createPost };
