import { COLORS } from "@/constants/Colors";
import { TYPOGRAPHY } from "@/constants/Fonts";
import { deleteUser } from "@/services/api.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { StyleSheet, TouchableOpacity, View, Text, Alert } from "react-native";
import Modal from "react-native-modal";



interface DeleteOverlayProps {
    openOverlay: boolean;
    setOverlayOpen: (openOverlay: boolean) => void;
    position: { x: number; y: number };  // Nhận vị trí để đặt modal
    id: string;
};


const DeleteOverlay: React.FC<DeleteOverlayProps> = ({ openOverlay, setOverlayOpen, position, id}) => {
    const handleDelete = async () => {
        try {
            const token = await AsyncStorage.getItem('accessToken');
            const response:any = await deleteUser(token, id);
            if (response && response.status == 200) {
                alert("Xóa người dùng thành công!");
            }
            else {
                alert("Lỗi xóa người dùng!");
            }
        }
        catch (error) {
            console.error(error);
        }
        // Đóng overlay sau khi xóa
        setOverlayOpen(false);
    }
    return (
        <Modal
            isVisible={openOverlay}
            animationIn={"bounceIn"}
            animationOut={"bounceOut"}
            backdropOpacity={0}
            onBackdropPress={() => setOverlayOpen(false)}
            style={{
                margin: 0
            }}
        >
            <View style={[DeleteOverlay_Style.overallContainer, {
                    position: 'absolute',
                    top: position.y - (position.y * 0.3), // thêm khoảng cách nếu muốn
                    left: position.x - (position.x * 0.6),
            }]}>
                <TouchableOpacity style={DeleteOverlay_Style.deleteButton} onPress={() => handleDelete()}>
                    <Text style={DeleteOverlay_Style.deleteButtonText}>Xóa</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

export default DeleteOverlay;




const DeleteOverlay_Style = StyleSheet.create({
    overallContainer: {
        width: 200,
        backgroundColor: COLORS.darkerBackground,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
    },

    inActiveButton: {
        width: "100%",
        height: 40,
        alignItems: "center",
        justifyContent: "center",
    },

    inActiveButtonText: {
        fontSize: TYPOGRAPHY.buttonFontSize,
    },

    deleteButton: {
        width: "100%",
        height: 40,
        alignItems: "center",
        justifyContent: "center",
    },

    deleteButtonText: {
        fontSize: TYPOGRAPHY.buttonFontSize,
        color: COLORS.Red,
    },
});