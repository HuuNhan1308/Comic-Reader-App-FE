import * as httpRequest from "../utils/httpRequest";

/**
 * Fetches all comics.
 *
 * This function is asynchronous. It sends a GET request to the "/api/comic/getAllComics" endpoint using the httpRequest.get function.
 *
 * If the request is successful, it returns the response.
 * If an error occurs during the request, it throws the error.
 */
export const getAllComics = async () => {
  try {
    const res = await httpRequest.get("/api/comic/getAllComics");
    return res;
  } catch (e) {
    throw e;
  }
};

/**
 * Fetches the 6 most recently added comics.
 *
 * This function is asynchronous. It sends a GET request to the "/api/comic/get3MostViewComics" endpoint using the httpRequest.get function.
 *
 * If the request is successful, it returns the response.
 * If an error occurs during the request, it throws the error.
 */
export const get6LastComics = async () => {
  try {
    const res = await httpRequest.get("/api/comic/get3MostViewComics");
    return res;
  } catch (e) {
    throw e;
  }
};

/**
 * Fetches the 3 most viewed comics.
 *
 * This function is asynchronous. It sends a GET request to the "/api/comic/get3MostViewComics" endpoint using the httpRequest.get function.
 *
 * If the request is successful, it returns the response.
 * If an error occurs during the request, it throws the error.
 */
export const get3MostViewComics = async () => {
  try {
    const res = await httpRequest.get("/api/comic/get3MostViewComics");
    return res;
  } catch (e) {
    throw e;
  }
};

/**
 * Fetches the information for a comic.
 *
 * @param {string} comicId - The ID of the comic.
 * @param {string} token - The user's token.
 *
 * This function is asynchronous. It first sets up the configuration for the HTTP request, including the Authorization header with the user's token.
 * It then sends a GET request to the "/api/comic/getComicInformation/" endpoint with the comicId appended to the URL using the httpRequest.get function with the configuration.
 *
 * If the request is successful, it returns the response.
 * If an error occurs during the request, it logs the error.
 */
export const getComicInformation = async (comicId, token) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  try {
    const res = await httpRequest.get(
      "/api/comic/getComicInformation/" + comicId,
      token && config
    );

    return res;
  } catch (e) {
    console.log("Error: " + e);
  }
};

/**
 * Searches for comics.
 *
 * @param {string} searchValue - The value to search for.
 *
 * This function is asynchronous. It sends a GET request to the "/api/comic/searchComics/" endpoint with the searchValue appended to the URL using the httpRequest.get function.
 *
 * If the request is successful, it returns the response.
 * If an error occurs during the request, it logs the error.
 */
export const searchComics = async (searchValue) => {
  try {
    const res = await httpRequest.get("/api/comic/searchComics/" + searchValue);

    return res;
  } catch (e) {
    console.log("Error: " + e);
  }
};

/**
 * Fetches the chapters for a comic.
 *
 * @param {string} comicId - The ID of the comic.
 *
 * This function is asynchronous. It sends a GET request to the "/api/chapter/getComicChapters/" endpoint with the comicId appended to the URL using the httpRequest.get function.
 *
 * If the request is successful, it returns the response.
 * If an error occurs during the request, it logs the error.
 */
export const getComicChaptersById = async (comicId) => {
  try {
    const res = await httpRequest.get(
      `/api/chapter/getComicChapters/${comicId}`
    );

    return res;
  } catch (e) {
    console.log("Error: " + e);
  }
};

/**
 * Rates a comic.
 *
 * @param {string} comicId - The ID of the comic.
 * @param {number} score - The score to give the comic.
 * @param {string} token - The user's token.
 *
 * This function is asynchronous. It first sets up the configuration for the HTTP request, including the Authorization header with the user's token.
 * It then sends a POST request to the "/api/rating/rateComic" endpoint using the httpRequest.post function with the comicId and score in the body and the configuration.
 *
 * If the request is successful, it returns the response.
 * If an error occurs during the request, it logs the error.
 */
export const rateComic = async (comicId, score, token) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  try {
    const res = await httpRequest.post(
      "/api/rating/rateComic",
      { comicId, score },
      config
    );

    return res;
  } catch (e) {
    console.log("Error at rate comic: " + e);
  }
};
