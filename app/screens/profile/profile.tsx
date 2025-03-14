import React, { useState } from "react";
import { View, Text, Image, ImageBackground, ScrollView, SafeAreaView, Switch, TouchableOpacity } from "react-native";
import ToggleSwitch from 'toggle-switch-react-native';
import * as ProfileScreen_Style from "@/styles/screens/profile/profile";
import { useFonts } from "expo-font";
import { COLORS } from "@/constants/Colors";
import { TYPOGRAPHY } from "@/constants/Fonts";
import { Asset, ImageLibraryOptions, launchImageLibrary } from "react-native-image-picker";
import { useNavigation } from "expo-router";
import Top_Header from "@/components/common/Top_Header";



const UserName = "Nguyễn Lê Hoàng Phúc";
const UserRole = "Kỹ thuật viên";
const UserDOB = "12/12/2004";
const UserEmail = "Phuc.nguyenlehoang707@hcmut.edu.vn";
const UserPhoneNumber = "0766909533";
const UserJoinedDate = "14/03/2025";



// Thành phần 1: Thông tin cá nhân
const PersonalInformation = () => {
  const [] = useFonts({
    "Roboto-ExtraBold": require("@/assets/fonts/Roboto/static/Roboto-ExtraBold.ttf"),
    "Roboto-SemiBold": require("@/assets/fonts/Roboto/static/Roboto-SemiBold.ttf"),
  });

  const RowInformation = (indexTitle: string, indexContent: string) => {
    return (
      <View style={ProfileScreen_Style.PersonalInformation_Style.rowElement}>
        <Text style={ProfileScreen_Style.PersonalInformation_Style.indexTitleText}>{indexTitle}</Text>
        <Text style={ProfileScreen_Style.PersonalInformation_Style.indexContentText}>{indexContent}</Text>
      </View>
    );
  };

  return (
    <View style={ProfileScreen_Style.PersonalInformation_Style.container}>
      <Text style={ProfileScreen_Style.PersonalInformation_Style.titleText}>Hồ sơ cá nhân</Text>
      <View style={ProfileScreen_Style.PersonalInformation_Style.contentContainer}>
        {RowInformation("Họ và tên", `${UserName}`)}
        {RowInformation("Ngày sinh", `${UserDOB}`)}
        {RowInformation("Email", `${UserEmail}`)}
        {RowInformation("Số điện thoại", `${UserPhoneNumber}`)}
        {RowInformation("Chức vụ", `${UserRole}`)}
        {RowInformation("Ngày tham gia", `${UserJoinedDate}`)}
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

  const [backgroundImage, setBackgroundImage] = useState<string>("https://thuvienanime.net/wp-content/uploads/2024/10/muc-than-ky-thuvienanime-1.jpg");
  const [avatarImage, setAvatarImage] = useState<string>("https://thuvienanime.net/wp-content/uploads/2024/11/tu-ba-ba-tu-au-u-thuvienanime-9.jpg");

  // Hàm chọn ảnh
  const selectImage = (setImage: React.Dispatch<React.SetStateAction<string>>) => {
    const options: ImageLibraryOptions = {
      mediaType: "photo",
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.assets && response.assets.length > 0) {
        const selectedImage: Asset = response.assets[0]; // Lấy ảnh đầu tiên
        setImage(selectedImage.uri || ""); // Đảm bảo uri không bị undefined
      }
    });
  };

  return (
    <ScrollView
      style={ProfileScreen_Style.default.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <Top_Header></Top_Header>

      {/* Ảnh nền */}
      <TouchableOpacity style={ProfileScreen_Style.default.backgroundImageContainer} onPress={() => selectImage(setBackgroundImage)}>
        <ImageBackground source={{ uri: backgroundImage }} style={ProfileScreen_Style.default.backgroundImageContainer} resizeMode="cover">
          <Text style={{ color: "white", textAlign: "center", marginTop: 145, fontWeight: "bold" }}>
            Chọn ảnh nền
          </Text>
        </ImageBackground>
      </TouchableOpacity>

      {/* Ảnh đại diện */}
      <TouchableOpacity style={ProfileScreen_Style.default.avatarImageContainer} onPress={() => selectImage(setAvatarImage)}>
        <Image source={{ uri: avatarImage }} style={ProfileScreen_Style.default.avatarImage} />
      </TouchableOpacity>

      {/* Tên người dùng + Vai trò */}
      <View style={ProfileScreen_Style.default.userInformationContainer}>
        <Text style={ProfileScreen_Style.default.userNameText}>{UserName}</Text>
        <Text style={ProfileScreen_Style.default.userRoleText}>{UserRole}</Text>
      </View>

      {/* Chi tiết trang */}
      <View style={ProfileScreen_Style.default.mainContentContainer}>
        <PersonalInformation />
        <Setting />
      </View>

      {/* Nút đăng xuất */}
      <View style={ProfileScreen_Style.default.logoutButtonContainer}>
        <TouchableOpacity style={ProfileScreen_Style.default.logoutButton} onPress={() => navigation.navigate("Login")}>
          <Text style={ProfileScreen_Style.default.logoutButtonText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
};

export default ProfileScreen;