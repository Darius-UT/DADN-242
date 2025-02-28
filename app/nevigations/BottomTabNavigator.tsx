// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import HomeScreen from "@/app/screens/home";
// import ProfileScreen from "@/app/screens/profile";
// import DeviceControlScreen from "@/app/screens/device-control";
// import { Ionicons } from "@expo/vector-icons";

// const Tab = createBottomTabNavigator();

// export default function BottomTabNavigator() {
//     return (
//         <Tab.Navigator
//             screenOptions={({ route }) => ({
//                 headerShown: false,
//                 tabBarIcon: ({ color, size }) => {
//                     let iconName: keyof typeof Ionicons.glyphMap = "home";
//                     if (route.name === "Home") iconName = "home";
//                     else if (route.name === "Profile") iconName = "person";
//                     else if (route.name === "DeviceControl") iconName = "settings";
//                     return <Ionicons name={iconName} size={size} color={color} />;
//                 },
//             })}
//         >
//             <Tab.Screen name="Home" component={HomeScreen} />
//             <Tab.Screen name="DeviceControl" component={DeviceControlScreen} />
//             <Tab.Screen name="Profile" component={ProfileScreen} />
//         </Tab.Navigator>
//     );
// }
