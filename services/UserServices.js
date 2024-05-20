import * as http from "../utils/httpRequest";

export const getMyInformation = async (token) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  try {
    const res = await http.get("/api/user/getMyInformation", config);

    return res;
  } catch (e) {
    console.log("Error at getMyInformation Service: ", e);
  }
};

export const changePassword = async (token, oldPassword, newPassword) => {
  const headers = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const data = {
    oldPassword,
    newPassword,
  };

  try {
    const res = await http.put("/api/user/changePassword", data, {
      ...headers,
    });

    return res;
  } catch (e) {
    console.log("Error at getMyInformation Service: ", e);
  }
};

export const changeUserProfile = async (token, data) => {
  const headers = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  try {
    const res = await http.put("/api/user/changeInformation", data, headers);

    return res;
  } catch (e) {
    console.log("Error at changeUserProfile Service: ", e);
  }
};
