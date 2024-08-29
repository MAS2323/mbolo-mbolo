import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast, { ErrorToast } from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import {
  LoginPage,
  RegisterPage,
  AddScreen,
  PerfilScreen,
  UpdateProfile,
  HomeScreen,
  NewRivals,
  ProductDetails,
  SearchScreen,
  BackBtn,
  CategoryDetailScreen,
  CategoryListScreen,
  MenuScreen,
  CartScreen,
  FavoritesScreen,
  OrderScreen,
  AddSubcategoryScreen,
  SubcategoriesScreen,
  ScrollSubcategoris,
  DetallesScreen,
  ArchivoScreen,
  SobreNosotrosScreen,
  AdminScreen,
  UserManagementScreen,
  PrivacyPolicyScreen,
  SubCategoryDetails
} from "./Screens";
// import AsyncStorage from "@react-native-async-storage/async-storage";

const UserContext = React.createContext();
export { UserContext };

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState("");

  // const getData = async () => {
  //   // try {
  //   //   const data = await AsyncStorage.getItem("isLoggedIn");
  //   //   const userType = await AsyncStorage.getItem("userType");
  //   //   setIsLoggedIn(data === "true"); // Conversión a booleano
  //   //   setUserType(userType);
  //   // } catch (error) {
  //   //   console.error("Error fetching user data:", error);
  //   // }
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();

  function TabGroup() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, focused, size }) => {
            let iconName;
            switch (route.name) {
              case "Home":
                iconName = focused ? "home" : "home-outline";
                break;
              case "Add":
                iconName = focused ? "add-circle-sharp" : "add-circle-outline";
                break;
              case "FavoritesScreen":
                iconName = focused ? "heart-sharp" : "heart-outline";
                break;
              case "Perfil":
                iconName = focused ? "person" : "person-outline";
                break;
            }
            return <Ionicons name={iconName} color={"#4c86A8"} size={size} />;
          },
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#4c86A8",
          tabBarInactiveTintColor: "#4c86A8",
        })}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          initialParams={{ userId: "someUserId" }}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Add"
          component={AddScreen}
          options={{
            headerShown: true,
            headerTitle: "Agregar",
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: "bold",
              color: "#333",
            },
            headerTitleAlign: "center",
            headerTintColor: "#333",
          }}
        />
        <Tab.Screen
          name="FavoritesScreen"
          component={FavoritesScreen}
          options={{
            headerShown: true,
            headerTitle: "Favoritos",
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: "bold",
              color: "#333",
            },
            headerTitleAlign: "center",
            headerTintColor: "#333",
          }}
        />
        <Tab.Screen
          name="Perfil"
          component={PerfilScreen}
          options={{
            headerShown: true,
            headerTitle: "Perfil",
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: "bold",
              color: "#333",
            },
            headerTitleAlign: "center",
            headerTintColor: "#333",
          }}
        />
      </Tab.Navigator>
    );
  }

  const LoginNav2 = () => {
    const [policyAccepted, setPolicyAccepted] = useState(false);
    return (
      <Stack.Navigator
        initialRouteName={policyAccepted ? "HomeUi" : "PrivacyPolicy"}
        screenOptions={{ headerShown: true }}>
        <Stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicyScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeUi"
          component={TabGroup}
          initialParams={{ userId: "someUserId" }}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UpdateProfile"
          component={UpdateProfile}
          options={{
            headerShown: true,
            headerTitle: "Yo",
            headerStyle: {
              backgroundColor: "#4c86A8",
            },
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: "bold",
              color: "#333",
            },
            headerTitleAlign: "center",
            headerTintColor: "#333",
          }}
        />
        <Stack.Screen name="ProductList" component={NewRivals} options={{headerShown: false}} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} options={{headerShown: false}} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} options={{headerShown: false}} />
        <Stack.Screen
          name="SobreNosotrosScreen"
          component={SobreNosotrosScreen}
        />
        <Stack.Screen
          name="DetallesScreen"
          component={DetallesScreen}
          options={{
            headerShown: true,
            headerTitle: "Mas...",
            headerStyle: {
              backgroundColor: "#4c86A8",
            },
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: "bold",
              color: "#333",
            },
            headerTitleAlign: "center",
            headerTintColor: "#333",
          }}
        />
        <Stack.Screen
          name="OrderScreen"
          component={OrderScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="AdminScreen" component={AdminScreen} />
        <Stack.Screen
          name="UserManagement"
          component={UserManagementScreen}
          options={{
            headerShown: true,
            headerTitle: "Todos los usuarios",
            headerStyle: {
              backgroundColor: "#4c86A8",
            },
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: "bold",
              color: "#333",
            },
            headerTitleAlign: "center",
            headerTintColor: "#333",
          }}
        />
        <Stack.Screen
          name="CartScreen"
          component={CartScreen}
          options={{
            headerShown: true,
            headerTitle: "Carrito",
            headerStyle: {
              backgroundColor: "#4c86A8",
            },
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: "bold",
              color: "#333",
            },
            headerTitleAlign: "center",
            headerTintColor: "#333",
          }}
        />
        <Stack.Screen name="BackBtnScreen" component={BackBtn} />
        <Stack.Screen
          name="ArchivoScreen"
          component={ArchivoScreen}
          options={{
            headerShown: true,
            headerTitle: "Archivos",
            headerStyle: {
              backgroundColor: "#4c86A8",
            },
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: "bold",
              color: "#333",
            },
            headerTitleAlign: "center",
            headerTintColor: "#333",
          }}
        />
        <Stack.Screen
          name="CategoryList"
          component={CategoryListScreen}
          options={{ title: "Categories" }}
        />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen
          name="ScrollSubcategoris"
          component={ScrollSubcategoris}
        />
        <Stack.Screen
          name="CategoryDetailScreen"
          component={CategoryDetailScreen}
          options={({ route }) => ({ title: route.params.category.name })}
        />
        <Stack.Screen name="Login" component={LoginPage} options={{
          headerShown: false
        }}/>
        <Stack.Screen name="Register" component={RegisterPage} options={{
          headerShown: false
        }} />
        <Stack.Screen
          name="AddSubcategoryScreen"
          component={AddSubcategoryScreen}
          options={{
            headerShown: true,
            headerTitle: "Agregar una nueva subcategoria",
            headerStyle: {
              backgroundColor: "#4c86A8",
            },
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: "bold",
              color: "#333",
            },
            headerTitleAlign: "center",
            headerTintColor: "#333",
          }}
        />
        <Stack.Screen
          name="SubcategoriesScreen"
          component={SubcategoriesScreen}
          options={{
            headerShown: true,
            headerTitle: "Subcategorías",
            headerStyle: {
              backgroundColor: "#4c86A8",
            },
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: "bold",
              color: "#333",
            },
            headerTitleAlign: "center",
            headerTintColor: "#333",
          }}
        />
        <Stack.Screen
          name="SubCategoryDetails"
          component={SubCategoryDetails}
          options={({ route }) => ({
            headerTitle: route.params.subcategory.name,
            headerStyle: {
              backgroundColor: "#f9f9f9",
            },
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: "bold",
              color: "#333",
            },
            headerTitleAlign: "center",
            headerTintColor: "#333",
          })}
        />
      </Stack.Navigator>
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <UserContext.Provider value={{ isLoggedIn, userType }}>
          <LoginNav2 policyAccepted={true}/>
        </UserContext.Provider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
