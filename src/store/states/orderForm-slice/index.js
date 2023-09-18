import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  seachFormValues: {},
  isLoading:false
};

const orderFormSlice = createSlice({
  name: "OrderFormReducer",
  initialState,
  reducers: {
    setSeachFormValues: (state, action) => {
      state.seachFormValues = action.payload;
    },
    setIsLoading: (state, action) => {
        state.isLoading = action.payload
    }
  },
});

export const { setSeachFormValues, setIsLoading } = orderFormSlice.actions;

export const orderFormReducer = orderFormSlice.reducer;
