import * as http from "../utils/httpRequest";

// RESPONSIBILITY BY: DIEP HOAI AN & HOANG LONG VU

/**
 * Logs in a user.
 *
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 *
 * This function is asynchronous. It sends a POST request to the "/api/auth/login" endpoint using the httpRequest.post function with the username and password in the body and withCredentials set to true in the configuration.
 *
 * If the request is successful, it returns the response.
 * If an error occurs during the request, it logs the error.
 */
export const login = async (username, password) => {
  try {
    const res = await http.post(
      "/api/auth/login",
      {
        username,
        password,
      },
      { withCredentials: true }
    );
    return res;
  } catch (e) {
    console.log("Error at Login Service: ", e);
  }
};

/**
 * Logs out a user.
 *
 * @param {string} token - The token of the user.
 *
 * This function is asynchronous. It sends a POST request to the "/api/auth/logout" endpoint using the httpRequest.post function with the token in the body.
 *
 * If the request is successful, it returns the response.
 * If an error occurs during the request, it logs the error.
 */
export const logOut = async (token) => {
  try {
    const res = await http.post("/api/auth/logout", { token });
    return res;
  } catch (e) {
    console.log("Error at logOut Service: ", e);
  }
};

/**
 * Registers a user.
 *
 * @param {Object} data - The registration data of the user.
 *
 * This function is asynchronous. It sends a POST request to the "/api/auth/register" endpoint using the httpRequest.post function with the data in the body and withCredentials set to true in the configuration.
 *
 * If the request is successful, it returns the response.
 * If an error occurs during the request, it logs the error.
 */
export const register = async (data) => {
  try {
    const res = await http.post("/api/auth/register", data, {
      withCredentials: true,
    });
    return res;
  } catch (e) {
    console.log("Error at Login Service: ", e);
  }
};

/**
 * Sends an OTP to a user's email.
 *
 * @param {string} email - The email of the user.
 * @param {string} token - The token of the user.
 *
 * This function is asynchronous. It sends a POST request to the "/api/auth/resetPassword" endpoint using the httpRequest.post function with the email in the body and withCredentials set to true in the configuration.
 *
 * If the request is successful, it returns the response.
 * If an error occurs during the request, it logs the error.
 */
export const sendOTP = async (email, token) => {
  try {
    const res = await http.post(
      "/api/auth/resetPassword",
      { email },
      { withCredentials: true }
    );
    return res;
  } catch (e) {
    console.log("Error at Login Service - sendOTP: ", e);
  }
};

/**
 * Verifies an OTP.
 *
 * @param {string} email - The email of the user.
 * @param {string} otp - The OTP to verify.
 *
 * This function is asynchronous. It sends a POST request to the "/api/auth/verifyOtp" endpoint using the httpRequest.post function with the email and otp in the body and withCredentials set to true in the configuration.
 *
 * If the request is successful, it returns the response.
 * If an error occurs during the request, it logs the error.
 */
export const verifyOTP = async (email, otp) => {
  try {
    const res = await http.post(
      "/api/auth/verifyOtp",
      { email, otp },
      { withCredentials: true }
    );
    return res;
  } catch (e) {
    console.log("Error at Login Service - verifyOTP: ", e);
  }
};
