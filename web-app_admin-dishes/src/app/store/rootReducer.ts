import { combineReducers } from "redux";
import { dishesReducer } from "../../features/dishes/dishesSlice";
import { ordersReducer } from "../../features/orders/ordersSlice";

const rootReducer = combineReducers({
  dishes: dishesReducer,
  orders: ordersReducer,
});

export default rootReducer;
