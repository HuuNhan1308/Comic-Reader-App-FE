import * as httpRequest from "../utils/httpRequest";

// get chapter IMGs and infor by chapter id
export const getComicChapter = async (chapterId) => {
  try {
    const res = await httpRequest.get("/api/chapter/getChapter/" + chapterId);
    return res;
  } catch (e) {
    console.log("Error: " + e);
  }
};

// get chapter comments by chapterId
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
