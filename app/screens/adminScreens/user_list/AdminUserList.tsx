import { useFonts } from "expo-font";
import React, { useCallback } from "react";
import { ScrollView } from "react-native";
import { UserBoxTemplate } from "./EngineerUserList";
import * as AdminUserList_Style from "@/styles/screens/adminScreens/user_list/adminUserList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserByRole } from "@/services/api.service";
import { useFocusEffect } from "@react-navigation/native";
import { useIsFocused } from '@react-navigation/native';


const AdminUserList_Screen = () => {
    const [] = useFonts({
        "Roboto-ExtraBold": require("@/assets/fonts/Roboto/static/Roboto-ExtraBold.ttf"),
        "Roboto-SemiBold": require("@/assets/fonts/Roboto/static/Roboto-SemiBold.ttf"),
    });
    const [data, setData] = React.useState([]);
    const handleGetUser = async () => {
        try{
            const token = await AsyncStorage.getItem('accessToken');
            const response:any = await getUserByRole(token, "Admin");
            if (response && response.statusCode == 200) {
                setData(response.data);
            }
            else {
                alert("Lỗi lấy danh sách người dùng!");
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    const isFocused = useIsFocused(); // Sử dụng useIsFocused để kiểm

    useFocusEffect(
        useCallback(() => {
            handleGetUser();
        }, [isFocused])
    );

    return (
        <ScrollView contentContainerStyle={AdminUserList_Style.default.overallContainer}>
            {data.map((element:any) => (
                <UserBoxTemplate
                    key={element.id}
                    userNameUser={element.username}
                    fullNameUser={element.fullName}
                    sourceImage={element.sourceImage ?? undefined}
                    dataElement={element} // Truyền dữ liệu người dùng vào UserBoxTemplate
                />
            ))}
        </ScrollView>
    );
};

export default AdminUserList_Screen;