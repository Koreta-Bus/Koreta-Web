import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { searchBusApi } from "./apis";
import { orderFormReducer } from "./states";

export const store = configureStore({
  reducer: {
    //slices
    searchBusDirections: orderFormReducer,

    //apis rtk query
    [searchBusApi.reducerPath]: searchBusApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(searchBusApi.middleware),
});

setupListeners(store.dispatch);
