import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./BottomTabNavigator";
import LoginScreen from "../screens/login/login";
import LoginScreenTT from "../screens/login/login-tt";

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Màn hình đăng nhập */}
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="LoginTT" component={LoginScreenTT} />
      
      {/* Màn hình chính */}
      <Stack.Screen name="Main" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
}
