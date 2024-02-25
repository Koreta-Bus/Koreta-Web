import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  to: "",
  from: "",
  formPay: {},
  orderValues: {},
  isLoading: false,
  seachFormValues: {},
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
      state.to = state.from;
      state.from = a;
    },
    storeOrderValues: (state, action) => {
      state.orderValues = action.payload;
    },
    setFormPay: (state, action) => {
      state.formPay = action.payload;
    },
  },
});

export const {
  setFormPay,
  setIsLoading,
  exchangeValues,
  storeOrderValues,
  setOrderFormValue,
  setSeachFormValues,
} = orderFormSlice.actions;

export const orderFormReducer = orderFormSlice.reducer;
