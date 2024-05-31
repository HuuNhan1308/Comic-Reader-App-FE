import { decode as atob, encode as btoa } from "base-64";
import { jwtDecode } from "jwt-decode";
import { checkValidToken } from "../services/TokenServices";

if (!global.btoa) {
  global.btoa = btoa;
}
if (!global.atob) {
  global.atob = atob;
}

// RESPONSIBILITY BY: HO HUU NHAN

/**
 * Checks if a JWT token is expired.
 *
 * @param {string} token - The JWT token to check.
 *
 * This function decodes the token using `jwtDecode` and gets the current time in seconds.
 * It then checks if the expiration time of the token (in seconds) is less than the current time.
 * If it is, the token is expired and the function returns true. Otherwise, it returns false.
 *
 * @returns {boolean} Whether the token is expired.
 */
export const checkExpiredToken = (token) => {
  const decoded = jwtDecode(token);
  const now = Date.now() / 1000;

  if (decoded.exp < now) return true;
  else return false;
};

/**
 * Checks if a JWT token is near its expiration time.
 *
 * @param {string} token - The JWT token to check.
 * @param {number} duration - The duration in seconds to check against.
 *
 * This function decodes the token using `jwtDecode` and gets the current time in seconds.
 * It then calculates the time remaining until the token expires and checks if it is less than the specified duration.
 * If it is, the token is near its expiration time and the function returns true. Otherwise, it returns false.
 *
 * @returns {boolean} Whether the token is near its expiration time.
 */
export const checkNearExpiredToken = (token, duration) => {
  const decoded = jwtDecode(token);
  const now = Date.now() / 1000;
  const timeRemaining = decoded.exp - now;

  if (timeRemaining < duration) return true;
  else return false;
};

/**
 * Checks if a JWT token is valid.
 *
 * @param {string} token - The JWT token to check.
 *
 * This function sends a request to the `checkValidToken` service with the token.
 * If the request is successful, it returns the `valid` property of the result.
 * If an error occurs during the request, it logs the error and returns false.
 *
 * @returns {Promise<boolean>} Whether the token is valid.
 */
export const isTokenValid = async (token) => {
  try {
    const res = await checkValidToken(token);

    return res.result.valid;
  } catch (e) {
    console.log("Error at isTokenValid Service: ", e);
    return false;
  }
};
