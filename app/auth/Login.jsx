import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Fondo } from "../../components/Fondo";
import { Stack } from "expo-router";

const Login = () => {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.fondo}>
        <Fondo />
      </View>

      <Text>MBOLO</Text>

      <View>
        <Text>Mobile or Email</Text>
      </View>

      <View>
        <Text>Password</Text>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fondo: {
    marginTop: 0,
    zIndex: 1,
  },
});
