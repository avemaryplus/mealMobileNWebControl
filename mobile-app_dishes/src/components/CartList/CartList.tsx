import { FlatList,StyleSheet } from "react-native";
import ICartItem from "../../interfaces/ICartItem";
import CartItem from "../CartItem/CartItem";


type Props = {
  items: ICartItem[];
  removeClick: (id: string) => void;
};

const CartList = ({ items, removeClick }: Props) => {
  return (
    <FlatList
		contentContainerStyle={styles.listContent}
      style={styles.list}
      data={items}
      renderItem={({ item }) => (
        <CartItem item={item} deleteClick={() => removeClick(item.id)} />
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  list: {
		margin:10,
  },
	listContent:{
		gap:10,
	}
});

export default CartList;
