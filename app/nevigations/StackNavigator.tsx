import React, { useMemo } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./BottomTabNavigator";
import LoginScreen from "../screens/login/login";
import LoginScreenTT from "../screens/login/login-tt";
import RealTimeChart_Screen from "../screens/data-observation/realtimeChart";
import TrendingChart_Screen from '../screens/data-observation/trendingChart';

const Stack = createStackNavigator();

const screenOptions = {
  headerShown: false,
  detachInactiveScreens: true,
};

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={screenOptions}>
      {/* Màn hình đăng nhập */}
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="LoginTT" component={LoginScreenTT} />

      {/* Màn hình chính */}
      <Stack.Screen name="Main" component={BottomTabNavigator} />

      {/* Màn hình Biểu đồ Realtime */}
      <Stack.Screen name="RealTime" component={RealTimeChart_Screen} />

      {/* Màn hình Biểu đồ Trending */}
      <Stack.Screen name="Trending" component={TrendingChart_Screen} />
    </Stack.Navigator>
  );
}
