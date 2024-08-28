import React, { useState, useEffect, useCallback, useMemo, useContext } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Formik } from "formik";
import * as Yup from "yup";
import { COLORS } from "../Components/constants";
import BackBtn from "../providers/BackBtn";
import Botton from "../providers/Botton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { API_BASE_URL } from "../Components/services/config";
import * as WebBrowser from "expo-web-browser";
import styles from "./Register.style";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

WebBrowser.maybeCompleteAuthSession();

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Tiene que ser un mínimo de 8 caracteres")
    .required("Requerido"),
  email: Yup.string()
    .email("Introduzca el email correcto")
    .required("Requerido"),
});

const InputField = ({
  icon,
  placeholder,
  secureTextEntry,
  value,
  onChangeText,
  onFocus,
  onBlur,
  autoCapitalize,
  autoCorrect,
}) => (
  <View style={styles.action(value ? COLORS.primary : COLORS.offwhite)}>
    {icon}
    <TextInput
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      style={styles.textInput}
      onFocus={onFocus}
      onBlur={onBlur}
      onChangeText={onChangeText}
      value={value}
      autoCapitalize={autoCapitalize}
      autoCorrect={autoCorrect}
    />
  </View>
);

const LoginPage = () => {
  const [loader, setLoader] = useState(false);
  const [obsecureText, setObsecureText] = useState(true);
  const navigation = useNavigation();
  useEffect(() => {
    // const checkLoginStatus = async () => {
    //   try {
    //     const token = await AsyncStorage.getItem("id");
    //     if (token) {
    //       navigation.replace("HomeUi");
    //     }
    //   } catch (error) {
    //     console.log("Error checking login status", error);
    //   }
    // };
    // checkLoginStatus();
  }, []);

  const handleLogin = async (values) => {
    setLoader(true);
    const endpoint = `${API_BASE_URL}/login`;

    try {
      const response = await axios.post(endpoint, values);
      if (response.status === 200) {
        const responseData = response.data;
        if (responseData && responseData._id) {
          await AsyncStorage.setItem(
            `user${responseData._id}`,
            JSON.stringify(responseData)
          );
          await AsyncStorage.setItem("id", JSON.stringify(responseData._id));
          navigation.replace("HomeUi");
        }
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Error de inicio de sesión. Inténtalo de nuevo.");
    } finally {
      setLoader(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always">
      <View style={styles.container}>
        <BackBtn onPress={() => navigation.goBack()} />
        <View style={styles.topImageContainer}>
          <Image
            source={require("../../assets/BACKGROUNDStrabajo1.png")}
            style={styles.topImage}
          />
        </View>
        <View style={styles.mboloContainer}>
          <Text style={styles.mboloText}>MBOLO</Text>
        </View>
        <View style={styles.loginContainer}>
          <Text style={styles.text_header}>Login !!!</Text>
        </View>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => handleLogin(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            isValid,
            touched,
            setFieldTouched,
          }) => (
            <View style={styles.wrapper}>
              <InputField
                icon={
                  <FontAwesome
                    name="user-o"
                    size={24}
                    color="#4c86A8"
                    style={styles.smallIcon}
                  />
                }
                placeholder="Mobile or Email"
                value={values.email}
                onChangeText={handleChange("email")}
                onFocus={() => setFieldTouched("email")}
                onBlur={() => setFieldTouched("email", "")}
                autoCapitalize="none"
                autoCorrect={false}
              />
              {touched.email && errors.email && (
                <Text style={styles.errorMessage}>{errors.email}</Text>
              )}
              <View
                style={styles.action(
                  touched.password ? COLORS.primary : COLORS.offwhite
                )}>
                <Ionicons
                  name="lock-closed-outline"
                  size={24}
                  color="#4c86A8"
                  style={styles.smallIcon}
                />
                <TextInput
                  secureTextEntry={obsecureText}
                  placeholder="Contraseña"
                  style={styles.textInput}
                  onFocus={() => {
                    setFieldTouched("password");
                  }}
                  onBlur={() => setFieldTouched("password", "")}
                  onChangeText={handleChange("password")}
                  value={values.password}
                  autoCorrect={false}
                />
                <TouchableOpacity
                  onPress={() => {
                    setObsecureText(!obsecureText);
                  }}>
                  <MaterialCommunityIcons
                    name={obsecureText ? "eye-outline" : "eye-off-outline"}
                    size={18}
                  />
                </TouchableOpacity>
              </View>
              {touched.password && errors.password && (
                <Text style={styles.errorMessage}>{errors.password}</Text>
              )}
              <View style={styles.buttonContainer}>
                <Botton
                  loader={loader}
                  title="L O G I N"
                  onPress={
                    isValid
                      ? handleSubmit
                      : () =>
                          Alert.alert(
                            "Formulario inválido",
                            "Por favor introduzca los datos apropiados"
                          )
                  }
                  isValid={isValid}
                />
              </View>
              <Text
                style={styles.registration}
                onPress={() => navigation.navigate("Register")}>
                ¿No tiene una cuenta? Registrate
              </Text>
            </View>
          )}
        </Formik>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default LoginPage;
