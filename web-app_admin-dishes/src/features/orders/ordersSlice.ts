import { createSlice } from "@reduxjs/toolkit";
import { deleteOrder, fetchOrders } from "../../API/orders/ordersAPI";
import { IOrder } from "../../interfaces/IOrder";


interface OrdersState {
  orders: IOrder[];
  deliveryPrice: number;
  ordersLoading: boolean;
  error: string | undefined;
}
const initialState: OrdersState = {
  deliveryPrice: 1000,
  orders: [],
  ordersLoading: false,
  error: undefined,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.ordersLoading = true;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.ordersLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.ordersLoading = false;
      })

      .addCase(deleteOrder.pending, (state) => {
        state.ordersLoading = true;
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.ordersLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter(
          (order) => order.id !== action.payload
        );
        state.ordersLoading = false;
      });
  },
});

export const ordersReducer = orderSlice.reducer;
