import { useFonts } from "expo-font";
import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { UserBoxTemplate } from "./EngineerUserList";
import * as AdminUserList_Style from "@/styles/screens/adminScreens/user_list/adminUserList";




const AdminUserData = [
    {
        id: "1",
        userName: "Huangfu_1204",
        fullName: "Nguyễn Lê Hoàng Phúc Bành Thị Trương Thây",
        sourceImage: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/03/anh-meme-hai.jpg"
    },
    {
        id: "2",
        userName: "KungfuPanda",
        fullName: "Đinh Thị Ngọc Trân",
        sourceImage: null, // Không có ảnh, sẽ dùng ảnh mặc định
    },
];





const AdminUserList_Screen = () => {
    const [] = useFonts({
        "Roboto-ExtraBold": require("@/assets/fonts/Roboto/static/Roboto-ExtraBold.ttf"),
        "Roboto-SemiBold": require("@/assets/fonts/Roboto/static/Roboto-SemiBold.ttf"),
    });

    return (
        <ScrollView contentContainerStyle={AdminUserList_Style.default.overallContainer}>
            {AdminUserData.map((element) => (
                <UserBoxTemplate
                    key={element.id}
                    userName={element.userName}
                    fullName={element.fullName}
                    sourceImage={element.sourceImage ?? undefined}
                />
            ))}
        </ScrollView>
    );
};

export default AdminUserList_Screen;