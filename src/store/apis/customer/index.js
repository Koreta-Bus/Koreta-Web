import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const customerApi = createApi({
  reducerPath: "customerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.API_URL}`,
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["allOrders"],
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => `orders`,
      providesTags: ["allOrders"],
    }),
  }),
});

export const { useGetAllOrdersQuery } = customerApi;
