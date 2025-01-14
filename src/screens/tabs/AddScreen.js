import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
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
  const [images, setImages] = useState([]); // Aquí almacenaremos múltiples imágenes
  const [userId, setUserId] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const getUserId = async () => {
      const id = await AsyncStorage.getItem("id");
      setUserId(id?.replace(/\"/g, "") || "");
    };
    getUserId();
  }, []);

  // Función para seleccionar imágenes de la galería
  const pickImages = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsMultipleSelection: true,
        allowsEditing: false,
        selectionLimit: 5,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets?.length > 0) {
        const selectedImages = result.assets.map((asset) => asset.uri);
        setImages((prevImages) => [...prevImages, ...selectedImages]);
      }
    } catch (error) {
      console.error("Error seleccionando imágenes:", error);
    }
  };

  // Función para capturar una foto con la cámara
  const takePhoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets?.length > 0) {
        setImages((prevImages) => [...prevImages, result.assets[0].uri]);
      }
    } catch (error) {
      console.error("Error tomando foto:", error);
    }
  };

  // Función para mostrar el diálogo con opciones de selección
  const showImagePickerOptions = () => {
    Alert.alert(
      "Seleccionar imagen",
      "Elige una opción",
      [
        { text: "Seleccionar de Galería", onPress: pickImages },
        { text: "Tomar una foto", onPress: takePhoto },
        { text: "Cancelar", style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  const AddPost = async (values) => {
    setLoader(true);
    try {
      const endpoint = `${API_BASE_URL}/products`;
      const postData = {
        ...values,
        images, // Enviar el array de imágenes
        userId,
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
        error.response?.data || error.message
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
      </View>
    );
  }

  return (
    <KeyboardAwareScrollView style={styles.container} behavior="padding">
      <Text style={styles.title}>Vende</Text>
      <Text style={styles.subtitle}>Crea un nuevo producto para todos</Text>
      <Formik
        initialValues={{
          title: "",
          supplier: "",
          description: "",
          product_location: "",
          price: "",
          phoneNumber: "",
          whatsapp: "",
        }}
        onSubmit={AddPost}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            {/* Imagen clickeable para mostrar opciones */}
            <TouchableOpacity onPress={showImagePickerOptions}>
              {images.length > 0 ? (
                <View style={styles.imageContainer}>
                  {images.map((images, index) => (
                    <Image
                      key={index}
                      source={{ uri: images }}
                      style={styles.image}
                    />
                  ))}
                </View>
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
              placeholder="Proveedor"
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
              placeholder="Teléfono"
              value={values.phoneNumber}
              keyboardType="number-pad"
              onChangeText={handleChange("phoneNumber")}
              onBlur={handleBlur("phoneNumber")}
            />
            <TextInput
              style={styles.input}
              placeholder="WhatsApp"
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
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  message: {
    textAlign: "center",
    fontSize: 16,
    color: "gray",
  },
});
