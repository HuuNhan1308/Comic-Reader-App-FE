import * as httpRequest from "../utils/httpRequest";

export const getAllGenres = async () => {
  try {
    const res = await httpRequest.get("/api/genre/getAllGenres");
    return res;
  } catch (e) {
    console.log(e);
  }
};
