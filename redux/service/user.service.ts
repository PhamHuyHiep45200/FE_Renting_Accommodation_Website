import { Action, PayloadAction } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import { axiosBaseQuery } from "./axiosBase.service";

type RootState = any;

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
  return action.type === HYDRATE;
}

export const categoryQuery = createApi({
  baseQuery: axiosBaseQuery({ baseUrl: "http://localhost:8080/api/" }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: [],
  endpoints(build) {
    return {
      getCategoryAll: build.query({ query: () => ({ url: 'category/all', method: 'get' }) }),
      // mutation: build.mutation({
      //   query: () => ({ url: '/mutation', method: 'post' }),
      // }),
    }
  },
});

// Export hooks for usage in functional components
export const {
  useGetCategoryAllQuery,
  util: { getRunningQueriesThunk },
} = categoryQuery;

export const { getCategoryAll } = categoryQuery.endpoints;
