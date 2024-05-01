import * as httpRequest from "../utils/httpRequest";

export const getAllComics = async () => {
  try {
    const res = await httpRequest.get("/api/comic/getAllComics");
    return res;
  } catch (e) {
    console.log(e);
  }
};

//get comic by search value

//get comic chapter by Id
export const getComicChapterById = async (comicId) => {
  try {
    const res = await httpRequest.get(
      `/api/chapter/getComicChapters/${comicId}`
    );

    return res;
  } catch (e) {
    console.log("Error: " + e);
  }
};

// get comic IMGs by comic Id and chapter Number
export const getComicIMGs = async (comicId, chapterNumber) => {
  try {
    const res = await httpRequest.get(
      "/api/image/getChapterImageUrls/" + comicId
    );
    return res;
  } catch (e) {
    console.log("Error: " + e);
  }
};
