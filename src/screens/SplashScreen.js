import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';

const SplashScreen = ({ navigation }) => {
  const { user } = useAuthStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (user) {
        navigation.replace('ProductList');
      } else {
        navigation.replace('Login');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [user]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/ecommerce-logo.png')}
        style={styles.logo}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
  },
});
