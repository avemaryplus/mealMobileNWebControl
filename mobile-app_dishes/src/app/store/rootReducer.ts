import { combineReducers } from "redux";
import { dishesReducer } from "../../features/dishes/dishesSlice";
import { cartReducer } from "../../features/cart/cartSlice";
import { ordersReducer } from "../../features/orders/orders";

const rootReducer = combineReducers({
  dishes: dishesReducer,
  cart: cartReducer,
  order: ordersReducer,
});

export default rootReducer;
