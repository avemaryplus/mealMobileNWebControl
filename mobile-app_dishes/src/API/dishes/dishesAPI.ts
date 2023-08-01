import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosUrl from "../axiosUrl";
import { IFirebaseData } from "../../interfaces/IFirebaseData";
import { IDish } from "../../interfaces/IDish";

export const fetchDishes = createAsyncThunk("fetch/dishes", async () => {
  const { data } = await axiosUrl.get<IFirebaseData<IDish>>("dishes.json");
  const dishes: IDish[] = Object.keys(data).map((key) => ({
    ...data[key],
    id: key,
  }));

  return dishes; 
	
});

