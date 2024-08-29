import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../Components/constants";
import TendenciasScreen from "../../Components/Home/TendenciasScreen";
import { ScrollView } from "react-native-gesture-handler";

const DetallesScreen = ({ route }) => {
  const { item } = route.params;

  const handleCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleWhatsApp = (phoneNumber) => {
    Linking.openURL(`https://wa.me/${phoneNumber}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />
        </View>
        <View style={styles.details}>
          <Text style={styles.title} numberOfLines={4}>
            {item.name}
          </Text>
          <Text style={styles.supplier} numberOfLines={4}>
            {item.description}
          </Text>
          <View style={styles.infoRow}>
            <Ionicons
              name="location-outline"
              size={24}
              color={COLORS.primary}
            />
            <Text style={styles.infoText}>{item.location}</Text>
          </View>
          <Text style={styles.contactsTitle}>Contactos</Text>
          <View style={styles.contactRow}>
            <TouchableOpacity
              style={styles.contactItem}
              onPress={() => handleCall(item.phoneNumber)}>
              <Ionicons name="call-outline" size={24} color={COLORS.primary} />
              <Text style={styles.contactText}>{item.phoneNumber}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.contactItem}
              onPress={() => handleWhatsApp(item.whatsapp)}>
              <Ionicons name="logo-whatsapp" size={24} color={COLORS.primary} />
              <Text style={styles.contactText}>{item.whatsapp}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TendenciasScreen />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.small,
    marginBottom: SIZES.medium,
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    height: 200,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  details: {
    padding: SIZES.small,
  },
  title: {
    fontSize: SIZES.large,
    marginBottom: SIZES.small,
    fontWeight: "bold",
  },
  supplier: {
    fontSize: SIZES.small,
    color: COLORS.gray,
    marginBottom: SIZES.small,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SIZES.small,
  },
  infoText: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
    marginLeft: SIZES.small,
  },
  contactsTitle: {
    fontSize: SIZES.medium,
    fontWeight: "bold",
    marginVertical: SIZES.small,
  },
  contactRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SIZES.small,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  //  scrollContainer: {
  //   padding: SIZES.small,
  //   paddingTop: 0,
  // },
  contactText: {
    fontSize: SIZES.medium,
    color: COLORS.primary,
    marginLeft: SIZES.small,
  },
});

export default DetallesScreen;
