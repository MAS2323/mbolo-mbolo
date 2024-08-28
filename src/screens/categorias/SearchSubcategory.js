import { Image, View, TouchableOpacity, Text, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const SearchSubcategory = ({ item }) => {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.navigate("SubCategoryDetails", { item })}>
        <View style={styles.image}>
          <Image
            source={{ uri: item.imageUrl }}
            style={styles.subcategoryImg}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.subcategoryTitle}>{item.title}</Text>
          <Text style={styles.supplier}>{item.supplier}</Text>
          <Text style={styles.price}>XAF{item.price}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SearchSubcategory;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    flex: 1,
  },
  subcategoryImg: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  textContainer: {
    flex: 2,
    paddingLeft: 10,
    justifyContent: "center",
  },
  subcategoryTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  supplier: {
    fontSize: 14,
    color: "#888",
  },
  price: {
    fontSize: 14,
    color: "#333",
  },
});
