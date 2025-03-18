import { useFonts } from "expo-font";
import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, Modal } from "react-native";
import * as EngineerUserList_Style from "@/styles/screens/adminScreens/user_list/engineerUserList";
import { Entypo } from "@expo/vector-icons";
import ModalTemplate from "@/components/common/ModalAdmin";
import DeleteOverlay from "@/components/common/DeleteOverlay";



// Dữ liệu người dùng
const EngineerUserData = [
    {
        id: "1",
        userName: "Huangfu_1204",
        fullName: "Nguyễn Lê Hoàng Phúc Bành Thị Trương Thây",
        // ảnh đại diện
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
    },
    {
        id: "4",
        userName: "Enin_tho",
        fullName: "Bé Đoản",
        sourceImage: "https://fagopet.vn/storage/in/r5/inr5f4qalj068szn2bs34qmv28r2_phoi-giong-meo-munchkin.webp"
    },
    {
        id: "5",
        userName: "Enin_tho",
        fullName: "Bé Đoản",
        sourceImage: "https://png.pngtree.com/png-vector/20240805/ourmid/pngtree-design-and-colors-of-the-vietnamese-flag-png-image_13386209.png"
    },
    {
        id: "6",
        userName: "Enin_tho",
        fullName: "Bé Đoản",
        sourceImage: "https://fagopet.vn/storage/in/r5/inr5f4qalj068szn2bs34qmv28r2_phoi-giong-meo-munchkin.webp"
    },
    {
        id: "7",
        userName: "Enin_tho",
        fullName: "Bé Đoản",
        sourceImage: "https://png.pngtree.com/png-vector/20240805/ourmid/pngtree-design-and-colors-of-the-vietnamese-flag-png-image_13386209.png"
    },
    {
        id: "8",
        userName: "Enin_tho",
        fullName: "Bé Đoản",
        sourceImage: "https://fagopet.vn/storage/in/r5/inr5f4qalj068szn2bs34qmv28r2_phoi-giong-meo-munchkin.webp"
    },
    {
        id: "9",
        userName: "Enin_tho",
        fullName: "Bé Đoản",
        sourceImage: "https://fagopet.vn/storage/in/r5/inr5f4qalj068szn2bs34qmv28r2_phoi-giong-meo-munchkin.webp"
    },
    {
        id: "10",
        userName: "Enin_tho",
        fullName: "Bé Đoản",
        sourceImage: "https://fagopet.vn/storage/in/r5/inr5f4qalj068szn2bs34qmv28r2_phoi-giong-meo-munchkin.webp"
    },
    {
        id: "11",
        userName: "Enin_tho",
        fullName: "Bé Đoản",
        sourceImage: "https://fagopet.vn/storage/in/r5/inr5f4qalj068szn2bs34qmv28r2_phoi-giong-meo-munchkin.webp"
    },
];



// Cấu trúc user dạng thẻ: dùng cho Kỹ thuật viên + Quản trị viên
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

    const [isVisible, setModalVisible] = useState(false);
    const [openOverlay, setOverlayOpen] = useState(false);
    const buttonRef = useRef<View>(null); // Tham chiếu đến nút bấm
    const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

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
                >{userName}</Text>
                <Text
                    style={EngineerUserList_Style.UserBoxTemplate_Style.fullNameText}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >{fullName}</Text>
            </View>
            <TouchableOpacity style={EngineerUserList_Style.UserBoxTemplate_Style.editButtonContainer} onPress={() => setModalVisible(true)}>
                <Text style={EngineerUserList_Style.UserBoxTemplate_Style.editButtonText}>Sửa</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={EngineerUserList_Style.UserBoxTemplate_Style.threeDotsContainer}
                onPress={handlePress}
                ref={buttonRef}
            >
                <Entypo name="dots-three-vertical" size={19} color="black" />
            </TouchableOpacity>

            {/* Modal -> Chỉnh sửa thông tin */}
            <ModalTemplate isVisible={isVisible} setModalVisible={setModalVisible} />

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

    return (
        <ScrollView
            contentContainerStyle={EngineerUserList_Style.default.overallContainer}
            showsVerticalScrollIndicator={false}
        >
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