import React, { useMemo } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import AdminBottomTabNavigator from './AdminBottomTabNavigator';
import Login_TT from '@/app/screens/login/login-tt';


const Stack = createStackNavigator();

const screenOptions = {
  headerShown: false,
  detachInactiveScreens: true,
};

export default function AdminStackNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      {/* Màn hình đăng nhập */}
      <Stack.Screen
        name="LoginTT"
        children={(props) => <Login_TT {...props} customProp="admin" />}
      />

      {/* Màn hình chính */}
      <Stack.Screen name="Main" component={AdminBottomTabNavigator} />
    </Stack.Navigator>
  );
}