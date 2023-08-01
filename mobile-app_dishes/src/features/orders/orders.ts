import { createSlice } from "@reduxjs/toolkit";
import IOrder from "../../interfaces/IOrder";
import { createOrder } from "../../API/orders/orderAPI";

type State = {
  isLoading: boolean;
  error: string | undefined;
  isOrderCompleted: boolean;
};

const initialState: State = {
  isLoading: false,
  error: undefined,
  isOrderCompleted: false,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
				state.isOrderCompleted = false;
      })
      .addCase(createOrder.fulfilled, (state) => {
        state.isLoading = false;
				state.isOrderCompleted = true;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export const ordersReducer = orderSlice.reducer;