import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { searchBusApi } from "./apis";

export const store = configureStore({
  reducer: {
    //slices
    // searchBusDirections: authReducer,

    //apis rtk query
    [searchBusApi.reducerPath]: searchBusApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(searchBusApi.middleware),
});

setupListeners(store.dispatch);
