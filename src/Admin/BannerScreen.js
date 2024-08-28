import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const Banner = ({ imageUrl, title, description, onPress }) => {
  return (
    <TouchableOpacity style={styles.bannerContainer} onPress={onPress}>
      <Image source={{ uri: imageUrl }} style={styles.bannerImage} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  bannerImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
});

export default Banner;
