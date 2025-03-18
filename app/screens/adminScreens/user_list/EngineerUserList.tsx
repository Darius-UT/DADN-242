import { useFonts } from "expo-font";
import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import * as EngineerUserList_Style from "@/styles/screens/adminScreens/user_list/engineerUserList";
import { Entypo } from "@expo/vector-icons";





const EngineerUserData = [
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
    {
        id: "3",
        userName: "Enin_tho",
        fullName: "Bé Đoản",
        sourceImage: "https://fagopet.vn/storage/in/r5/inr5f4qalj068szn2bs34qmv28r2_phoi-giong-meo-munchkin.webp"
    }
];




interface UserBoxTemplateProps {
    userName: string;
    fullName: string;
    sourceImage?: string;
}

export const UserBoxTemplate: React.FC<UserBoxTemplateProps> = ({ userName, fullName, sourceImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFgZ0Waa7MS6CB8D5IcsbPJMQhKiz1VsZL2w&s" }) => {
    const [] = useFonts({
        "Roboto-ExtraBold": require("@/assets/fonts/Roboto/static/Roboto-ExtraBold.ttf"),
        "Roboto-SemiBold": require("@/assets/fonts/Roboto/static/Roboto-SemiBold.ttf"),
    });

    return (
        <View style={EngineerUserList_Style.UserBoxTemplate_Style.container}>
            <View style={EngineerUserList_Style.UserBoxTemplate_Style.avatarContainer}>
                <Image
                    style={EngineerUserList_Style.UserBoxTemplate_Style.avatarImage}
                    source={{ uri: sourceImage }}
                />
            </View>
            <View style={EngineerUserList_Style.UserBoxTemplate_Style.nameContainer}>
                <Text
                    style={EngineerUserList_Style.UserBoxTemplate_Style.userNameText}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >{userName}</Text>
                <Text
                    style={EngineerUserList_Style.UserBoxTemplate_Style.fullNameText}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >{fullName}</Text>
            </View>
            <TouchableOpacity style={EngineerUserList_Style.UserBoxTemplate_Style.editButtonContainer}>
                <Text style={EngineerUserList_Style.UserBoxTemplate_Style.editButtonText}>Sửa</Text>
            </TouchableOpacity>
            <TouchableOpacity style={EngineerUserList_Style.UserBoxTemplate_Style.threeDotsContainer}>
                <Entypo name="dots-three-vertical" size={19} color="black" />
            </TouchableOpacity>
        </View>
    );
};



const EngineerUserList_Screen = () => {
    const [] = useFonts({
        "Roboto-ExtraBold": require("@/assets/fonts/Roboto/static/Roboto-ExtraBold.ttf"),
        "Roboto-SemiBold": require("@/assets/fonts/Roboto/static/Roboto-SemiBold.ttf"),
    });

    return (
        <ScrollView contentContainerStyle={EngineerUserList_Style.default.overallContainer}>
            {EngineerUserData.map((element) => (
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

export default EngineerUserList_Screen;