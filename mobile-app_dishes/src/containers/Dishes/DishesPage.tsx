import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import DishesList from "../../components/DishesList/DishesList";
import { useAppDispatch, useAppSelector } from "../../app/hooks/hooks";
import { RootState } from "../../app/store/store";
import { fetchDishes } from "../../API/dishes/dishesAPI";
import ICartItem from "../../interfaces/ICartItem";
import { addToCart } from "../../features/cart/cartSlice";
import Cart from "../Cart/Cart";

const DishesPage = () => {
  const { dishes } = useAppSelector((state: RootState) => state.dishes);
  const { totalPrice, items } = useAppSelector(
    (state: RootState) => state.cart
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dispatch = useAppDispatch();

  const addToCartHandler = (id: string) => {
    const dishToAdd = dishes.find((dish) => dish.id === id);
    if (dishToAdd) {
      const cartItem: ICartItem = { ...dishToAdd, quantity: 1 };
      dispatch(addToCart(cartItem));
    }
  };

  useEffect(() => {
    void dispatch(fetchDishes());
  }, [dispatch]);

  return (
    <ScrollView>
      <Text style={styles.title}>Dishes:</Text>
      <DishesList items={dishes} addToCart={addToCartHandler} />
      <View style={styles.footer}>
        <Text style={styles.text}>Итого: {totalPrice} тг</Text>
        <TouchableOpacity
          disabled={items.length <= 0}
          style={[
						styles.button,
						items.length <= 0 ? styles.disabledButton : null,
					]}
          onPress={() => setIsModalVisible(true)}
        >
          <Text style={styles.text}>Checkout</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={isModalVisible} animationType="slide">
        <Cart cancelClick={() => setIsModalVisible(false)} />
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "gray",
    marginBottom: 50,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 5,
  },
  button: {
    backgroundColor: "#3a9a14",
    padding: 5,
    borderRadius: 5,
  },
  disabledButton: {
    opacity: 0.5,
  },
  title: {
    marginTop: 50,
    margin: 10,
    fontSize: 24,
    fontWeight: "bold",
    padding: 5,
  },
});

export default DishesPage;
