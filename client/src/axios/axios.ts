import axios from "axios";

function getToken(): string | null {
  if (window && window != undefined) {
    return localStorage.getItem("accessToken");
  }
  return null;
}

export const AUTH_AXIOS = axios.create({
  baseURL: "/api/",
  timeout: 500,
  headers: { Authorization: `Bearer ${getToken()}` },
});

export const AXIOS = axios.create({
  baseURL: "/api/",
  timeout: 500,
});
