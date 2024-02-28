import { Action, PayloadAction } from "@reduxjs/toolkit";
import { createApi } from "@reduxjs/toolkit/query/react";
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
  refetchOnReconnect: true,
  tagTypes: [],
  endpoints(build) {
    return {
      userFavorite: build.query({
        query: (params) => ({
          url: `/favourite/user`,
          method: "get",
          params,
        }),
      }),
      getMe: build.query({
        query: () => ({ url: "/users/me", method: "get" }),
      }),
      getCategory: build.query({
        query: () => ({ url: "/category", method: "get" }),
      }),
      search: build.query({
        query: (params) => {
          return { url: "/common/search", method: "get", params };
        },
      }),
      newHouse: build.query({
        query: (params) => ({ url: "/house", method: "get", params }),
      }),
      houseUser: build.query({
        query: (params) => ({ url: "/house/user", method: "get", params }),
      }),
      favorite: build.query({
        query: () => ({ url: "/common/top-favourite", method: "get" }),
      }),
      favoriteById: build.query({
        query: (params) => ({ url: `/common/check-like`, method: "get", params }),
      }),
      randomUser: build.query({
        query: () => ({ url: "/common/random-user", method: "get" }),
      }),
      randomHouse: build.query({
        query: (params) => ({
          url: "/common/random-house",
          method: "get",
          params,
        }),
      }),
      detailHouse: build.query({
        query: (id) => ({ url: `/house/${id}`, method: "get" }),
      }),
      uploadImage: build.mutation({
        query: (data) => ({
          url: "/upload",
          method: "post",
          data,
          headers: { "Content-Type": "multipart/form-data" },
        }),
      }),
      registerUser: build.mutation({
        query: (data) => ({
          url: `/auth/register`,
          method: "post",
          data,
        }),
      }),
      loginUser: build.mutation({
        query: (data) => ({
          url: `/auth/login`,
          method: "post",
          data,
        }),
      }),
      postHouse: build.mutation({
        query: (data) => ({
          url: `/house`,
          method: "post",
          data,
        }),
      }),
      updateHouse: build.mutation({
        query: ({ id, data }) => ({
          url: `/house/${id}`,
          method: "patch",
          data,
        }),
      }),
      deleteHouse: build.mutation({
        query: ({id}) => ({
          url: `/house/${id}`,
          method: "delete",
        }),
      }),
      updateMe: build.mutation({
        query: (data) => ({
          url: `/users/me`,
          method: "put",
          data,
        }),
      }),
      addFavorite: build.mutation({
        query: (data) => ({
          url: `/favourite`,
          method: "post",
          data,
        }),
      }),
      deleteFavorite: build.mutation({
        query: ({id, data}) => ({
          url: `/favourite/${id}`,
          method: "delete",
          data
        }),
      }),
    };
  },
});

// Export hooks for usage in functional components
export const {
  useGetMeQuery,
  useUserFavoriteQuery,
  useGetCategoryQuery,
  useFavoriteQuery,
  useRandomUserQuery,
  useRandomHouseQuery,
  useDetailHouseQuery,
  useHouseUserQuery,
  useNewHouseQuery,
  useFavoriteByIdQuery,
  useSearchQuery,
  useLoginUserMutation,
  usePostHouseMutation,
  useUploadImageMutation,
  useUpdateHouseMutation,
  useDeleteHouseMutation,
  useUpdateMeMutation,
  useRegisterUserMutation,
  useAddFavoriteMutation,
  useDeleteFavoriteMutation,
  util: { getRunningQueriesThunk },
} = userQuery;

export const {
  getMe,
  getCategory,
  loginUser,
  postHouse,
  uploadImage,
  favorite,
  randomUser,
  randomHouse,
  detailHouse,
  houseUser,
  updateHouse,
  deleteHouse,
  updateMe,
  newHouse,
  search,
  registerUser,
  addFavorite,
  userFavorite,
  favoriteById,
  deleteFavorite,
} = userQuery.endpoints;
