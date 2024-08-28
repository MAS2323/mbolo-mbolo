import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const AdminScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <Button
        title="Manage Users"
        onPress={() => navigation.navigate("UserManagement")}
      />
      <Button
        title="Manage Subcategory"
        onPress={() => navigation.navigate("AddSubcategoryScreen")}
      />
      <Button
        title="
      BannerScreen"
        onPress={() => navigation.navigate("BannerScreen")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default AdminScreen;
