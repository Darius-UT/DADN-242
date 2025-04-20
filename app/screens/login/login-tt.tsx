import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform
} from 'react-native';
import Login_TT_Style from '@/styles/screens/login/login-tt';
import { useFonts } from "expo-font";
import globalStyle from '@/styles/global';
import { useNavigation } from 'expo-router';
import { getUser, loginAPI } from '@/services/api.service';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Login_TT = () => {
  const [] = useFonts({
    "TheNautigal-Bold": require("@/assets/fonts/The_Nautigal/TheNautigal-Bold.ttf"),
    "Roboto-Bold": require("@/assets/fonts/Roboto/static/Roboto-Bold.ttf"),
  });

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigation = useNavigation<any>();
  const handleLogin = async () => {
    try {
      const response:any = await loginAPI({ username, password });
      console.log(response);
      if (response && response.statusCode == 200) {
        await AsyncStorage.setItem('accessToken', response.data.token);
        await AsyncStorage.setItem('userId', response.data.id);
        await AsyncStorage.setItem('username', response.data.username);
        // const token = await AsyncStorage.getItem('accessToken');
        // alert(token);
        navigation.navigate("Main")
      }
      else {
        alert("Sai tên đăng nhập hoặc mật khẩu!");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const checkLogin = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const response:any = await getUser(token);
      if (response && response.statusCode == 200) {
        navigation.navigate("Main")
      }
      else {
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('userId');
        await AsyncStorage.removeItem('username');
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    checkLogin();

  }, []);

  return (
    <ImageBackground source={require("@/assets/images/LogIn.png")} style={globalStyle.background}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
        <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
          {/* Logo + tên app */}
          <View style={Login_TT_Style.topContainer}>
            <Image source={require("@/assets/images/Logo.png")} style={Login_TT_Style.logo} />
            <Text style={Login_TT_Style.appName}>Bontanica</Text>
          </View>

          {/* Form đăng nhập */}
          <View style={Login_TT_Style.bottomContainer}>
            {/* Chữ Đăng Nhập */}
            <Text style={Login_TT_Style.loginText}>Đăng nhập</Text>

            {/* Input điền thông tin */}
            <View style={Login_TT_Style.inputContainer}>
              <View>
                <Text style={Login_TT_Style.inputText}>Tên đăng nhập</Text>
                <TextInput
                  style={Login_TT_Style.input}
                  placeholder='Nhập tên đăng nhập'
                  value={username}
                  onChangeText={(text) => setUsername(text)}
                  >
                </TextInput>
              </View>

              <View>
                <Text style={Login_TT_Style.inputText}>Mật khẩu</Text>
                <TextInput
                  style={Login_TT_Style.input}
                  placeholder='Nhập mật khẩu'
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry={true}
                  >
                </TextInput>
              </View>

              <TouchableOpacity 
              style={Login_TT_Style.forgotPassword}
              onPress={() => navigation.navigate("Forget")}
              >
                <Text >Quên mật khẩu?</Text>
              </TouchableOpacity>
            </View>

            {/* Nút Đăng nhập */}
            <TouchableOpacity
              style={Login_TT_Style.loginButton}
              onPress={() => handleLogin()}>
              <Text style={Login_TT_Style.lastLoginText}>Đăng nhập</Text>
            </TouchableOpacity>

            {/* Liên hệ quản trị viên */}
            <View style={Login_TT_Style.contact}>
              <Text>Bạn chưa có tài khoản?</Text>
              <TouchableOpacity>
                <Text style={Login_TT_Style.inputText}>Liên hệ quản trị viên</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>

    </ImageBackground>

  );
};

export default Login_TT;