import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import  styles from './Heading.style'
import { useNavigation } from '@react-navigation/native';


const Heading = () => {
  const navigation = useNavigation();
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text
            style={{
              textAlign: "center",
              marginTop: 7,
              letterSpacing: 4,
              marginBottom: 5,
              color: "gray",
              fontSize: 20
            }}>
            Recientes
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("ProductList")}>
            <Ionicons name="grid" size={24} color="#4c86A8" />
          </TouchableOpacity>
        </View>
      </View>
    );
}



export default Heading;
