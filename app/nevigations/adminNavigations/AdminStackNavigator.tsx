import React, { useMemo } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import AdminBottomTabNavigator from './AdminBottomTabNavigator';
const Stack = createStackNavigator();

const screenOptions = {
  headerShown: false,
  detachInactiveScreens: true,
};

export default function AdminStackNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      {/* Màn hình chính */}
      <Stack.Screen name="AdminMain" component={AdminBottomTabNavigator} />
    </Stack.Navigator>
  );
}
