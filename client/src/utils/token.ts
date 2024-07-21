import { AxiosResponse } from "axios";

export type LOGIN_RESPONSE = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
};

export function setToken({ data }: AxiosResponse<LOGIN_RESPONSE>) {
  if (window && window != undefined) {
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
  }
}

export function removeTokens() {
  if (window && window != undefined) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
}
