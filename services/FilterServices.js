import * as httpRequest from "../utils/httpRequest";

// RESPONSIBILITY BY: HO HUU NHAN

/**
 * Fetches all genres.
 *
 * This function is asynchronous. It sends a GET request to the "/api/genre/getAllGenres" endpoint using the httpRequest.get function.
 *
 * If the request is successful, it returns the response.
 * If an error occurs during the request, it logs the error.
 */
export const getAllGenres = async () => {
  try {
    const res = await httpRequest.get("/api/genre/getAllGenres");
    return res;
  } catch (e) {
    console.log(e);
  }
};

/**
 * Fetches comics by genres.
 *
 * @param {Array<string>} genreIds - The IDs of the genres.
 *
 * This function is asynchronous. It sends a POST request to the "/api/genre/getComicsByGenres" endpoint using the httpRequest.post function with the genreIds in the body.
 *
 * If the request is successful, it returns the response.
 * If an error occurs during the request, it logs the error.
 */
export const getComicsByGenres = async (genreIds) => {
  try {
    const res = await httpRequest.post("/api/genre/getComicsByGenres", {
      genreIds,
    });
    return res;
  } catch (e) {
    console.log(e);
  }
};

/**
 * Fetches comics by genre.
 *
 * @param {string} genreId - The ID of the genre.
 *
 * This function is asynchronous. It sends a GET request to the "/api/genre/getComicsByGenre/" endpoint with the genreId appended to the URL using the httpRequest.get function.
 *
 * If the request is successful, it returns the response.
 * If an error occurs during the request, it logs the error.
 */
export const getComicsByGenre = async (genreId) => {
  try {
    const res = await httpRequest.get(`/api/genre/getComicsByGenre/${genreId}`);
    return res;
  } catch (e) {
    console.log(e);
  }
};
