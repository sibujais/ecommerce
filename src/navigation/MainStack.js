import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import CartScreen from '../screens/CartScreen';
import ScannerScreen from '../screens/ScannerScreen';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductList"
        component={ProductListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CartScreen"
        component={CartScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ScannerScreen"
        component={ScannerScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
