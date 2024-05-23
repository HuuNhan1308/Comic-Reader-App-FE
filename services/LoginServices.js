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

export const logOut = async (token) => {
  try {
    const res = await http.post("/api/auth/logout", { token });
    return res;
  } catch (e) {
    console.log("Error at logOut Service: ", e);
  }
};

export const register = async (data) => {
  try {
    const res = await http.post("/api/auth/register", data, {
      withCredentials: true,
    });
    return res;
  } catch (e) {
    console.log("Error at Login Service: ", e);
  }
};

export const sendOTP = async (email, token) => {
  try {
    const res = await http.post(
      "/api/auth/resetPassword",
      { email },
      { withCredentials: true }
    );
    return res;
  } catch (e) {
    console.log("Error at Login Service - sendOTP: ", e);
  }
};

export const verifyOTP = async (email, otp) => {
  try {
    const res = await http.post(
      "/api/auth/verifyOtp",
      { email, otp },
      { withCredentials: true }
    );
    return res;
  } catch (e) {
    console.log("Error at Login Service - verifyOTP: ", e);
  }
};
