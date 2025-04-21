import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as UserAddScreen_Style from "@/styles/screens/adminScreens/user_add/userAdd";
import { useFonts } from "expo-font";
import TextInputTemplate from "@/components/common/TextInput";
import { addUser } from "@/services/api.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Top_Header_Admin from "@/components/common/Top_Header_Admin";





const UserAdd_Screen = () => {
    const [] = useFonts({
        "Roboto-ExtraBold": require("@/assets/fonts/Roboto/static/Roboto-ExtraBold.ttf"),
        "Roboto-SemiBold": require("@/assets/fonts/Roboto/static/Roboto-SemiBold.ttf"),
    });

    const [fullName, setFullName] = React.useState("");
    const [userName, setUserName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [gender, setGender] = React.useState("");
    const [role, setRole] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [showHintRole, setShowHintRole] = React.useState(false);
    const [showHintGender, setShowHintGender] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const handleAddUser = async () => {
        const data = {
            fullName: fullName,
            username: userName,
            password: password,
            gender: gender,
            role: role,
            phoneNumber: phoneNumber,
            email: email
        };
        const token = await AsyncStorage.getItem('accessToken');
        try {
            setIsLoading(true);
            const response:any = await addUser(token, data);
            console.log(response);
            if (response && response.status == 201) {
                alert("Thêm mới người dùng thành công!");
            } else {
                if (response.message == "Username already exists!") {
                    alert("Tên tài khoản đã tồn tại!");
                    return;
                }
                alert("Thêm mới người dùng thất bại, vui lòng kiểm tra lại thông tin!");
            }
        } catch (error) {
            console.error(error);
        }
        finally {
            setIsLoading(false);
        }
    }
    return (
        <View>
            {/* Top - header */}
            <Top_Header_Admin />

            {/* Giao diện chính */}
            <ScrollView
                style={{ paddingBottom: 10, marginBottom: 50, }}
                contentContainerStyle={UserAddScreen_Style.default.overallContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={UserAddScreen_Style.default.titleContainer}>
                    <Text style={UserAddScreen_Style.default.titleText}>Thêm mới người dùng</Text>
                </View>

                <View style={UserAddScreen_Style.default.textInputContainer}>
                    <TextInputTemplate
                        subTitle="Họ tên đầy đủ (Full name)*"
                        placeHolder="Nhập họ tên đầy đủ"
                        onChangeText={(text: string) => setFullName(text)}
                    />

                    <TextInputTemplate
                        subTitle="Tên tài khoản (User name)*"
                        placeHolder="Nhập tên tài khoản"
                        onChangeText={(text: string) => setUserName(text)}
                    />

                    <TextInputTemplate
                        subTitle="Mật khẩu (Password)*"
                        placeHolder="Nhập mật khẩu"
                        secureTextEntry = {true}
                        onChangeText={(text: string) => setPassword(text)}
                    />

                    <TextInputTemplate
                        subTitle="Giới tính (Gender)*"
                        placeHolder="Nhập giới tính"
                        onFocus={() => setShowHintGender(true)}         // 👈 Bắt sự kiện focus
                        onBlur={() => setShowHintGender(false)}         // 👈 Ẩn khi blur (tùy chọn)
                        onChangeText={(text: string) => setGender(text)}
                        />
                        {showHintGender && (
                        <Text style={{ color: 'gray', fontSize: 12, marginTop: 4 }}>
                            Nhập "M" nếu là nam
                            {"\n"}Nhập "F" nếu là nữ
                        </Text>
                    )}

                    <TextInputTemplate
                        subTitle="Vai trò (Role)*"
                        placeHolder="Nhập giới tính"
                        onFocus={() => setShowHintRole(true)}         // 👈 Bắt sự kiện focus
                        onBlur={() => setShowHintRole(false)}         // 👈 Ẩn khi blur (tùy chọn)
                        onChangeText={(text: string) => setRole(text)}
                        />
                        {showHintRole && (
                        <Text style={{ color: 'gray', fontSize: 12, marginTop: 4 }}>
                            Nhập "Admin" nếu muốn tạo tài khoản quản trị viên
                            {"\n"}Nhập "User" nếu muốn tạo tài khoản người dùng
                        </Text>
                    )}

                    <TextInputTemplate
                        subTitle="Số điện thoại (Phone number)*"
                        placeHolder="Nhập số điện thoại"
                        onChangeText={(text: string) => setPhoneNumber(text)}
                    />

                    <TextInputTemplate
                        subTitle="Email*"
                        placeHolder="Nhập địa chỉ email"
                        onChangeText={(text: string) => setEmail(text)}
                    />
                </View>

                <TouchableOpacity 
                style={UserAddScreen_Style.default.confirmButtonContainer}
                onPress={() => handleAddUser()}
                disabled={isLoading} // Disable button when loading
                >
                    <Text style={UserAddScreen_Style.default.confirmButtonText}>Xác nhận thêm mới</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default UserAdd_Screen;