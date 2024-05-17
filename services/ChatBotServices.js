import * as httpRequest from "../utils/httpRequest";
import { CHAT_GPT_KEY } from "@env";

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
        key: CHAT_GPT_KEY,
      },
      config
    );

    return res;
  } catch (e) {
    console.log("Error: " + e);
  }
};
