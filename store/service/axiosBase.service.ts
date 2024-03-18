import { BaseQueryFn } from "@reduxjs/toolkit/dist/query";
import type { AxiosRequestConfig, AxiosError } from "axios";
import axios from "axios";
// import moment from "moment";

// let isRefreshing = false; // Cờ để theo dõi xem việc làm mới mã thông báo có đang được thực hiện hay không
// let refreshPromise: Promise<any> | null = null; // Promise cho quá trình làm mới mã thông báo

export const axiosBaseQuery =
  ({ baseUrl }: { baseUrl: string } = { baseUrl: "" }): BaseQueryFn<
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
      const token = localStorage.getItem("token");
      // const expireTime = localStorage.getItem("expires");

      // Kiểm tra xem mã thông báo đã hết hạn chưa
      // if (expireTime && moment().add(5, "minute").isAfter(moment(expireTime))) {
      //   // Nếu mã thông báo làm mới không đang được xử lý, bắt đầu quá trình làm mới
      //   if (!isRefreshing) {
      //     isRefreshing = true;

      //     // Tạo một promise mới cho quá trình làm mới mã thông báo
      //     refreshPromise = new Promise<void>(async (resolve, reject) => {
      //       try {
      //         const refreshToken = localStorage.getItem("refresh_token");
      //         const bodyData = { refreshToken };
      //         const response = await fetch(`${baseUrl}/auth/refresh`, {
      //           method: "POST",
      //           headers: {
      //             "Content-Type": "application/json",
      //           },
      //           body: JSON.stringify(bodyData),
      //         });

      //         const { data } = await response.json();
      //         token = data.accessToken;

      //         // Cập nhật mã thông báo trong localStorage
      //         localStorage.setItem("token", data.accessToken);
      //         localStorage.setItem("refresh_token", data.refreshToken);
      //         localStorage.setItem(
      //           "expires",
      //           moment().add(data.expiresTime, "seconds") as unknown as string
      //         );

      //         // Đặt lại các cờ liên quan đến làm mới
      //         isRefreshing = false;
      //         refreshPromise = null;

      //         resolve();
      //       } catch (error) {
      //         // Xử lý lỗi khi làm mới
      //         window.location.assign("/");
      //         localStorage.removeItem("token");
      //         localStorage.removeItem("refresh_token");
      //         localStorage.removeItem("expires");

      //         // Đặt lại các cờ liên quan đến làm mới
      //         isRefreshing = false;
      //         refreshPromise = null;

      //         reject(error);
      //       }
      //     });
      //   }

      //   // Nếu có một promise làm mới, đợi nó hoàn thành trước khi tiếp tục
      //   if (refreshPromise) {
      //     await refreshPromise;
      //   }
      // }

      // Gọi API thực tế với mã thông báo đã được cập nhật
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
      if (err.response?.status === 401) {
        // Xử lý lỗi không được ủy quyền
        window.location.assign("/login");
        localStorage.removeItem("token");
        // Có thể bạn muốn chuyển hướng đến trang đăng nhập ở đây
      }

      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
