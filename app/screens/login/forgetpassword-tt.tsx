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
import { getUser, loginAPI, resetPassword, sendOTP } from '@/services/api.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native-paper';
import { OtpInput } from "react-native-otp-entry";


const ForgetPass_TT = () => {
    const [] = useFonts({
        "TheNautigal-Bold": require("@/assets/fonts/The_Nautigal/TheNautigal-Bold.ttf"),
        "Roboto-Bold": require("@/assets/fonts/Roboto/static/Roboto-Bold.ttf"),
    });
    const navigation = useNavigation<any>();

    

    const [checkFlow, setCheckFlow] = React.useState(0);
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [otp, setOtp] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    const handleSendOTP = async () => {
        try {
            setIsLoading(true);
            const response:any = await sendOTP ({ username: username, email: email });
            console.log(response);
            if (response && response.statusCode == 200) {
                setCheckFlow(1); // Chuyển sang giao diện nhập OTP
                alert("Gửi OTP thành công!");
            }
            else {
                alert("Gửi OTP thất bại!");
            }
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    const handleChangePassword = async () => {
        try {
            if (password !== confirmPassword) {
                alert("Mật khẩu không khớp!");
                return;
            }
            setIsLoading(true);
            const response:any = await resetPassword ({ username: username, email: email, otp: otp, newPassword: password });
            if (response && response.statusCode == 200) {
                alert("Đổi mật khẩu thành công!");
                navigation.navigate("Login");
            }
            else {
                alert("Sai mã OTP!");
            }
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    }


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
            <Text style={Login_TT_Style.loginText}>Quên mật khẩu</Text>

            {/* Input điền thông tin */}
            <View style={Login_TT_Style.inputContainer}>
              {checkFlow == 0 ?
              <>
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
                <Text style={Login_TT_Style.inputText}>Email</Text>
                <TextInput
                    style={Login_TT_Style.input}
                    placeholder='Nhập email'
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                  >
                </TextInput>
              </View>
              </> :
              <>
              <View>
              <Text style={Login_TT_Style.inputText}>Mã OTP</Text>
              <TextInput
                    style={Login_TT_Style.input}
                    placeholder='Nhập mã OTP'
                    value={otp}
                    onChangeText={(text) => setOtp(text)}
                    maxLength={6}
                    keyboardType="numeric"
                >
              </TextInput>
            </View>

            <View>
              <Text style={Login_TT_Style.inputText}>Mật khẩu mới</Text>
              <TextInput
                    style={Login_TT_Style.input}
                    placeholder='Nhập mật khẩu mới'
                    value={password}
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                >
              </TextInput>
            </View>

            <View>
              <Text style={Login_TT_Style.inputText}>Xác nận mật khẩu mới</Text>
              <TextInput
                    style={Login_TT_Style.input}
                    placeholder='Nhập lại mật khẩu mới'
                    secureTextEntry={true}
                    value={confirmPassword}
                    onChangeText={(text) => setConfirmPassword(text)}
                >
              </TextInput>
            </View>
            </> 


              }


                <TouchableOpacity 
                style={Login_TT_Style.forgotPassword}
                onPress={() => handleSendOTP()}
                >
                    <Text >Gửi lại mã OTP</Text>
                </TouchableOpacity>


                <TouchableOpacity 
                style={Login_TT_Style.forgotPassword}
                onPress={() => navigation.navigate("Login")}
                >
                    <Text >Trở về đăng nhập?</Text>
                </TouchableOpacity>
            </View>

            {/* Nút Đăng nhập */}
            {checkFlow == 0 ?
            <>
            <TouchableOpacity
                style={Login_TT_Style.loginButton}
                onPress={() => handleSendOTP()}>
                {isLoading ? (
                    <ActivityIndicator color="#fff" />
                    ) : (
                    <Text style={Login_TT_Style.lastLoginText}>Gửi OTP</Text>
                )}
            </TouchableOpacity>
            </>:
            <TouchableOpacity
                style={Login_TT_Style.loginButton}
                onPress={() => handleChangePassword()}>
                {isLoading ? (
                    <ActivityIndicator color="#fff" />
                    ) : (
                    <Text style={Login_TT_Style.lastLoginText}>Đổi mật khẩu</Text>
                )}
            </TouchableOpacity>}

          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>

    </ImageBackground>

  );
};

export default ForgetPass_TT;