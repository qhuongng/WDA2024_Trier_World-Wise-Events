import axios from "axios";

const getListPost = async (idEvent) => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_URL}/post/getListPost/${idEvent}`
  );
  if (response.data) {
    return response.data;
  }
};

export const postService = { getListPost };
