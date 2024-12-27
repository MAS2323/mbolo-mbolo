import { Text, View, StyleSheet } from "react-native";
import { API_BASE_URL } from "../src/Components/services/config";
import { Fondo } from "./Fondo";

export function Main() {
  return (
    <View style={styles.container}>
      <Fondo />
      <Text style={{ fontFamily: "outfit" }}>Hola desde el Main</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
