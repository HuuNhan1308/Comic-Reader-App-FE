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
