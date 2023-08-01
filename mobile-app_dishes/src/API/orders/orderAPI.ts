import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosUrl from "../axiosUrl";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import IOrder from "../../interfaces/IOrder";

export const createOrder = createAsyncThunk(
  "post/orders",
  async (payload: IOrder) => {
    await axiosUrl.post<AxiosRequestConfig, AxiosResponse, IOrder>(
      "orders.json",
      payload
    );
  }
);