import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
} from "react-native";
import { Avatar } from "react-native-paper";
import Toast from "react-native-toast-message";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import {
  AntDesign,
  MaterialCommunityIcons,
  SimpleLineIcons,
  MaterialIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { COLORS } from "../../Components/constants";
import { API_BASE_URL } from "../../Components/services/config";
export default function PerfilScreen() {
  
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [userLogin, setUserLogin] = useState(false);

  useEffect(() => {
    checkExistingUser();
  }, []);

  const checkExistingUser = async () => {
    try {
      const id = await AsyncStorage.getItem("id");
      if (!id) {
        navigation.navigate("Login");
        return;
      }
      const userId = `user${JSON.parse(id)}`;
      const currentUser = await AsyncStorage.getItem(userId);
      if (currentUser) {
        setUserData(JSON.parse(currentUser));
        setUserLogin(true);
      } else {
        navigation.navigate("Login");
      }
    } catch (error) {
      console.error("Error recuperando tus datos:", error);
    }
  };

  const userLogout = async () => {
    try {
      const id = await AsyncStorage.getItem("id");
      const userId = `user${JSON.parse(id)}`;
      await AsyncStorage.multiRemove([userId, "id"]);
      navigation.replace("HomeUi");
    } catch (error) {
      console.error("Error cerrando sesión:", error);
    }
  };

  const logout = () => {
    Alert.alert("Cerrar sesión", "¿Estás seguro que quieres cerrar sesión?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Continuar", onPress: userLogout },
    ]);
  };

  const clearCache = async () => {
    try {
      const confirmed = await new Promise((resolve) => {
        Alert.alert(
          "Limpiar la Caché",
          "¿Estás seguro que quieres eliminar todos los datos guardados en tu dispositivo?",
          [
            {
              text: "Cancelar",
              style: "cancel",
              onPress: () => resolve(false),
            },
            { text: "Continuar", onPress: () => resolve(true) },
          ]
        );
      });

      if (confirmed) {
        await AsyncStorage.clear();
        console.log("Caché eliminada");
      }
    } catch (error) {
      console.error("Error al limpiar la caché:", error);
    }
  };

  const deleteAccount = async () => {
      try {
        const userId = await AsyncStorage.getItem("id"); // Obtén el ID del usuario almacenado
        if (!userId) {
          console.log("ID del usuario no encontrado en AsyncStorage");
          return;
        }

        Alert.alert(
          "Eliminar mi cuenta",
          "¿Estás seguro que quieres eliminar tu cuenta?",
          [
            {
              text: "Cancelar",
              style: "cancel",
              onPress: () => console.log("Eliminación de cuenta cancelada"),
            },
            {
              text: "Continuar",
              onPress: async () => {
                try {
                  const endpoint = `${API_BASE_URL}/user/${userId}`;
                  const response = await axios.delete(endpoint);

                  if (response.status === 200) {
                    console.log("Cuenta eliminada");
                    // Opcional: limpiar AsyncStorage o redirigir al usuario
                    await AsyncStorage.removeItem("id");
                    navigation.replace("LoginScreen"); // O redirige a la pantalla de login u otra pantalla apropiada
                  }
                } catch (error) {
                  console.error("Error al eliminar la cuenta", error);
                  // Manejar el error aquí, por ejemplo, mostrar un mensaje al usuario
                }
              },
            },
          ]
        );
      } catch (error) {
        console.error("Error deleting user", error);
      }
  };


  useEffect(() => {
    setTimeout(() => {
      Toast.show({
        type: "success",
        text1: "Bienvenido",
        text2: "Usuario de Mbolo App",
        visibilityTime: 5000,
      });
    }, 2000);
  }, []);

  const renderMenuItem = (icon, label, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.menuItem}>
        {icon}
        <Text style={styles.menuText}>{label}</Text>
      </View>
    </TouchableOpacity>
  );

  const menuItems = [
    // {
    //   icon: (
    //     <MaterialCommunityIcons
    //       name="truck-delivery-outline"
    //       color={COLORS.primary}
    //       size={24}
    //     />
    //   ),
    //   label: "Pedidos",
    //   onPress: () => navigation.navigate("UsersList"),
    // },
    {
      icon: <SimpleLineIcons name="bag" color={COLORS.primary} size={24} />,
      label: "Carrito",
      onPress: () => navigation.navigate("CartScreen"),
    },
    {
      icon: <MaterialIcons name="source" size={24} color={COLORS.primary} />,
      label: "Archivos",
      onPress: () => navigation.navigate("ArchivoScreen"),
    },
    {
      icon: <FontAwesome5 name="users" size={24} color={COLORS.primary} />,
      label: "Sobre nosotros",
      onPress: () => navigation.navigate("SobreNosotrosScreen"),
    },
    {
      icon: (
        <MaterialCommunityIcons
          name="cached"
          color={COLORS.primary}
          size={24}
        />
      ),
      label: "Limpiar la Caché",
      onPress: clearCache,
    },
    {
      icon: <AntDesign name="deleteuser" color={COLORS.primary} size={24} />,
      label: "Eliminar mi Cuenta",
      onPress: deleteAccount,
    },
    {
      icon: <AntDesign name="logout" color={COLORS.primary} size={24} />,
      label: "Cerrar Sesión",
      onPress: logout,
    },
    {
      icon: <MaterialIcons name="admin-panel-settings" size={27} color={COLORS.primary} />,
      label: "AdminScreen",
      onPress: () => navigation.navigate("AdminScreen"),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("UpdateProfile")}>
          <Avatar.Image
            size={80}
            style={styles.avatar}
            source={
              userData?.image
                ? { uri: userData.image }
                : require("../../../assets/Avatar22.webp")
            }
          />
          <View style={styles.userInfo}>
            <Text style={styles.userInfoText}>{userData?.userName}</Text>
            <Text style={styles.userInfoText}>{userData?.email}</Text>
            <Text style={styles.userInfoText}>{userData?.mobile}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <FlatList
        data={userLogin ? menuItems : []}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) =>
          renderMenuItem(item.icon, item.label, item.onPress)
        }
        contentContainerStyle={styles.menuWrapper}
        ListEmptyComponent={
          !userLogin && (
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <View style={styles.loginBtn}>
                <Text style={styles.menuText}>L O G I N</Text>
              </View>
            </TouchableOpacity>
          )
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    padding: 20,
  },
  card: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    marginRight: 20,
  },
  userInfo: {
    flex: 1,
    alignItems: "center",
  },
  userInfoText: {
    fontSize: 16,
    color: COLORS.white,
    marginBottom: 5,
    textAlign: "center",
  },
  menuWrapper: {
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f4f4f4",
  },
  menuText: {
    fontSize: 16,
    marginLeft: 20,
    color: COLORS.black,
  },
  loginBtn: { 
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: 20,
  },
});
