import { useFonts } from "expo-font";
import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, Modal } from "react-native";
import * as EngineerUserList_Style from "@/styles/screens/adminScreens/user_list/engineerUserList";
import { Entypo } from "@expo/vector-icons";
import ModalTemplate from "@/components/common/ModalAdmin";
import DeleteOverlay from "@/components/common/DeleteOverlay";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserByRole } from "@/services/api.service";



// Cấu trúc user dạng thẻ: dùng cho Kỹ thuật viên + Quản trị viên
interface UserBoxTemplateProps {
    userNameUser: string;
    fullNameUser: string;
    sourceImage?: string;
    dataElement?: any; // Tham số bổ sung nếu cần
}

export const UserBoxTemplate: React.FC<UserBoxTemplateProps> = ({ userNameUser, fullNameUser, sourceImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFgZ0Waa7MS6CB8D5IcsbPJMQhKiz1VsZL2w&s", dataElement }) => {
    const [] = useFonts({
        "Roboto-ExtraBold": require("@/assets/fonts/Roboto/static/Roboto-ExtraBold.ttf"),
        "Roboto-SemiBold": require("@/assets/fonts/Roboto/static/Roboto-SemiBold.ttf"),
    });

    const [isVisible, setModalVisible] = useState(false);
    const [openOverlay, setOverlayOpen] = useState(false);
    const buttonRef = useRef<View>(null); // Tham chiếu đến nút bấm
    const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

    const [isLoading, setIsLoading] = useState(false);
    const [id, setId] = useState(dataElement?.id || "");
    const [fullName, setFullName] = React.useState(dataElement?.fullName || "");
    const [username, setUsername] = React.useState(dataElement?.username || "");
    const [password, setPassword] = React.useState(dataElement?.password || "");
    const [gender, setGender] = React.useState(dataElement?.gender || "");
    const [role, setRole] = React.useState(dataElement?.role || "");
    const [phone, setPhone] = React.useState(dataElement?.phone || "");
    const [email, setEmail] = React.useState(dataElement?.email || "");

    const handlePress = () => {
        if (buttonRef.current) {
            buttonRef.current.measure((fx, fy, width, height, px, py) => {
                setPosition({ x: px, y: py });
                setOverlayOpen(true);
            });
        }
    };

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
                >{userNameUser}</Text>
                <Text
                    style={EngineerUserList_Style.UserBoxTemplate_Style.fullNameText}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >{fullNameUser}</Text>
            </View>
            <TouchableOpacity style={EngineerUserList_Style.UserBoxTemplate_Style.editButtonContainer} onPress={() =>setModalVisible(true)}>
                <Text style={EngineerUserList_Style.UserBoxTemplate_Style.editButtonText}>Sửa</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={EngineerUserList_Style.UserBoxTemplate_Style.threeDotsContainer}
                onPress={() =>handlePress()}
                ref={buttonRef}
            >
                <Entypo name="dots-three-vertical" size={19} color="black" />
            </TouchableOpacity>

            {/* Modal -> Chỉnh sửa thông tin */}
            <ModalTemplate 
            isVisible={isVisible} 
            setModalVisible={setModalVisible}
            id={id}
            setId={setId}
            fullName={fullName}
            setFullName={setFullName}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            gender={gender}
            setGender={setGender}
            role={role}
            setRole={setRole}
            phone={phone}
            setPhone={setPhone}
            email={email}
            setEmail={setEmail}
             />

            {/* Overlay -> Tùy chọn: Xóa, vô hiệu hóa */}
            <DeleteOverlay openOverlay={openOverlay} setOverlayOpen={setOverlayOpen} position={position} />
        </View>
    );
};


// Giao diện chính
const EngineerUserList_Screen = () => {
    const [] = useFonts({
        "Roboto-ExtraBold": require("@/assets/fonts/Roboto/static/Roboto-ExtraBold.ttf"),
        "Roboto-SemiBold": require("@/assets/fonts/Roboto/static/Roboto-SemiBold.ttf"),
    });

    const [data, setData] = React.useState([]);


    const handleGetUser = async () => {
        try{
            const token = await AsyncStorage.getItem('accessToken');
            const response:any = await getUserByRole(token, "Technician");
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

    React.useEffect(() => {
        handleGetUser();
    }, []);

    return (
        <ScrollView
            contentContainerStyle={EngineerUserList_Style.default.overallContainer}
            showsVerticalScrollIndicator={false}
        >
            {data.map((element:any) => (
                <UserBoxTemplate
                    key={element.id}
                    userNameUser={element.username}
                    fullNameUser={element.fullName}
                    sourceImage={element.sourceImage ?? undefined}
                    dataElement={element}
                />
            ))}
        </ScrollView>
    );
};

export default EngineerUserList_Screen;