import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
  Platform,
} from "react-native";
import { Formik } from "formik";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Yup from "yup";
import { API_BASE_URL } from "../Components/services/config";

const AddSubcategoryScreen = ({ subcategoryId }) => {
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/categories/${subcategoryId}`
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [subcategoryId]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

const handleSubmit = async (values, { resetForm }) => {
  setLoader(true); // Show loader

  try {
    // Validate all required fields are filled
    if (
      !values.name ||
      !values.description ||
      !values.location ||
      !values.phoneNumber ||
      !values.whatsapp
    ) {
      Alert.alert("Todos los campos son obligatorios");
      return;
    }

    if (!selectedCategory) {
      Alert.alert("Por favor, selecciona una categoría");
      return;
    }

    // Prepare the data object to send to the backend
    const postData = {
      name: values.name,
      description: values.description,
      location: values.location,
      phoneNumber: values.phoneNumber, // Ensure phoneNumber is included
      whatsapp: values.whatsapp,
      category: selectedCategory,
      image: image ? image : null,
    };

    const endpoint = `${API_BASE_URL}/subcategories/category/${selectedCategory}`;
    const response = await axios.post(endpoint, postData);

    if (response.status === 201) {
      Alert.alert("Subcategoría creada exitosamente");
      resetForm();
      setImage(null);
      setSelectedCategory("");
    } else {
      Alert.alert("Hubo un error al crear la subcategoría");
    }
  } catch (error) {
    console.error(
      "Error creating subcategory:",
      error.response?.data || error.message || error
    );
    Alert.alert("Hubo un error al crear la subcategoría");
  } finally {
    setLoader(false); // Hide loader
  }
};


  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Nombre es requerido"),
    description: Yup.string().required("Descripción es requerida"),
    location: Yup.string().required("Ubicación es requerida"),
    phoneNumber: Yup.string().required("Teléfono de contacto es requerido"),
    whatsapp: Yup.string().required("WhatsApp de contacto es requerido"),
  });

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}>
      <Text style={styles.title}>Agregar Subcategoría</Text>
      <Formik
        initialValues={{
          name: "",
          description: "",
          location: "",
          phoneNumber: "",
          whatsapp: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            <Picker
              selectedValue={selectedCategory}
              onValueChange={(itemValue) => setSelectedCategory(itemValue)}>
              <Picker.Item label="Selecciona una categoría" value="" />
              {categories.map((category) => (
                <Picker.Item
                  key={category._id}
                  label={category.name}
                  value={category._id}
                />
              ))}
            </Picker>
            <TouchableOpacity onPress={pickImage}>
              {image ? (
                <Image source={{ uri: image }} style={styles.imagePreview} />
              ) : (
                <Image
                  source={require("../../assets/images/placeholderImage.png")}
                  style={styles.imagePlaceholder}
                />
              )}
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={values.name}
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
            />
            {errors.name && touched.name && (
              <Text style={styles.errorText}>{errors.name}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Descripción"
              value={values.description}
              onChangeText={handleChange("description")}
              onBlur={handleBlur("description")}
              multiline
            />
            {errors.description && touched.description && (
              <Text style={styles.errorText}>{errors.description}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Ubicación"
              value={values.location}
              onChangeText={handleChange("location")}
              onBlur={handleBlur("location")}
            />
            {errors.location && touched.location && (
              <Text style={styles.errorText}>{errors.location}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Teléfono de contacto"
              value={values.phoneNumber}
              onChangeText={handleChange("phoneNumber")}
              onBlur={handleBlur("phoneNumber")}
            />
            {errors.phoneNumber && touched.phoneNumber && (
              <Text style={styles.errorText}>{errors.phoneNumber}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="WhatsApp de contacto"
              value={values.whatsapp}
              onChangeText={handleChange("whatsapp")}
              onBlur={handleBlur("whatsapp")}
            />
            {errors.whatsapp && touched.whatsapp && (
              <Text style={styles.errorText}>{errors.whatsapp}</Text>
            )}
            <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
              <Text style={styles.addButtonText}>Agregar Subcategoría</Text>
            </TouchableOpacity>
            {loader && <ActivityIndicator size="large" color="#0000ff" />}
          </View>
        )}
      </Formik>
    </KeyboardAwareScrollView>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: "#28a745",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginVertical: 10,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginVertical: 10,
    backgroundColor: "#ccc",
  },
  errorText: {
    fontSize: 12,
    color: "red",
    marginBottom: 10,
  },
};

export default AddSubcategoryScreen;
