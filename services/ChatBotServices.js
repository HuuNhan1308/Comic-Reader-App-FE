import * as httpRequest from "../utils/httpRequest";

// get chapter comments by chapterId
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

// get chapter comments by chapterId
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
