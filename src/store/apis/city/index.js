import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const createCityApi = createApi({
  reducerPath: "createCityApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.API_URL}`,
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  tagTypes: ["cityCreate", "departures"],
  endpoints: (builder) => ({
    createCity: builder.mutation({
      query: (body) => ({
        url: "departure",
        method: "POST",
        body,
      }),
      invalidatesTags: ["cityCreate"],
    }),
    createdCities: builder.query({
      query: () => `departures`,
      providesTags: ["departures"],
    }),
  }),
});

export const { useCreateCityMutation, useLazyCreatedCitiesQuery } = createCityApi;
