import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
} from "react-native";
import { Formik } from "formik";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import Botton from "../../providers/Botton";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { API_BASE_URL } from "../../Components/services/config";

export default function AddScreen() {
  const [loader, setLoader] = useState(false);
  const [image, setImage] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const getUserId = async () => {
      const id = await AsyncStorage.getItem("id");
      setUserId(id?.replace(/\"/g, "") || ""); // Maneja posibles valores nulos
    };
    getUserId();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const AddPost = async (values) => {
    setLoader(true);
    try {
      const endpoint = `${API_BASE_URL}/products`;
      const postData = {
        ...values,
        imageUrl: image,
        userId: userId, // Asegúrate de que el userId esté correctamente formateado
      };

      const response = await axios.post(endpoint, postData);

      if (response.status === 201) {
        Alert.alert("Éxito", "Producto agregado exitosamente", [
          { text: "OK", onPress: () => navigation.replace("HomeUi") },
        ]);
      }
    } catch (error) {
      console.error(
        "Error al agregar el producto:",
        error.response?.data || error.message || error
      );
      Alert.alert("Error", "Hubo un error al agregar el producto");
    } finally {
      setLoader(false);
    }
  };

  if (!userId) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Debes iniciar sesión para agregar un producto
        </Text>
        {/* Aquí podrías añadir un botón o componente para redirigir a la pantalla de inicio de sesión */}
      </View>
    );
  }

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}>
      <Text style={styles.title}>Vende</Text>
      <Text style={styles.subtitle}>Crea un nuevo producto para todos</Text>
      <Formik
        initialValues={{
          title: "",
          supplier: "",
          description: "",
          product_location: "",
          price: "",
          imageUrl: "",
          phoneNumber: "",
          whatsapp: "",
        }}
        onSubmit={AddPost}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <TouchableOpacity onPress={pickImage}>
              {image ? (
                <Image source={{ uri: image }} style={styles.image} />
              ) : (
                <Image
                  source={require("./../../../assets/images/placeholderImage.png")}
                  style={styles.image}
                />
              )}
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Título"
              value={values.title}
              onChangeText={handleChange("title")}
              onBlur={handleBlur("title")}
            />
            <TextInput
              style={styles.input}
              placeholder="Descripción"
              value={values.description}
              onChangeText={handleChange("description")}
              onBlur={handleBlur("description")}
            />
            <TextInput
              style={styles.input}
              placeholder="Supplier"
              value={values.supplier}
              onChangeText={handleChange("supplier")}
              onBlur={handleBlur("supplier")}
            />
            <TextInput
              style={styles.input}
              placeholder="Precio"
              value={values.price}
              keyboardType="number-pad"
              onChangeText={handleChange("price")}
              onBlur={handleBlur("price")}
            />
            <TextInput
              style={styles.input}
              placeholder="Telefono"
              value={values.phoneNumber}
              keyboardType="number-pad"
              onChangeText={handleChange("phoneNumber")}
              onBlur={handleBlur("phoneNumber")}
            />
            <TextInput
              style={styles.input}
              placeholder="whatsapp"
              value={values.whatsapp}
              keyboardType="number-pad"
              onChangeText={handleChange("whatsapp")}
              onBlur={handleBlur("whatsapp")}
            />
            <TextInput
              style={styles.input}
              placeholder="Dirección"
              value={values.product_location}
              onChangeText={handleChange("product_location")}
              onBlur={handleBlur("product_location")}
            />
            <Botton loader={loader} title={"Agregar"} onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 20,
  },
});
