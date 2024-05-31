import * as httpRequest from "../utils/httpRequest";

// RESPONSIBILITY BY: HO HUU NHAN

/**
 * Fetches the user's bookmarks.
 *
 * @param {string} token - The user's token.
 *
 * This function is asynchronous. It first sets up the configuration for the HTTP request, including the Authorization header with the user's token.
 * It then sends a GET request to the "/api/bookmark/getMyBookmarks" endpoint using the httpRequest.get function with the configuration.
 *
 * If the request is successful, it returns the response.
 * If an error occurs during the request, it logs the error.
 */
export const getMyBookmakrs = async (token) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  try {
    const res = await httpRequest.get("/api/bookmark/getMyBookmarks", config);

    return res;
  } catch (e) {
    console.log("Error: " + e);
  }
};

/**
 * Bookmarks a comic.
 *
 * @param {string} comicId - The ID of the comic to bookmark.
 * @param {string} token - The user's token.
 *
 * This function is asynchronous. It first sets up the configuration for the HTTP request, including the Authorization header with the user's token.
 * It then sends a POST request to the "/api/bookmark/bookmarkComic" endpoint using the httpRequest.post function with the comicId in the body and the configuration.
 *
 * If the request is successful, it returns the response.
 * If an error occurs during the request, it logs the error.
 */
export const bookmarkComic = async (comicId, token) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  try {
    const res = await httpRequest.post(
      "/api/bookmark/bookmarkComic",
      { comicId },
      config
    );

    return res;
  } catch (e) {
    console.log("Error: " + e);
  }
};
