import * as http from "../utils/httpRequest";

export const refreshToken = async (token) => {
  try {
    const res = await http.post("/api/auth/refresh", {
      token: token,
    });

    return res;
  } catch (e) {
    console.log("Error at getMyInformation Service: ", e);
  }
};
