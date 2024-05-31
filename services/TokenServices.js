import * as http from "../utils/httpRequest";

/**
 * Refreshes a token.
 *
 * @param {string} token - The token to refresh.
 *
 * This function is asynchronous. It sends a POST request to the "/api/auth/refresh" endpoint using the httpRequest.post function with the token in the body.
 *
 * If the request is successful, it returns the response.
 * If an error occurs during the request, it logs the error with the message "Error at getMyInformation Service: ".
 */
export const refreshToken = async (token) => {
  try {
    const res = await http.post("/api/auth/refresh", {
      token: token,
    });

    return res;
  } catch (e) {
    console.log("Error at getMyInformation Service: ", e);
  }
};

/**
 * Checks if a token is valid.
 *
 * @param {string} token - The token to check.
 *
 * This function is asynchronous. It sends a POST request to the "/api/auth/introspect" endpoint using the httpRequest.post function with the token in the body.
 *
 * If the request is successful, it returns the response.
 * If an error occurs during the request, it logs the error with the message "Error at checkValidToken Service: ".
 */
export const checkValidToken = async (token) => {
  try {
    const res = await http.post("/api/auth/introspect", { token: token });

    return res;
  } catch (e) {
    console.log("Error at checkValidToken Service: ", e);
  }
};
