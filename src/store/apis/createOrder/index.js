import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const createOrderApi = createApi({
  reducerPath: "createOrderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.API_URL}`,
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  tagTypes: ["orders"],
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (body) => ({
        url: "orders",
        method: "POST",
        body,
      }),
      invalidatesTags: ["orders"],
    }),
  }),
});

export const { useCreateOrderMutation } = createOrderApi;
