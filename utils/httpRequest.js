import axios from "axios";

// const BASE_URL = "https://comic.pantech.vn";
const BASE_URL = "http://192.168.21.140:8080";

const httpRequest = axios.create({
  baseURL: BASE_URL,
});

export const get = async (path, options = {}) => {
  // console.log(
  //   "Start get at url ",
  //   httpRequest.getUri() + path,
  //   " with data ",
  //   options
  // );
  const response = await httpRequest.get(path, options);
  return response.data;
};

export const post = async (path, option = {}) => {
  // console.log(
  //   "Start post at url ",
  //   httpRequest.getUri() + path,
  //   " with data ",
  //   option
  // );
  const response = await httpRequest.post(path, option);
  return response.data;
};

export default httpRequest;
