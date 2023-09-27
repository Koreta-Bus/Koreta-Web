import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  seachFormValues: {},
  isLoading: false,
  from: "",
  to: "",
};

const orderFormSlice = createSlice({
  name: "OrderFormReducer",
  initialState,
  reducers: {
    setSeachFormValues: (state, action) => {
      state.seachFormValues = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setOrderFormValue: (state, action) => {
      const { name, cityId, cityName } = action.payload;
      state[name] = { cityName, cityId };
    },
    exchangeValues: (state, action) => {
      const a = state.to;
      state.to = state.from
      state.from = a
    },
  },
});

export const { setSeachFormValues, setIsLoading, setOrderFormValue, exchangeValues } = orderFormSlice.actions;

export const orderFormReducer = orderFormSlice.reducer;
