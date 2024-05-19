import * as httpRequest from "../utils/httpRequest";

export const getAllGenres = async () => {
  try {
    const res = await httpRequest.get("/api/genre/getAllGenres");
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const getComicsByGenres = async (genreIds) => {
  try {
    const res = await httpRequest.post("/api/genre/getComicsByGenres", {
      genreIds,
    });
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const getComicsByGenre = async (genreId) => {
  try {
    const res = await httpRequest.get(`/api/genre/getComicsByGenre/${genreId}`);
    return res;
  } catch (e) {
    console.log(e);
  }
};
