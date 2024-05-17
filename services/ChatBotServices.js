import * as httpRequest from "../utils/httpRequest";

const key = process.env.CHAT_GPT_KEY;

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
        key,
      },
      config
    );

    return res;
  } catch (e) {
    console.log("Error: " + e);
  }
};
