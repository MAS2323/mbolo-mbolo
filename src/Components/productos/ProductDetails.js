import {
  Text,
  View,
  Image,
  Linking,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import {
  Ionicons,
  SimpleLineIcons,
  MaterialCommunityIcons,
  Fontisto,
} from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "./ProductDetails.style";
import { COLORS } from "../constants/theme";

export default function ProductDetails() {
  const route = useRoute();
  const { item } = route.params;
  const [count, setCount] = useState(1);
  const navigation = useNavigation();

  // Incrementar y decrementar la cantidad de productos
  const handleIncrement = () => setCount((prevCount) => prevCount + 1);
  const handleDecrement = () =>
    setCount((prevCount) => (prevCount > 1 ? prevCount - 1 : prevCount));

  // Abrir WhatsApp
  const openWhatsApp = () => {
    const url = `whatsapp://send?phone=${item.whatsapp}`;
    Linking.openURL(url).catch(() => alert("No se puede abrir WhatsApp"));
  };
  const imageUri = item || "ruta/de/imagen/default.png";

  // Abrir el marcador telefónico
  const openPhoneDialer = () => {
    const url = `tel:${item.phoneNumber}`;
    Linking.openURL(url).catch(() =>
      alert("No se puede abrir el marcador telefónico")
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("CartScreen")}>
          <Fontisto name="shopping-bag" size={24} color={COLORS.black} />
        </TouchableOpacity>
      </View>

      {/* Muestra las imágenes del producto */}
      <FlatList
        data={item.images} // Asegúrate de que "images" sea un array válido
        renderItem={({ item }) =>
          item ? ( // Verifica que la imagen no sea nula
            <Image source={{ uri: imageUri }} style={styles.image} />
          ) : (
            <Text style={{ color: "red" }}>Imagen no disponible</Text> // Renderiza un mensaje en caso de error
          )
        }
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      <View style={styles.details}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
            {item.title}
          </Text>
          <View style={styles.priceWrapper}>
            <Text style={styles.price}>XAF{item.price}</Text>
          </View>
        </View>

        <View style={styles.ratingRow}>
          <View style={styles.rating}>
            {[1, 2, 3, 4, 5].map((index) => (
              <Ionicons key={index} name="star" size={24} color="gold" />
            ))}
            <Text style={styles.ratingText}>(4.9)</Text>
          </View>
          <View style={styles.quantityControl}>
            <TouchableOpacity onPress={handleIncrement}>
              <SimpleLineIcons name="plus" size={20} color="black" />
            </TouchableOpacity>
            <Text style={styles.ratingText}>{count}</Text>
            <TouchableOpacity onPress={handleDecrement}>
              <SimpleLineIcons name="minus" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.descriptionWrapper}>
          <Text style={styles.description}>{item.description}</Text>
        </View>

        <View style={styles.locationWrapper}>
          <View style={styles.location}>
            <Ionicons name="location-outline" size={24} color="black" />
            <Text>{item.product_location}</Text>
          </View>
          <View style={styles.location}>
            <MaterialCommunityIcons
              name="truck-delivery-outline"
              size={24}
              color="black"
            />
            <Text>Entrega gratis</Text>
          </View>
        </View>

        <View style={styles.cartRow}>
          <TouchableOpacity onPress={() => {}} style={styles.cartBtn}>
            <Text style={styles.cartTitle}>Contactanos y compra</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("CartScreen")}
            style={styles.addCart}
          >
            <Fontisto name="shopping-bag" size={22} color={COLORS.lightwhite} />
          </TouchableOpacity>
        </View>

        <View style={styles.contactRow}>
          <TouchableOpacity onPress={openPhoneDialer} style={styles.contactBtn}>
            <Ionicons name="call" size={24} color={COLORS.blue} />
            <Text style={styles.contactText}>{item.phoneNumber}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={openWhatsApp} style={styles.contactBtn}>
            <Fontisto name="whatsapp" size={24} color={COLORS.blue} />
            <Text style={styles.contactText}>{item.whatsapp}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
