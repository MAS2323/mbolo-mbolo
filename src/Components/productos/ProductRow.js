import React from "react";
import { FlatList, View, Text, ActivityIndicator } from "react-native";
import { COLORS, SIZES } from "../constants/theme";
import ProductCardView from "./ProductCardView";
import styles from "./ProductRow.style";
import useFech from "../../Hook/useFech";
import { API_BASE_URL } from "../services/config";

const ProductRow = () => {
  const { data, isLoading, error } = useFech(`${API_BASE_URL}/products`);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary} />
      ) : error ? (
        <Text>Hay algo que molesta</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <ProductCardView item={item} />}
          horizontal
          windowSize={5}
          contentContainerStyle={{ columnGap: SIZES.medium }}
        />
      )}
    </View>
  );
};

export default ProductRow;
