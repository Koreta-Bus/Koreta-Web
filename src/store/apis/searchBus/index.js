import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const searchBusApi = createApi({
  reducerPath: "searchBusApis",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.API_URL}`,
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");
      headers.set("Content-Type", 'application/json')
      return headers;
    },
  }),
  tagTypes: ["search", "getAllCities"],
  endpoints: (builder) => ({
    getSearchBusDirections: builder.query({
      query: ({ from_city_id, to_city_id, departure_date, free_seats }) =>
        `/search?from_city_id=${from_city_id}&to_city_id=${to_city_id}&departure_date=${departure_date}&free_seats=${free_seats}`,
      providesTags: ["search"],
    }),
    getAllCities: builder.query({
      query: (keyword) => `cities?search=${decodeURIComponent(keyword)}`,
      providesTags: ["getAllCities"],
    }),
  }),
});

export const { useLazyGetSearchBusDirectionsQuery, useLazyGetAllCitiesQuery } = searchBusApi;
