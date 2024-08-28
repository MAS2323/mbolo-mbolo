import { View, SafeAreaView, TextInput, Text, Image } from "react-native";
import React, {useState} from 'react'
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styles from './Search.style';
import axios from 'axios';
import SearchTile from "../productos/SearchTile";
import { API_BASE_URL } from "../services/config";

export default function SearchScreen() {
  const [searchKey, setSearchKey] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  console.log(searchResults)
  //http://192.168.100.235:3000/product/search/${searchKey}
  const handleSearch = async () =>{
    try {

        const response = await axios.get(
          `${API_BASE_URL}/products/search/${searchKey}`
        );
       setSearchResults(response.data)
    } catch (error) {
        console.log('Failed to get products', error);
    }
  }
  
  console.log(searchKey);
  return (
    <SafeAreaView>
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
            value={searchKey}
            onChangeText={setSearchKey}
            placeholder="Todo lo que desees en un click!"
          />
        </View>
        <View>
          <TouchableOpacity
            style={styles.searchBtn}
            onPress={() => handleSearch()}>
            <Feather name="search" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      {searchResults.length === 0 ? (
        <View style={{ flex: 1 }}>
          <Image
            source={require("../../../assets/research_Mesa de trabajo 1.png")}
            style={styles.searchImage}
          />
        </View>
      ) : (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <SearchTile item={item} />}
          style={{ marginHorizontal: 12 }}
        />
      )}
    </SafeAreaView>
  );
}

