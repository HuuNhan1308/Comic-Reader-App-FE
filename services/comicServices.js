import * as httpRequest from "../utils/httpRequest";

export const getAllComics = async () => {
  try {
    const res = await httpRequest.get("/api/comic/getAllComics");
    return res;
  } catch (e) {
    console.log(e);
  }
};
