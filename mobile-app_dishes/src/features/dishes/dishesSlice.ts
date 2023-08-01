import { createSlice } from "@reduxjs/toolkit";
import { IDish } from "../../interfaces/IDish";
import { fetchDishes } from "../../API/dishes/dishesAPI";


interface DishesState {
  dishes: IDish[];
  loading: boolean;
  error: string | undefined;
}
const initialState: DishesState = {
  dishes: [],
  loading: false,
  error: undefined,
};

const dishesSlice = createSlice({
  name: "dishes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDishes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDishes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchDishes.fulfilled, (state, action) => {
        state.dishes = action.payload;
        state.loading = false;
      })

  },
});

export const dishesReducer = dishesSlice.reducer;
