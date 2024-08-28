import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import styles from "./ProductCardView.style";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/theme";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../services/config";
const ProductCardView = ({ item }) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(null); // Estado para almacenar el userId

  useEffect(() => {
    const getUserId = async () => {
      try {
        const id = await AsyncStorage.getItem("id");
        setUserId(id ? id.replace(/\"/g, "") : null);
      } catch (error) {
        console.error("Error retrieving userId:", error);
        setUserId(null); // Manejo de error, establece userId como null o maneja el error según sea necesario
      }
    };

    getUserId(); // Llama a la función para obtener el userId al montar el componente
  }, []); // [] asegura que useEffect solo se ejecute una vez al montar

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/cart/add/${userId}/${item._id}`
      );

      if (response.status === 200) {
        Alert.alert("Success", "Product added to cart");
      } else {
        Alert.alert("Error", "Failed to add product to cart");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      if (error.response) {
        console.error("Server response:", error.response.data);
      }
      Alert.alert("Error", "There was an error adding the product to the cart");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ProductDetails", { item })}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
        </View>
        <View style={styles.details}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.supplier} numberOfLines={1}>
            {item.supplier}
          </Text>
          <Text style={styles.price}>XAF{item.price}</Text>
        </View>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={handleAddToCart}
          disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator size="small" color={COLORS.primary} />
          ) : (
            <Ionicons name="add-circle" size={35} color={COLORS.primary} />
          )}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCardView;
