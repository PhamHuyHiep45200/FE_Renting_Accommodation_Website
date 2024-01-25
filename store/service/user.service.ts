import { Action, PayloadAction } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import { axiosBaseQuery } from "./axiosBase.service";

type RootState = any;

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
  return action.type === HYDRATE;
}

export const userQuery = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_URL_SERVER as string,
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: [],
  endpoints(build) {
    return {
      getMe: build.query({
        query: () => ({ url: "/users/me", method: "get" }),
      }),
      getCategory: build.query({
        query: () => ({ url: "/category", method: "get" }),
      }),
      uploadImage: build.mutation({
        query: (data) => ({
          url: "/upload",
          method: "post",
          data,
          headers: { "Content-Type": "multipart/form-data" },
        }),
      }),
      loginUser: build.mutation({
        query: (data) => ({
          url: `/auth/login`,
          method: "POST",
          data,
        }),
      }),
      postHouse: build.mutation({
        query: (data) => ({
          url: `/house`,
          method: "POST",
          data,
        }),
      }),
    };
  },
});

// Export hooks for usage in functional components
export const {
  useGetMeQuery,
  useGetCategoryQuery,
  useLoginUserMutation,
  usePostHouseMutation,
  useUploadImageMutation,
  util: { getRunningQueriesThunk },
} = userQuery;

export const { getMe, getCategory, loginUser, postHouse, uploadImage } =
  userQuery.endpoints;
