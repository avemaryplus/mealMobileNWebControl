import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosUrl from "../axiosUrl";
import { IFirebaseData } from "../../interfaces/IFirebaseData";
import { IOrder } from "../../interfaces/IOrder";


export const fetchOrders = createAsyncThunk("fetch/orders", async () => {
  const { data } = await axiosUrl.get<IFirebaseData<{ [dishId: string]: number }>>("orders.json");
  const orders: IOrder[] = Object.keys(data).map((key) => ({
    id: key,
    items: {...data[key]},
		totalPrice:0, 
  }));
  return orders;
});

export const deleteOrder = createAsyncThunk(
  "delete/order",
  async (orderId: string) => {
    await axiosUrl.delete(`orders/${orderId}.json`);
    return orderId;
  }
);
