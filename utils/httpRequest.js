import axios from "axios";

const BASE_URL = "https://comic.pantech.vn";

const httpRequest = axios.create({
  baseURL: BASE_URL,
});

export const get = async (path, options = {}) => {
  const response = await httpRequest.get(path, options);
  return response.data;
};

export default httpRequest;
