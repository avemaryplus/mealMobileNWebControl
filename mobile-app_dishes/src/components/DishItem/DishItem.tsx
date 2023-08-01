import React from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import { IDish } from "../../interfaces/IDish";

type Props = {
  dish: IDish;
  addToCart: (id: string) => void;
};
const DishItem = ({ dish, addToCart }: Props) => {
  return (
    <TouchableOpacity onPress={() => addToCart(dish.id)}>
      <View style={styles.container}>
        <Image source={{ uri: dish.image }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>{dish.name}</Text>
          <Text style={styles.text}>Price: {dish.price} тг</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    padding: 5,
    flexDirection: "row",
    backgroundColor: "#efcfcf",
    maxWidth: "100%",
		borderRadius:10,
  },
  image: {
    width: 100,
    height: 100,
		borderRadius:10,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
		padding:5,
  },
  textContainer: {
    flex: 1,
    margin: 5,
    maxWidth: "80%",
  },
});

export default DishItem;
