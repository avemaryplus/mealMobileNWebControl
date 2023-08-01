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

export const addDish = createAsyncThunk(
  "post/dish",
  async (newDish: Omit<IDish, "id">) => {
    await axiosUrl.post("dishes.json", newDish);
		return newDish;
  }
);

export const updateDish = createAsyncThunk(
  "put/dish",
  async (dish:IDish) => {
		const updatedDish = {
			name: dish.name,
			price: dish.price,
			image: dish.image
		}
    await axiosUrl.put(`dishes/${dish.id}.json`, updatedDish);
    return {dish,id:dish.id};
  }
);

export const deleteDish = createAsyncThunk(
  "delete/dish",
  async (dishId: string) => {
    await axiosUrl.delete(`dishes/${dishId}.json`);
    return dishId;
  }
);
