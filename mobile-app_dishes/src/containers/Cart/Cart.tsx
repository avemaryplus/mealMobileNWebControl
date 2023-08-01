import { useAppDispatch, useAppSelector } from "../../app/hooks/hooks";
import { RootState } from "../../app/store/store";
import { clearCart, removeFromCart } from "../../features/cart/cartSlice";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import CartList from "../../components/CartList/CartList";
import IOrder from "../../interfaces/IOrder";
import { createOrder } from "../../API/orders/orderAPI";

type Props = {
  cancelClick: () => void;
};

const Cart = ({ cancelClick }: Props) => {
  const { items, totalPrice, deliveryPrice } = useAppSelector(
    (state: RootState) => state.cart
  );
  const { error } = useAppSelector((state: RootState) => state.order);

  const dispatch = useAppDispatch();

  const removeHandler = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const checkout = async () => {
    const order: IOrder = {};
    items.forEach(({ id, quantity }) => {
      order[id] = quantity;
    });
    await dispatch(createOrder(order));
    if (!error) {
      cancelClick();
      dispatch(clearCart());
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Корзина:</Text>
      <CartList items={items} removeClick={removeHandler} />
      <Text style={styles.title}>Доставка: {deliveryPrice} тг</Text>
      <Text style={styles.title}>Итого: {totalPrice} тг</Text>
      <View style={styles.controls}>
        <TouchableOpacity
          onPress={checkout}
          style={[
						styles.orderBtn,
						items.length <= 0 ? styles.disabledButton : null,
					]}
          disabled={items.length <= 0}
        >
          <Text style={styles.textBtn}>Order</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={cancelClick} style={styles.closeBtn}>
          <Text style={styles.textBtn}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 50,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 5,
  },
  controls: {
    width: "100%",
    gap: 20,
    padding: 20,
  },
  closeBtn: {
    alignItems: "center",
    backgroundColor: "#c52c2c",
    padding: 10,
  },
  orderBtn: {
    alignItems: "center",
    backgroundColor: "#3abb43",
    padding: 10,
  },
  textBtn: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
	disabledButton: {
    opacity: 0.5,
  },
});

export default Cart;
