import { createSlice } from "@reduxjs/toolkit";
import { IDish } from "../../interfaces/IDish";
import {
  addDish,
  deleteDish,
  fetchDishes,
  updateDish,
} from "../../API/dishes/dishesAPI";

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

      .addCase(deleteDish.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDish.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteDish.fulfilled, (state, action) => {
        state.dishes = state.dishes.filter(
          (dish) => dish.id !== action.payload
        );
        state.loading = false;
      })

      .addCase(updateDish.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateDish.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateDish.fulfilled, (state, action) => {
				state.dishes = state.dishes.map((dish) =>
				dish.id === action.payload.id
					? { ...action.payload.dish, id:action.payload.id}
					: dish
			);
			state.loading = false;
      })

      .addCase(addDish.pending, (state) => {
        state.loading = true;
      })
      .addCase(addDish.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addDish.fulfilled, (state, action) => {
        state.dishes = [
          ...state.dishes,
          { ...action.payload, id: Date.now().toString() },
        ];
        state.loading = false;
      });
  },
});

export const dishesReducer = dishesSlice.reducer;
