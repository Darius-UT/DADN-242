import React, { useEffect, useState } from "react";
import { View, Text, Image, ImageBackground, ScrollView, SafeAreaView, Switch, TouchableOpacity, Alert } from "react-native";
import ToggleSwitch from 'toggle-switch-react-native';
import * as ProfileScreen_Style from "@/styles/screens/profile/profile";
import { useFonts } from "expo-font";
import { COLORS } from "@/constants/Colors";
import { TYPOGRAPHY } from "@/constants/Fonts";
import { useNavigation } from "expo-router";
import Top_Header from "@/components/common/Top_Header";
import { getUser, updateUser } from "@/services/api.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from 'moment';
import { TextInput } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";


const defaultAvatarImage = "https://thuvienanime.net/wp-content/uploads/2024/11/tu-ba-ba-tu-au-u-thuvienanime-9.jpg";
const defaultBackgroundImage = "https://thuvienanime.net/wp-content/uploads/2024/10/muc-than-ky-thuvienanime-1.jpg";

// Thành phần 1: Thông tin cá nhân
const PersonalInformation = (props: any) => {
  const [] = useFonts({
    "Roboto-ExtraBold": require("@/assets/fonts/Roboto/static/Roboto-ExtraBold.ttf"),
    "Roboto-SemiBold": require("@/assets/fonts/Roboto/static/Roboto-SemiBold.ttf"),
  });

  const RowInformation = (indexTitle: string, indexContent: string, isDisable:boolean, isPhone = false ) => {
    return (
      <View style={ProfileScreen_Style.PersonalInformation_Style.rowElement}>
        <Text style={ProfileScreen_Style.PersonalInformation_Style.indexTitleText}>{indexTitle}</Text>
        {isDisable ?
          <TextInput 
          style={ProfileScreen_Style.PersonalInformation_Style.indexContentTextEdit}
          editable={isDisable}
          >{indexContent}</TextInput>
          :
          <Text style={ProfileScreen_Style.PersonalInformation_Style.indexContentText}>{indexContent}</Text>
        }
      </View>
    );
  };
  const data = props.data;
  const setFullName = props.setFullName;
  const setEmail = props.setEmail;
  const setPhoneNumber = props.setPhoneNumber;

  return (
    <View style={ProfileScreen_Style.PersonalInformation_Style.container}>
      <Text style={ProfileScreen_Style.PersonalInformation_Style.titleText}>Hồ sơ cá nhân</Text>
      <View style={ProfileScreen_Style.PersonalInformation_Style.contentContainer}>

      <View style={ProfileScreen_Style.PersonalInformation_Style.rowElement}>
        <Text style={ProfileScreen_Style.PersonalInformation_Style.indexTitleText}>Họ và tên</Text>
          <TextInput 
          style={ProfileScreen_Style.PersonalInformation_Style.indexContentTextEdit}
          editable={true}
          value={data.fullName}
          onChangeText={(text) => setFullName(text)}
          />
      </View>

      <View style={ProfileScreen_Style.PersonalInformation_Style.rowElement}>
        <Text style={ProfileScreen_Style.PersonalInformation_Style.indexTitleText}>Email</Text>
          <TextInput 
          style={ProfileScreen_Style.PersonalInformation_Style.indexContentTextEdit}
          editable={true}
          value={data.email}
          onChangeText={(text) => setEmail(text)}
          />
      </View>

      <View style={ProfileScreen_Style.PersonalInformation_Style.rowElement}>
        <Text style={ProfileScreen_Style.PersonalInformation_Style.indexTitleText}>Số điện thoại</Text>
          <TextInput 
          style={ProfileScreen_Style.PersonalInformation_Style.indexContentTextEdit}
          editable={true}
          value={data.phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
          />
      </View>


      <View style={ProfileScreen_Style.PersonalInformation_Style.rowElement}>    
        <Text style={ProfileScreen_Style.PersonalInformation_Style.indexTitleText}>Vai trò</Text>
          <Text style={ProfileScreen_Style.PersonalInformation_Style.indexContentText}>{data.role}</Text>
      </View>

      <View style={ProfileScreen_Style.PersonalInformation_Style.rowElement}>    
        <Text style={ProfileScreen_Style.PersonalInformation_Style.indexTitleText}>Ngày tham gia</Text>
          <Text style={ProfileScreen_Style.PersonalInformation_Style.indexContentText}>{data.joinedDate}</Text>
      </View>

      
      </View>
    </View>
  );
};

// Thành phần 2: Cài đặt
const Setting = () => {
  const [notification_isEnabled, notification_setIsEnabled] = useState(true);
  const notification_toggleSwitch = () => notification_setIsEnabled(previousState => !previousState);

  const [screenMode_isEnabled, screenMode_setIsEnabled] = useState(false);
  const screenMode_toggleSwitch = () => screenMode_setIsEnabled(previousState => !previousState);

  return (
    <View style={ProfileScreen_Style.PersonalInformation_Style.container}>

      <Text style={ProfileScreen_Style.PersonalInformation_Style.titleText}>Cài đặt</Text>
      <View style={ProfileScreen_Style.Setting_Style.rowContainer}>
        <Text style={ProfileScreen_Style.PersonalInformation_Style.indexTitleText}>Thông báo</Text>
        <View style={ProfileScreen_Style.Setting_Style.switch}>
          <ToggleSwitch
            isOn={notification_isEnabled}
            onColor={COLORS.primary}
            offColor={COLORS.darkerBackground}
            label={notification_isEnabled ? "Bật" : "Tắt"}
            labelStyle={{ fontWeight: "400", fontSize: TYPOGRAPHY.baseFontSize }}
            size="medium"
            onToggle={notification_toggleSwitch}
            animationSpeed={100}
          />
        </View>
      </View>

      <View style={ProfileScreen_Style.Setting_Style.rowContainer}>
        <Text style={ProfileScreen_Style.PersonalInformation_Style.indexTitleText}>Chế độ tối</Text>
        <View style={ProfileScreen_Style.Setting_Style.switch}>
          <ToggleSwitch
            isOn={screenMode_isEnabled}
            onColor={COLORS.primary}
            offColor={COLORS.darkerBackground}
            label={screenMode_isEnabled ? "Bật" : "Tắt"}
            labelStyle={{ fontWeight: "400", fontSize: TYPOGRAPHY.baseFontSize }}
            size="medium"
            onToggle={screenMode_toggleSwitch}
            animationSpeed={100}
          />
        </View>
      </View>

    </View>
  );
};

// GIAO DIỆN CHÍNH: HỒ SƠ NGƯỜI DÙNG
const ProfileScreen = () => {
  const [] = useFonts({
    "Roboto-ExtraBold": require("@/assets/fonts/Roboto/static/Roboto-ExtraBold.ttf"),
    "Roboto-SemiBold": require("@/assets/fonts/Roboto/static/Roboto-SemiBold.ttf"),
  });

  const navigation = useNavigation<any>();

  const [backgroundImage, setBackgroundImage] = useState<string>(defaultBackgroundImage);
  const [avatarImage, setAvatarImage] = useState<string>(defaultAvatarImage);

  const [fullName, setFullName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [joinedDate, setJoinedDate] = useState<string>("");
  const getInfo = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      const response = await getUser(token);
      setFullName(response.data.fullName);
      setUsername(response.data.username);
      setRole(response.data.role);
      setEmail(response.data.email);
      setPhoneNumber(response.data.phone);
      setJoinedDate(moment(response.data.createdAt, 'YYYY-MM-DD').format('DD/MM/YYYY'));
    }
    catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  const isFocused = useIsFocused();
  useEffect(() => {
    getInfo();
  }, [isFocused]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("userId");
      await AsyncStorage.removeItem("username");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error removing token:", error);
    }
  }

  const handleUpdate = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      const userId = await AsyncStorage.getItem("userId");
      const response :any = await updateUser(token, userId, {fullName: fullName,email: email,phone: phoneNumber});

      if (response && response.status == 200) {
        alert("Cập nhật thông tin thành công!");
      }
      else {
        alert("Cập nhật thông tin thất bại!");
      }
    }
    catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  return (
    <View>
      {/* Header */}
      <Top_Header></Top_Header>

      {/* Nội dung trang */}
      <ScrollView
        style={{}}
        contentContainerStyle={ProfileScreen_Style.default.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Ảnh nền */}
        <TouchableOpacity style={ProfileScreen_Style.default.backgroundImageContainer}>
          <ImageBackground source={{ uri: backgroundImage }} style={ProfileScreen_Style.default.backgroundImageContainer} resizeMode="cover">
            <Text style={{ color: "white", textAlign: "center", marginTop: 145, fontWeight: "bold" }}>
              Chọn ảnh nền
            </Text>
          </ImageBackground>
        </TouchableOpacity>

        {/* Ảnh đại diện */}
        <TouchableOpacity style={ProfileScreen_Style.default.avatarImageContainer}>
          <Image source={{ uri: avatarImage }} style={ProfileScreen_Style.default.avatarImage} />
        </TouchableOpacity>

        {/* Tên người dùng + Vai trò */}
        <View style={ProfileScreen_Style.default.userInformationContainer}>
          <Text style={ProfileScreen_Style.default.userNameText}>{username}</Text>
          <Text style={ProfileScreen_Style.default.fullNameText}>{"(" + fullName + ")"}</Text>
          <Text style={[ProfileScreen_Style.default.userRoleText, { marginTop: 5 }]}>{role}</Text>
        </View>

        {/* Chi tiết trang */}
        <View style={ProfileScreen_Style.default.mainContentContainer}>
          <PersonalInformation
            data = {{fullName, username, role, email, phoneNumber, joinedDate}}
            setFullName={setFullName}
            setEmail={setEmail}
            setPhoneNumber={setPhoneNumber}
           />
          <Setting />
        </View>

        {/* Nút cập nhật thông tin */}
        <View style={ProfileScreen_Style.default.logoutButtonContainer}>
          <TouchableOpacity style={ProfileScreen_Style.default.logoutButton} onPress={() => handleUpdate()} >
            <Text style={ProfileScreen_Style.default.logoutButtonText}>Cập nhật thông tin</Text>
          </TouchableOpacity>
        </View>

        {/* Nút đăng xuất */}
        <View style={ProfileScreen_Style.default.logoutButtonContainer}>
          <TouchableOpacity style={ProfileScreen_Style.default.logoutButton} onPress={() => handleLogout()}>
            <Text style={ProfileScreen_Style.default.logoutButtonText}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>

  );
};

export default ProfileScreen;