import * as httpRequest from "../utils/httpRequest";

// RESPONSIBILITY BY: HOANG LONG VU

/**
 * Finds comics using GPT-3.
 *
 * @param {string} token - The user's token.
 * @param {string} question - The question to ask GPT-3.
 *
 * This function is asynchronous. It first sets up the configuration for the HTTP request, including the Authorization header with the user's token.
 * It then sends a POST request to the "/api/gpt/findComics" endpoint using the httpRequest.post function with the question in the body and the configuration.
 *
 * If the request is successful, it returns the response.
 * If an error occurs during the request, it logs the error.
 */
export const gptFindComic = async (token, question) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  try {
    const res = await httpRequest.post(
      "/api/gpt/findComics",
      {
        question,
      },
      config
    );

    return res;
  } catch (e) {
    console.log("Error: " + e);
  }
};

/**
 * Asks a question to the AI language model.
 *
 * @param {string} token - The user's token.
 * @param {string} question - The question to ask the AI language model.
 *
 * This function is asynchronous. It first sets up the configuration for the HTTP request, including the Authorization header with the user's token.
 * It then sends a POST request to the "/api/gpt/askLMStudio" endpoint using the httpRequest.post function with the question in the body and the configuration.
 *
 * If the request is successful, it returns the response.
 * If an error occurs during the request, it logs the error.
 */
export const AI_LM_Asking = async (token, question) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  try {
    const res = await httpRequest.post(
      "/api/gpt/askLMStudio",
      {
        question,
      },
      config
    );

    return res;
  } catch (e) {
    console.log("Error: " + e);
  }
};
