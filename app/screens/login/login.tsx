import React from "react";
import { View, Text, ImageBackground, TouchableOpacity, Image } from "react-native";
import LoginStyle from "@/styles/screens/login/login";
import { useFonts } from "expo-font";



export default function LoginScreen() {
  const [] = useFonts({
    "TheNautigal-Bold": require("@/assets/fonts/The_Nautigal/TheNautigal-Bold.ttf"),
    "Roboto-Bold": require("@/assets/fonts/Roboto/static/Roboto-Bold.ttf"),
  });


  return (
    <View>
      <ImageBackground source={require("@/assets/images/LogIn.png")} style={LoginStyle.background}>
        <View style={LoginStyle.container}>
          {/* Hình ảnh Logo */}
          <Image source={require("@/assets/images/Logo.png")} style={LoginStyle.logo} />

          {/* Tên app*/}
          <Text style={LoginStyle.appName}>Botanica</Text>

          {/* Nút đăng nhập */}
          <TouchableOpacity style={LoginStyle.loginButton}>
            <Text style={LoginStyle.loginText}>ĐĂNG NHẬP</Text>
          </TouchableOpacity>

        </View>
      </ImageBackground>


    </View>
  );
} 
