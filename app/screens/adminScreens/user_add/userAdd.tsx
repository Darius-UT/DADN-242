import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as UserAddScreen_Style from "@/styles/screens/adminScreens/user_add/userAdd";
import { useFonts } from "expo-font";
import TextInputTemplate from "@/components/common/TextInput";
import Top_Header_Admin from "@/components/common/Top_Header_Admin";





const UserAdd_Screen = () => {
    const [] = useFonts({
        "Roboto-ExtraBold": require("@/assets/fonts/Roboto/static/Roboto-ExtraBold.ttf"),
        "Roboto-SemiBold": require("@/assets/fonts/Roboto/static/Roboto-SemiBold.ttf"),
    });

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
                    />

                    <TextInputTemplate
                        subTitle="Tên tài khoản (User name)*"
                        placeHolder="Nhập tên tài khoản"
                    />

                    <TextInputTemplate
                        subTitle="Mật khẩu (Password)*"
                        placeHolder="Nhập mật khẩu"
                    // secureTextEntry = {true}
                    />

                    <TextInputTemplate
                        subTitle="Giới tính (Sex)*"
                        isDropDown={true}
                        placeHolder="Chọn giới tính"
                        dropdownOptions={[
                            { label: "Nam", value: "Nam" },
                            { label: "Nữ", value: "Nữ" },
                        ]}
                    />

                    <TextInputTemplate
                        subTitle="Vai trò (Role)*"
                        isDropDown={true}
                        placeHolder="Chọn vai trò"
                        dropdownOptions={[
                            { label: "Quản trị viên", value: "Quản trị viên" },
                            { label: "Kỹ thuật viên", value: "Kỹ thuật viên" },
                        ]}
                    />

                    <TextInputTemplate
                        subTitle="Số điện thoại (Phone number)*"
                        placeHolder="Nhập số điện thoại"
                    />

                    <TextInputTemplate
                        subTitle="Email*"
                        placeHolder="Nhập địa chỉ email"
                    />
                </View>

                <TouchableOpacity style={UserAddScreen_Style.default.confirmButtonContainer}>
                    <Text style={UserAddScreen_Style.default.confirmButtonText}>Xác nhận thêm mới</Text>
                </TouchableOpacity>

                <TouchableOpacity style={UserAddScreen_Style.default.rejectButtonContainer}>
                    <Text style={UserAddScreen_Style.default.rejectButtonText}>Hủy</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default UserAdd_Screen;