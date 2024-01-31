import { BaseQueryFn } from "@reduxjs/toolkit/dist/query";
import type { AxiosRequestConfig, AxiosError } from "axios";
import axios from "axios";

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers }) => {
    try {
      let token = localStorage.getItem("token");
      // let refreshToken = localStorage.getItem("refresh_token");
      // const expireTime = localStorage.getItem("expires");
      // if (expireTime && moment().add(1, "minute").isAfter(moment(expireTime))) {
      //   try {
      //     const bodyData = { refreshToken };
      //     const response = await fetch(`${baseUrl}/auth/refresh`, {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify(bodyData),
      //     });
      //     const { data } = await response.json();
          
      //     token = data.accessToken;
      //     localStorage.setItem("token", data.accessToken);
      //     localStorage.setItem("refresh_token", data.refreshToken);
      //     localStorage.setItem(
      //       "expires",
      //       moment().add(data.expiresTime, "seconds") as unknown as string
      //     );
      //   } catch (error) {
      //     window.location.assign("/");
      //     localStorage.removeItem("token");
      //   }
      // }
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: {
          ...headers,
          ...(token ? { authorization: `Bearer ${token}` } : {}),
        },
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
