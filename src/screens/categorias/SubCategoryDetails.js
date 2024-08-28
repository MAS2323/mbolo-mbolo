import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const SubCategoryDetails = () => {
  const route = useRoute();
  const { subcategory, subcategories } = route.params;
  const navigation = useNavigation();

  const handleCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleWhatsApp = (phoneNumber) => {
    Linking.openURL(`https://wa.me/${phoneNumber}`);
  };

  const renderHeader = () => (
    <View>
      <View style={styles.upperRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <Image source={{ uri: subcategory.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{subcategory.name}</Text>
        <Text style={styles.description}>{subcategory.description}</Text>
        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={24} color="black" />
          <Text style={styles.infoText}>{subcategory.location}</Text>
        </View>
        <TouchableOpacity
          style={styles.infoRow}
          onPress={() => handleCall(subcategory.phoneNumber)}>
          <Ionicons name="call-outline" size={24} color="black" />
          <Text style={styles.infoText}>{subcategory.phoneNumber}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.infoRow}
          onPress={() => handleWhatsApp(subcategory.whatsapp)}>
          <Ionicons name="logo-whatsapp" size={24} color="black" />
          <Text style={styles.infoText}>{subcategory.whatsapp}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        navigation.navigate("SubCategoryDetails", {
          subcategory: item,
          subcategories: subcategories,
        });
      }}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="black" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={subcategories}
        ListHeaderComponent={renderHeader}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  upperRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  details: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 8,
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
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
});

export default SubCategoryDetails;
