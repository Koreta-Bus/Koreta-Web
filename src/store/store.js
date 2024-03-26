import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/dist/query";

import { orderFormReducer } from "./states";

import { createCityApi, createOrderApi, customerApi, searchBusApi } from "./apis";

export const store = configureStore({
  reducer: {
    //slices
    searchBusDirections: orderFormReducer,

    //apis rtk query
    [customerApi.reducerPath]: customerApi.reducer,
    [searchBusApi.reducerPath]: searchBusApi.reducer,
    [createCityApi.reducerPath]: createCityApi.reducer,
    [createOrderApi.reducerPath]: createOrderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(customerApi.middleware)
      .concat(searchBusApi.middleware)
      .concat(createCityApi.middleware)
      .concat(createOrderApi.middleware)
});

setupListeners(store.dispatch);
