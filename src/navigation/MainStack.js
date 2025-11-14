import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen";
import ProductListScreen from "../screens/ProductListScreen";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";
import CartScreen from "../screens/CartScreen";
import ScannerScreen from "../screens/ScannerScreen";

const Stack = createStackNavigator();

const MainStack = () => {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
      <Stack.Screen name="ProductList" component={ProductListScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen name="ScannerScreen" component={ScannerScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;
