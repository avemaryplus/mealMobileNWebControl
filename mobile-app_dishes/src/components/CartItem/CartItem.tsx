import { View, Text, TouchableOpacity } from "react-native";
import ICartItem from "../../interfaces/ICartItem";


type Props = {
  item: ICartItem;
  deleteClick: () => void;
};

const CartItem = ({ item, deleteClick }: Props) => {
  return (
    <View>
      <Text>
        {item.name} x {item.quantity}
      </Text>
			<Text>
        {item.itemTotalPrice} тг
      </Text>

      <TouchableOpacity onPress={deleteClick}>
        <Text style={{ color: "red" }}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartItem;
