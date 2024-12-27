import { Pressable, StyleSheet, Text, View } from "react-native";
import { Link, Stack } from "expo-router";
import React from "react";
import { LocationIcon, ShopIcon } from "../../components/Icons";
import { Main } from "../../components/Main";

export default function Home() {
  function headerTitle() {}

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: {},
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerLeft: () => <LocationIcon />,
          headerRight: () => (
            <Link asChild href="/auth/Login">
              <Pressable>
                <ShopIcon />
              </Pressable>
            </Link>
          ),
          headerTitle: "Malabo",
          headerTitleStyle: { color: "black" },
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 50,
    height: 50,
  },
});
