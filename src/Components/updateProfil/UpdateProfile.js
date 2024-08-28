import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { Formik } from "formik";
import * as Yup from "yup";
import { API_BASE_URL } from "../services/config";
const UpdateProfile = () => {
  const [image, setImage] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const getUserId = async () => {
      const id = await AsyncStorage.getItem("id");
      setUserId(id ? id.replace(/\"/g, "") : null);
    };
    getUserId();
  }, []);

  const pickImage = async (setFieldValue) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);
      setFieldValue("image", uri);
    }
  };

  const handleUpdateProfile = async (values) => {
    const { userName, email, password, location, mobile, image } = values;
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("location", location);
    formData.append("mobile", mobile);

    if (image) {
      const filename = image.split("/").pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image`;

      formData.append("image", {
        uri: image,
        name: filename,
        type,
      });
    }

    try {
      const response = await axios.put(
        `${API_BASE_URL}/user/update-profile/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      Alert.alert("Success", "Profile updated successfully");
    } catch (error) {
      console.error(
        "Error updating profile:",
        error.response?.data || error.message
      );
      Alert.alert("Error", "Failed to update profile. Please try again later.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Formik
          initialValues={{
            userName: "",
            email: "",
            password: "",
            image: "",
            location: "",
            mobile: "",
          }}
          validationSchema={Yup.object().shape({
            userName: Yup.string().required("Username is required"),
            email: Yup.string()
              .email("Invalid email")
              .required("Email is required"),
            password: Yup.string()
              .min(6, "Password must be at least 6 characters")
              .required("Password is required"),
            location: Yup.string().required("Location is required"),
            mobile: Yup.string().required("Mobile number is required"),
          })}
          onSubmit={handleUpdateProfile}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.formContainer}>
              <TouchableOpacity onPress={() => pickImage(setFieldValue)}>
                {image ? (
                  <Image source={{ uri: image }} style={styles.image} />
                ) : (
                  <Image
                    source={require("../../../assets/images/placeholderImage.png")}
                    style={styles.image}
                  />
                )}
              </TouchableOpacity>
              <Text style={styles.label}>Nombre</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("userName")}
                onBlur={handleBlur("userName")}
                value={values.userName}
              />
              {touched.userName && errors.userName && (
                <Text style={styles.errorText}>{errors.userName}</Text>
              )}
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                keyboardType="email-address"
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                secureTextEntry
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
              <Text style={styles.label}>Location</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("location")}
                onBlur={handleBlur("location")}
                value={values.location}
              />
              {touched.location && errors.location && (
                <Text style={styles.errorText}>{errors.location}</Text>
              )}
              <Text style={styles.label}>Mobile</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("mobile")}
                onBlur={handleBlur("mobile")}
                value={values.mobile}
                keyboardType="phone-pad"
              />
              {touched.mobile && errors.mobile && (
                <Text style={styles.errorText}>{errors.mobile}</Text>
              )}
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Update Profile</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  formContainer: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: "#0066cc",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "#d9534f",
    fontSize: 12,
    marginBottom: 5,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    alignSelf: "center",
    borderColor: "#ddd",
    borderWidth: 1,
  },
});
