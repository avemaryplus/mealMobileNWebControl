import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { IDish } from "../../interfaces/IDish";
import DishItem from "../DishItem/DishItem";

type Props = {
  items: IDish[];
  addToCart: (id: string) => void;
};

const DishesList = ({ items, addToCart }: Props) => {
  return (
    <FlatList
      style={styles.list}
      data={items}
      renderItem={({ item }) => (
        <DishItem dish={item} addToCart={() => addToCart(item.id)} />
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  list: {
		margin:10,
  },
	
});

export default DishesList;
