import axios, { AxiosError, AxiosResponse } from "axios";
import { logoutCleanup } from ".";
import { Env } from "../../constants/env";

const onResponseSuccess = (response: AxiosResponse) => {
  return response;
};

const logout = () => {
  logoutCleanup();
  window.location.href = "/";
};

const onResponseError = (error: AxiosError) => {
  if (error.response?.status !== 401) {
    const errMessage = error.response?.data || error?.response || error;
    return Promise.reject(errMessage);
  }
  return refreshToken(error, logout);
};

const refreshToken = async (error: AxiosError, logout: Function) => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    logout();
    return;
  }
  try {
    const { data } = await axios.post(
      `${Env.apiUrl}/auth/refresh-token`,
      undefined,
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );

    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("user", JSON.stringify(data.user));

    //@ts-ignore
    error?.config.headers.setAuthorization("Bearer " + data.accessToken);
    //@ts-ignore
    return axios(error.config);
  } catch (error) {
    logout();
    return;
  }
};

export const request = axios.create({
  // Timeout 30p
  timeout: 30 * 60 * 1000,
});

export const internalRequest = axios.create({
  timeout: 30 * 60 * 1000,
  baseURL: Env.apiUrl,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken") ?? ""}`,
  },
  withCredentials: true,
});

internalRequest.interceptors.response.use(onResponseSuccess, onResponseError);
