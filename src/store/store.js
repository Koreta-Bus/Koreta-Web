import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { createCityApi, createOrderApi, customerApi, searchBusApi } from "./apis";
import { orderFormReducer } from "./states";

export const store = configureStore({
  reducer: {
    //slices
    searchBusDirections: orderFormReducer,

    //apis rtk query
    [searchBusApi.reducerPath]: searchBusApi.reducer,
    [createOrderApi.reducerPath]: createOrderApi.reducer,
    [createCityApi.reducerPath]: createCityApi.reducer,
    [customerApi.reducerPath]: customerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(searchBusApi.middleware)
      .concat(createOrderApi.middleware)
      .concat(createCityApi.middleware)
      .concat(customerApi.middleware),
});

setupListeners(store.dispatch);
