import * as httpRequest from "../utils/httpRequest";

/**
 * Fetches the images and information for a comic chapter.
 *
 * @param {string} chapterId - The ID of the chapter.
 *
 * This function is asynchronous. It sends a GET request to the "/api/chapter/getChapter/" endpoint with the chapterId appended to the URL using the httpRequest.get function.
 *
 * If the request is successful, it returns the response.
 * If an error occurs during the request, it logs the error.
 */
export const getComicChapter = async (chapterId) => {
  try {
    const res = await httpRequest.get("/api/chapter/getChapter/" + chapterId);
    return res;
  } catch (e) {
    console.log("Error: " + e);
  }
};

/**
 * Fetches the comments for a comic chapter.
 *
 * @param {string} chapterId - The ID of the chapter.
 * @param {string} token - The user's token.
 *
 * This function is asynchronous. It first sets up the configuration for the HTTP request, including the Authorization header with the user's token.
 * It then sends a GET request to the "/api/comment/getCommentsOfChapter/" endpoint with the chapterId appended to the URL using the httpRequest.get function with the configuration.
 *
 * If the request is successful, it returns the response.
 * If an error occurs during the request, it does nothing.
 */
export const getChapterComments = async (chapterId, token) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  try {
    const res = await httpRequest.get(
      "/api/comment/getCommentsOfChapter/" + chapterId,
      config
    );

    return res;
  } catch (e) {}
};

/**
 * Posts a comment on a comic chapter.
 *
 * @param {string} chapterId - The ID of the chapter.
 * @param {string} content - The content of the comment.
 * @param {string} token - The user's token.
 *
 * This function is asynchronous. It first sets up the configuration for the HTTP request, including the Authorization header with the user's token.
 * It then sends a POST request to the "/api/comment/leaveComment" endpoint using the httpRequest.post function with the content and chapterId in the body and the configuration.
 *
 * If the request is successful, it returns the response.
 * If an error occurs during the request, it logs the error.
 */
export const postChapterComment = async (chapterId, content, token) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  try {
    const res = await httpRequest.post(
      "/api/comment/leaveComment",
      { content, chapterId },
      config
    );
    return res;
  } catch (e) {
    console.log("Error: " + e);
  }
};
