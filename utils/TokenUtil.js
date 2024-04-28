import { decode as atob, encode as btoa } from "base-64";
import { jwtDecode } from "jwt-decode";

if (!global.btoa) {
  global.btoa = btoa;
}
if (!global.atob) {
  global.atob = atob;
}

export const checkExpiredToken = (token) => {
  const decoded = jwtDecode(token);

  if (decoded.exp < Date.now() / 1000) return true;
  else return false;
};
