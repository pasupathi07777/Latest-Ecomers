import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeHeader = ({navigation}) => {
  const onSearchPress = () => {
    navigation.navigate('Search');
  };
  return (
    <View style={styles.headerContainer}>
      {/* Logo Title */}
      <View style={styles.logoContainer}>
        <Image style={styles.tinyLogo} source={require('../assets/gypy.png')} />
      </View>

      {/* Search Icon */}
      <TouchableOpacity
        onPress={onSearchPress}
        style={styles.searchIconContainer}>
        <Ionicons name="search-outline" size={26} color="#878787" />
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    height: 60,
    zIndex: 100,
    // Shadow for Elevation
    elevation: 1, // Android shadow
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.2,
    // shadowRadius: 3,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  tinyLogo: {
    height: 35, // Adjust this value to scale the logo properly
    width: 100, // Adjust this value as needed
    resizeMode: 'contain', // Ensures the logo maintains its aspect ratio
    // backgroundColor: 'gray',
  },
});
