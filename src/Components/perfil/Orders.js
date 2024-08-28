import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import axios from "axios";
import { API_BASE_URL } from "../services/config";

const OrderScreen = ({ userId }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/orders/${userId}`);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [userId]);

  const handleOrderDetail = async (orderId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/orders/order/${orderId}`
      );
      Alert.alert("Order Details", JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  if (!orders.length) {
    return <Text>No orders yet.</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      {orders.map((order) => (
        <View key={order._id} style={styles.card}>
          <Text style={styles.orderId}>Order ID: {order._id}</Text>
          <Text style={styles.totalAmount}>Total: ${order.totalAmount}</Text>
          <Text style={styles.status}>Status: {order.status}</Text>
          <TouchableOpacity
            onPress={() => handleOrderDetail(order._id)}
            style={styles.detailButton}>
            <Text style={styles.detailButtonText}>View Details</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  orderId: {
    fontSize: 16,
    fontWeight: "bold",
  },
  totalAmount: {
    fontSize: 16,
    color: "#FF6347",
  },
  status: {
    fontSize: 14,
    color: "#666",
  },
  detailButton: {
    marginTop: 10,
    backgroundColor: "#FF6347",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  detailButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
