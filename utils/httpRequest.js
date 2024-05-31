import axios from "axios";

// RESPONSIBILITY BY: HO HUU NHAN

const BASE_URL = "http://103.116.52.147:8080";
// const BASE_URL = "http://192.168.21.140:8080";

const httpRequest = axios.create({
  baseURL: BASE_URL,
});

/**
 * Sends a GET request to the specified path.
 *
 * @param {string} path - The path to send the request to.
 * @param {Object} config - The configuration object for the request.
 *
 * This function sends a GET request to the specified path using the axios instance `httpRequest`.
 * It returns the data from the response.
 *
 * @returns {Promise<Object>} The data from the response.
 */
export const get = async (path, config = {}) => {
  // console.log(
  //   "Start get at url ",
  //   httpRequest.getUri() + path,
  //   " with data ",
  //   options
  // );

  const response = await httpRequest.get(path, config);
  return response.data;
};

/**
 * Sends a POST request to the specified path with the specified data.
 *
 * @param {string} path - The path to send the request to.
 * @param {Object} data - The data to send with the request.
 * @param {Object} config - The configuration object for the request.
 *
 * This function sends a POST request to the specified path with the specified data using the axios instance `httpRequest`.
 * It returns the data from the response.
 *
 * @returns {Promise<Object>} The data from the response.
 */
export const post = async (path, data, config = {}) => {
  // console.log(
  //   "Start post at url ",
  //   httpRequest.getUri() + path,
  //   " with data ",
  //   option
  // );
  const response = await httpRequest.post(path, data, config);
  return response.data;
};

/**
 * Sends a PUT request to the specified path with the specified data.
 *
 * @param {string} path - The path to send the request to.
 * @param {Object} data - The data to send with the request.
 * @param {Object} config - The configuration object for the request.
 *
 * This function sends a PUT request to the specified path with the specified data using the axios instance `httpRequest`.
 * It returns the data from the response.
 *
 * @returns {Promise<Object>} The data from the response.
 */
export const put = async (path, data, config = {}) => {
  const response = await httpRequest.put(path, data, config);
  return response.data;
};

export default httpRequest;
