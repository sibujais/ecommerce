import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
} from 'react-native';
import { useAuthStore } from '../store/useAuthStore';

const LoginScreen = ({ navigation }) => {
  const { user, loading, error, login } = useAuthStore();
  console.log('user', { user, loading, error, login });

  useEffect(() => {
    if (user) navigation.replace("ProductList");
  }, [user]);
  

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Signing in...</Text>
      </View>
    );
  }

  if (user) {
    navigation.replace('ProductList');
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/ecommerce-logo.png')}
        style={styles.logo}
      />

      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subtitle}>Sign in to continue</Text>

      {error && <Text style={styles.error}>{error}</Text>}

      <TouchableOpacity style={styles.btn} onPress={login}>
        <Text style={styles.btnText}>Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 90,
    height: 90,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  btn: {
    backgroundColor: '#007bff',
    padding: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
  },
  error: {
    marginTop: 10,
    color: 'red',
  },
});

export default LoginScreen;
