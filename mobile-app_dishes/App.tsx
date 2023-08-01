import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import store from "./src/app/store/store";
import DishesPage from "./src/containers/Dishes/DishesPage";

export default function App() {
  return (
    <Provider store={store}>
      <DishesPage />
    </Provider>
  );
}
