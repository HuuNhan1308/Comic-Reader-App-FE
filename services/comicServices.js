import * as httpRequest from "../utils/httpRequest";

export const getAllComics = async () => {
  try {
    const res = await httpRequest.get("/api/comic/getAllComics");
    return res;
  } catch (e) {
    console.log(e);
  }
};

//get comic informmation

export const getComicInformation = async (comicId) => {
  try {
    const res = await httpRequest.get(
      "/api/comic/getComicInformation/" + comicId
    );

    return res;
  } catch (e) {
    console.log("Error: " + e);
  }
};

//get comic by search value
export const searchComics = async (searchValue) => {
  try {
    const res = await httpRequest.get("/api/comic/searchComics/" + searchValue);

    return res;
  } catch (e) {
    console.log("Error: " + e);
  }
};

//get comic chapter by Id
export const getComicChaptersById = async (comicId) => {
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
export const getComicChapter = async (chapterId) => {
  try {
    const res = await httpRequest.get("/api/chapter/getChapter/" + chapterId);
    return res;
  } catch (e) {
    console.log("Error: " + e);
  }
};
