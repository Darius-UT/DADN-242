import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/home/home";
import DataObservationScreen from "../screens/data-observation/data-observation";
import DeviceControlScreen from "../screens/device-control/device-control";
import ProfileScreen from "../screens/profile/profile";
import { COLORS } from "@/constants/Colors";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        lazy: true,
        tabBarActiveTintColor: COLORS.white,
        tabBarInactiveTintColor: "rgba(255,255,255,0.6)",
        tabBarStyle: { backgroundColor: COLORS.primary, height: 60 },
        tabBarIndicatorStyle: { backgroundColor: "white" },
        animationEnabled: true, // Bật hiệu ứng chuyển đổi
        headerShown: false,
        tabBarIcon: ({ focused, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = "home-outline";
  
            if (route.name === "Home") iconName = focused ? "home" : "home-outline";
            else if (route.name === "Data") iconName = focused ? "bar-chart" : "bar-chart-outline";
            else if (route.name === "Control") iconName = focused ? "settings" : "settings-outline";
            else if (route.name === "Profile") iconName = focused ? "person" : "person-outline";
  
            return <Ionicons name={iconName} size={size} color={COLORS.white} />;
          },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Data" component={DataObservationScreen} />
      <Tab.Screen name="Control" component={DeviceControlScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};