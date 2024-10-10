import React from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  TextInput,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS, SIZES } from "../constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styles from './HeaderSearch.style';

const Header = () => {
 const navigation = useNavigation()
  return (
    <View>
      <View style={styles.searchIconContainer}>
        <TouchableOpacity>
          <Feather
            name="search"
            size={24}
            color="black"
            style={styles.searchIcon}
          />
        </TouchableOpacity>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value=""
            onPressIn={() => navigation.navigate("SearchScreen")}
            placeholder="Escribelo, busca y encuentralo!"
          />
        </View>
        {/* <View>
          <TouchableOpacity style={styles.searchBtn}>
            <Ionicons name="camera-outline" size={SIZES.xLarge} color="black" />
          </TouchableOpacity>
        </View> */}
      </View>

      <View>
        <Text
          style={{
            textAlign: "center",
            marginTop: 7,
            letterSpacing: 4,
            marginBottom: 5,
            color: "gray",
          }}>
          EXPLORAR
        </Text>
      </View>
    </View>
  );
};


export default Header;
