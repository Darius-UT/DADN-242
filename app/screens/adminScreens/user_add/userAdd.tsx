import Top_Header from "@/components/common/Top_Header";
import React from "react";
import { View, Text } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import * as UserAddScreen_Style from "@/styles/screens/adminScreens/user_add/userAdd";
import { useFonts } from "expo-font";
import TextInputTemplate from "@/components/common/TextInput";





const UserAdd_Screen = () => {
    const [] = useFonts({
        "Roboto-ExtraBold": require("@/assets/fonts/Roboto/static/Roboto-ExtraBold.ttf"),
        "Roboto-SemiBold": require("@/assets/fonts/Roboto/static/Roboto-SemiBold.ttf"),
    });

    return (
        <View>
            {/* Top - header */}
            <Top_Header></Top_Header>

            {/* Giao diện chính */}
            <ScrollView contentContainerStyle={UserAddScreen_Style.default.overallContainer}>
                <View style={UserAddScreen_Style.default.titleContainer}>
                    <Text style={UserAddScreen_Style.default.titleText}>Thêm mới người dùng</Text>
                </View>

                <View>
                    <TextInputTemplate ></TextInputTemplate>
                </View>
            </ScrollView>
        </View>
    );
};

export default UserAdd_Screen;