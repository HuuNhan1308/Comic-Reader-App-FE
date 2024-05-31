import * as http from "../utils/httpRequest";

// RESPONSIBILITY BY: DIEP HOAI AN

/**
 * Fetches the information of the current user.
 *
 * @param {string} token - The token of the user.
 *
 * This function is asynchronous. It first sets up the configuration for the HTTP request, including the Authorization header with the user's token.
 * It then sends a GET request to the "/api/user/getMyInformation" endpoint using the httpRequest.get function with the configuration.
 *
 * If the request is successful, it returns the response.
 * If an error occurs during the request, it logs the error with the message "Error at getMyInformation Service: ".
 */
export const getMyInformation = async (token) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  try {
    const res = await http.get("/api/user/getMyInformation", config);

    return res;
  } catch (e) {
    console.log("Error at getMyInformation Service: ", e);
  }
};

/**
 * Changes the password of the current user.
 *
 * @param {string} token - The token of the user.
 * @param {string} oldPassword - The old password of the user.
 * @param {string} newPassword - The new password of the user.
 *
 * This function is asynchronous. It first sets up the configuration for the HTTP request, including the Authorization header with the user's token.
 * It then sends a PUT request to the "/api/user/changePassword" endpoint using the httpRequest.put function with the oldPassword and newPassword in the body and the configuration.
 *
 * If the request is successful, it returns the response.
 * If an error occurs during the request, it logs the error with the message "Error at getMyInformation Service: ".
 */
export const changePassword = async (token, oldPassword, newPassword) => {
  const headers = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const data = {
    oldPassword,
    newPassword,
  };

  try {
    const res = await http.put("/api/user/changePassword", data, {
      ...headers,
    });

    return res;
  } catch (e) {
    console.log("Error at getMyInformation Service: ", e);
  }
};

/**
 * Changes the profile of the current user.
 *
 * @param {string} token - The token of the user.
 * @param {Object} data - The new profile data of the user.
 *
 * This function is asynchronous. It first sets up the configuration for the HTTP request, including the Authorization header with the user's token.
 * It then sends a PUT request to the "/api/user/changeInformation" endpoint using the httpRequest.put function with the data in the body and the configuration.
 *
 * If the request is successful, it returns the response.
 * If an error occurs during the request, it logs the error with the message "Error at changeUserProfile Service: ".
 */
export const changeUserProfile = async (token, data) => {
  const headers = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  try {
    const res = await http.put("/api/user/changeInformation", data, headers);

    return res;
  } catch (e) {
    console.log("Error at changeUserProfile Service: ", e);
  }
};
