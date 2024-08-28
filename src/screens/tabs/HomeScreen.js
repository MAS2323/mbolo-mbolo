import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";
import Header from "../../Components/Home/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import Heading from "../../Components/Home/Heading";
import ProductRow from "../../Components/productos/ProductRow";
import styles from "./tabsStyle/home.Style";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { COLORS, SIZES} from "../../Components/constants/theme";
import { useNavigation } from "@react-navigation/native";
import MenuScreen from "../../Components/Home/MenuScreen";
import TendenciasScreen from "../categorias/TendenciasScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

function HomeScreen() {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [userLogin, setUserLogin] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    checkExistingUser();
  }, []);

  const checkExistingUser = async () => {
    const id = await AsyncStorage.getItem("id");
    const useId = `user${JSON.parse(id)}`;

    try {
      const currentUser = await AsyncStorage.getItem(useId);
      if (currentUser !== null) {
        const parsedData = JSON.parse(currentUser);
        setUserData(parsedData);
        setUserLogin(true);
      }
    } catch (error) {
      console.log("Error recuperando tus datos:", error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    // Aquí puedes agregar la lógica de actualización, como volver a cargar los datos
    await checkExistingUser();
    setRefreshing(false);
  };

  return (
    <SafeAreaView>
      <View>
        <View style={styles.appBarWrapper}>
          <View style={styles.appBar}>
            <TouchableOpacity onPress={() => {}}>
              <Ionicons name="location-outline" size={30} color="black" />
            </TouchableOpacity>
            <Text style={styles.location}>
              {userData ? userData.location : "Guinea Ecuatorial"}
            </Text>

            <View style={{ alignItems: "flex-end" }}>
              {/* <View style={styles.cartCount}>
                <Text style={styles.cartNumber}> 8 </Text>
              </View> */}

              <TouchableOpacity
                onPress={() => navigation.navigate("CartScreen")}>
                <Fontisto name="shopping-bag" size={24} color={COLORS.black} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <Header />
          <MenuScreen />
          <Heading />
          <ProductRow />
          <TendenciasScreen />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
