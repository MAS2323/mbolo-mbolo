import React from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import useFetch from "../../Hook/useFech"; // Suponiendo que es el hook correcto
import { COLORS, SIZES } from "../constants/theme";
import styles from "./ProductList.style";
import ProductCardView from "./ProductCardView";
import { API_BASE_URL } from "../services/config";
const ProductList = ({ userId }) => {
  const { data, isLoading, error } = useFetch(`${API_BASE_URL}/products`);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        numColumns={2}
        renderItem={({ item }) => (
          <ProductCardView item={item} userId={userId} />
        )}
        contentContainerStyle={styles.container}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

export default ProductList;
