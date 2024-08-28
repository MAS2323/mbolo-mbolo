import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import debounce from "lodash.debounce";
import { API_BASE_URL } from "../../Components/services/config";

const SubcategoriesScreen = ({ route, navigation }) => {
  const { subcategories, categoryName } = route.params;
  const [searchKey, setSearchKey] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const fetchSearchResults = useCallback(
    debounce(async (searchKey) => {
      if (searchKey.trim() === "") {
        setSearchResults([]);
        return;
      }

      try {
        const response = await axios.get(
          `${API_BASE_URL}/subcategories/search/${searchKey}`
        );
        setSearchResults(response.data);
      } catch (error) {
        console.error("Failed to get products", error);
      }
    }, 300),
    []
  );

  useEffect(() => {
    fetchSearchResults(searchKey);
  }, [searchKey, fetchSearchResults]);

  const renderItem = useCallback(
    ({ item }) => <SubcategoryItem item={item} navigation={navigation} />,
    [navigation]
  );

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Buscar..."
        lightTheme
        round
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.searchInputContainer}
        onChangeText={setSearchKey}
        value={searchKey}
      />
      <FlatList
        data={searchKey ? searchResults : subcategories}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
        ListHeaderComponent={() => (
          <Text style={styles.categoryName}>{categoryName}</Text>
        )}
      />
    </View>
  );
};

const SubcategoryItem = ({ item, navigation }) => (
  <TouchableOpacity
    style={styles.item}
    onPress={() => {
      navigation.navigate("SubCategoryDetails", { subcategory: item });
    }}>
    <Image source={{ uri: item.image }} style={styles.image} />
    <View style={styles.textContainer}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
    <Ionicons name="chevron-forward" size={30} color="black" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchContainer: {
    backgroundColor: "transparent",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  searchInputContainer: {
    backgroundColor: "#DDF0FF",
    borderRadius: 20,
  },
  categoryName: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 16,
    marginHorizontal: 16,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
});

export default SubcategoriesScreen;
