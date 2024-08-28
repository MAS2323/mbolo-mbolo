import { Text, View, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants/theme";
import { useNavigation } from "@react-navigation/native";
import ProductList from "../productos/ProductList";
import styles from "./NewRivals.style";

const NewRivals = ({ navigation }) => {
  const navigator = useNavigation();

  const renderItem = () => <ProductList />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.upperRow}>
          <TouchableOpacity onPress={() => navigator.goBack()}>
            <Ionicons
              name="chevron-back-circle"
              size={30}
              color={COLORS.lightwhite}
            />
          </TouchableOpacity>
          <Text style={styles.heading}>Productos</Text>
        </View>
        <FlatList
          data={[{ key: "ProductList" }]} // Data para renderizar un solo componente
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          contentContainerStyle={styles.scrollContainer}
        />
      </View>
    </SafeAreaView>
  );
};

export default NewRivals;
