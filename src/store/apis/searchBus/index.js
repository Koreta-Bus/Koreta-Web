import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const searchBusApi = createApi({
  reducerPath: 'searchBusApis',
  baseQuery: fetchBaseQuery({
    // baseUrl: `${import.meta.env.VITE_BASE_URL}/api/auth`,
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['searchBus'],
  endpoints: (builder) => ({
    searchBus: builder.mutation({
      query: (body) => ({
        url: '/searchBus',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['searchBus'],
    }),
  }),
});

export const { useSearchBusMutation } = searchBusApi;
