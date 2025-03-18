import React from "react";
import { View, Text, ImageBackground, TouchableOpacity, Image } from "react-native";
import LoginStyle from "@/styles/screens/login/login";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";


export default function LoginScreen() {
  const [] = useFonts({
    "TheNautigal-Bold": require("@/assets/fonts/The_Nautigal/TheNautigal-Bold.ttf"),
    "Roboto-Bold": require("@/assets/fonts/Roboto/static/Roboto-Bold.ttf"),
  });

  const navigation = useNavigation<any>();

  return (
    <View>
      <ImageBackground source={require("@/assets/images/LogIn.png")} style={LoginStyle.background}>
        <View style={LoginStyle.container}>
          {/* Hình ảnh Logo */}
          <Image source={require("@/assets/images/Logo.png")} style={LoginStyle.logo} />

          {/* Tên app*/}
          <Text style={LoginStyle.appName}>Bontanica</Text>

          {/* Nút đăng nhập */}
          <TouchableOpacity 
          style={LoginStyle.loginButton}
          onPress={() => navigation.navigate("LoginTT")}>
            <Text style={LoginStyle.loginText}>KỸ THUẬT VIÊN</Text>
          </TouchableOpacity>

          <TouchableOpacity 
          style={[LoginStyle.loginButton, { marginTop: 20 }]}
          onPress={() => navigation.navigate("AdminNavigator")}>
            <Text style={LoginStyle.loginText}>QUẢN TRỊ VIÊN</Text>
          </TouchableOpacity>

        </View>
      </ImageBackground>
    </View>
  );
} 
