import * as http from "../utils/httpRequest";

export const login = async (username, password) => {
  try {
    const res = await http.post(
      "/api/auth/login",
      {
        username,
        password,
      },
      { withCredentials: true }
    );
    return res;
  } catch (e) {
    console.log("Error at Login Service: ", e);
  }
};
