import * as httpRequest from "../utils/httpRequest";

// get chapter comments by chapterId
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
