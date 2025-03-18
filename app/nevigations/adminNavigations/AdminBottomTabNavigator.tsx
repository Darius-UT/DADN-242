import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import UserAdd_Screen from "@/app/screens/adminScreens/user_add/userAdd";
import { COLORS } from "@/constants/Colors";
import AdminSwipeTabs from "./AdminTopTabNavigation";

const Tab = createBottomTabNavigator();

export default function AdminBottomTabNavigator() {
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
  
            if (route.name === "Người dùng") iconName = focused ? "people" : "people-outline";
            else if (route.name === "Thêm mới") iconName = focused ? "person-add" : "person-add-outline";
  
            return <Ionicons name={iconName} size={size} color={COLORS.white} />;
          },
      })}
    >
      <Tab.Screen name="Người dùng" component={AdminSwipeTabs} />
      <Tab.Screen name="Thêm mới" component={UserAdd_Screen} />
    </Tab.Navigator>
  );
};