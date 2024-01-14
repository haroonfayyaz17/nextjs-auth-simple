import { jwtDecode } from "jwt-decode"; // import dependency

const TOKEN_KEY = "simple-auth-token";

export const sleep = (secs) =>
  new Promise((resolve) => setTimeout(resolve, secs * 1000));

export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);

export const getUserInfo = () => {
  console.log("typeof window: ", typeof window);
  if (typeof window !== "undefined") {
    const token = localStorage.getItem(TOKEN_KEY);
    console.log('token: ', jwtDecode(token))
    return token && jwtDecode(token);
  }
};
