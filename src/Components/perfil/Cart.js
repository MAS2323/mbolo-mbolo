import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  RefreshControl,
} from "react-native";
import axios from "axios";
import { getCachedData, setCachedData } from "./cache";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { API_BASE_URL } from "../services/config";
const CartScreen = () => {
  const [userId, setUserId] = useState(null);
  const [cart, setCart] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const fetchUserId = useCallback(async () => {
    try {
      const id = await AsyncStorage.getItem("id");
      setUserId(id ? id.replace(/\"/g, "") : null);
    } catch (error) {
      console.error("Error retrieving userId:", error);
      setUserId(null);
    }
  }, []);

  const fetchCart = useCallback(async () => {
    try {
      if (!userId) return;

      const response = await axios.get(`${API_BASE_URL}/cart/find/${userId}`);

      if (response.status === 200) {
        const cartData = response.data;
        setCart(cartData);
        setCachedData(`cart_${userId}`, cartData); // Actualiza la cache
      } else {
        console.error("Failed to fetch cart, status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      if (error.response) {
        console.error("Server response:", error.response.data);
      }
    }
  }, [userId]);

  const handleRemoveItem = async (cartItemId) => {
    try {
      console.log("Deleting item from cart:", userId, cartItemId);
      await axios.delete(`${API_BASE_URL}/cart/${userId}/${cartItemId}`);

      // Actualiza el estado local y el caché después de la eliminación
      const updatedCartProducts = cart.products.filter(
        (item) => item._id !== cartItemId
      );
      const updatedCart = { ...cart, products: updatedCartProducts };

      setCart(updatedCart);
      setCachedData(`cart_${userId}`, updatedCart);

      // Muestra un mensaje de éxito al usuario
      Alert.alert("Item removed", "The item has been removed from the cart.");
    } catch (error) {
      console.error("Error removing item from cart:", error);
      // Maneja el error según sea necesario
    }
  };

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchCart();
    setRefreshing(false);
  }, [fetchCart]);

  useEffect(() => {
    fetchUserId();
  }, [fetchUserId]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);   

  if (!cart) {
    return <Text>Cargando...</Text>;
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }>
      {cart.products && cart.products.length === 0 ? (
        <Text style={styles.emptyCartText}>
          Aún no has agregado nada al carrito
        </Text>
      ) : (
        cart.products.map((product) => (
          <View key={product._id} style={styles.card}>
            <Image source={{ uri: product.imageUrl }} style={styles.image} />
            <View style={styles.infoContainer}>
              <Text style={styles.title}>{product.title}</Text>
              <Text style={styles.supplier}>Supplier: {product.supplier}</Text>
              <Text style={styles.price}>${product.price}</Text>
              <TouchableOpacity onPress={() => handleRemoveItem(product._id)}>
                <MaterialIcons name="delete" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("ProductList")}>
        <Text style={styles.text}>Añadir al carrito</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  supplier: {
    fontSize: 14,
    color: "#666",
  },
  price: {
    fontSize: 16,
    color: "#FF6347",
  },
  quantity: {
    fontSize: 14,
    color: "#666",
  },
  button: {
    backgroundColor: "#4c86A8",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyCartText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "#666",
  },
});
