import * as httpRequest from "../utils/httpRequest";

export const getAllComics = async () => {
  try {
    const res = await httpRequest.get("/api/comic/getAllComics");
    return res;
  } catch (e) {
    throw e;
  }
};

export const get6LastComics = async () => {
  try {
    const res = await httpRequest.get("/api/comic/get3MostViewComics");
    return res;
  } catch (e) {
    throw e;
  }
};

export const get3MostViewComics = async () => {
  try {
    const res = await httpRequest.get("/api/comic/get3MostViewComics");
    return res;
  } catch (e) {
    throw e;
  }
};

//get comic informmation
export const getComicInformation = async (comicId, token) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  try {
    const res = await httpRequest.get(
      "/api/comic/getComicInformation/" + comicId,
      token && config
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

export const rateComic = async (comicId, score, token) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  try {
    const res = await httpRequest.post(
      "/api/rating/rateComic",
      { comicId, score },
      config
    );

    return res;
  } catch (e) {
    console.log("Error at rate comic: " + e);
  }
};
