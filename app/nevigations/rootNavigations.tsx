import React, { useMemo } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "@/app/screens/login/login";
import LoginScreenTT from "@/app/screens/login/login-tt";
import StackNavigator from './userNavigations/StackNavigator';
import AdminStackNavigator from './adminNavigations/AdminStackNavigator';

const Stack = createStackNavigator();

export default function RootNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* Màn hình đăng nhập */}
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="LoginTT" component={LoginScreenTT} />

            {/* Vai trò User */}
            <Stack.Screen name="UserNavigator" component={StackNavigator} />

            {/* Vai trò Admin */}
            <Stack.Screen name="AdminNavigator" component={AdminStackNavigator} />
        </Stack.Navigator>
    );
}