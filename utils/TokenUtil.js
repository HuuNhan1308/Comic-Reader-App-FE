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
  const now = Date.now() / 1000;

  if (decoded.exp < now) return true;
  else return false;
};

export const checkNearExpiredToken = (token, duration) => {
  const decoded = jwtDecode(token);
  const now = Date.now() / 1000;
  const timeRemaining = decoded.exp - now;

  if (timeRemaining < duration) return true;
  else return false;
};
