import React, { useMemo } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./BottomTabNavigator";
import RealTimeChart_Screen from "@/app/screens/data-observation/realtimeChart";
import TrendingChart_Screen from '@/app/screens/data-observation/trendingChart';
import Login_TT from '@/app/screens/login/login-tt';
import Notification_Screen from '@/app/screens/notification/notification';
import EditInformation_Screen from '@/app/screens/profile/editInfomation';

const Stack = createStackNavigator();

const screenOptions = {
  headerShown: false,
  detachInactiveScreens: true,
};

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      {/* Màn hình đăng nhập */}
      <Stack.Screen name="LoginTT" component={Login_TT} />

      {/* Màn hình chính */}
      <Stack.Screen name="Main" component={BottomTabNavigator} />

      {/* Màn hình Biểu đồ Realtime */}
      <Stack.Screen name="RealTime" component={RealTimeChart_Screen} />

      {/* Màn hình Biểu đồ Trending */}
      <Stack.Screen name="Trending" component={TrendingChart_Screen} />

      {/* Màn hình Thông báo */}
      <Stack.Screen name="Notification" component={Notification_Screen} />

      {/* Màn hình Chỉnh sửa thông tin người dùng */}
      <Stack.Screen name="EditInformation" component={EditInformation_Screen} />
    </Stack.Navigator>
  );
}
