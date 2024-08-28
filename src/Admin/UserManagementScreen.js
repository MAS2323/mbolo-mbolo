import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../Components/services/config";
import { MaterialIcons } from "@expo/vector-icons";
import { Avatar } from "react-native-paper";

const UserManagementScreen = () => {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const getUserId = async () => {
      try {
        const id = await AsyncStorage.getItem("id");
        if (id) {
          setUserId(id.replace(/\"/g, ""));
        }
      } catch (error) {
        console.error("Error retrieving userId from AsyncStorage:", error);
      }
    };

    getUserId();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/users`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (id) => {
    if (id === userId) {
      Alert.alert("You cannot delete yourself");
      return;
    }

    try {
      await axios.delete(`${API_BASE_URL}/user/${id}`);
      setUsers(users.filter((user) => user._id !== id));
      Alert.alert("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      Alert.alert("Error deleting user");
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <Avatar.Image
              size={80}
              style={styles.avatar}
              source={
                item.image
                  ? { uri: item.image }
                  : require("../../assets/Avatar22.webp")
              }
            />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{item.userName}</Text>
              <Text style={styles.userDetails}>Contact: {item.contact}</Text>
              <Text style={styles.userDetails}>Location: {item.location}</Text>
              <Text style={styles.userDetails}>Mobile: {item.mobile}</Text>
              <Text style={styles.userDetails}>Email: {item.email}</Text>
              <Text style={styles.userDetails}>
                Tipo de Usuario: {item.userType} 
              </Text>
            </View>
            {item._id !== userId && (
              <TouchableOpacity onPress={() => handleDeleteUser(item._id)}>
                <MaterialIcons name="delete" size={24} color="red" />
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  userContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  avatar: {
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
    marginLeft: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userDetails: {
    fontSize: 14,
    color: "#555",
  },
});

export default UserManagementScreen;
