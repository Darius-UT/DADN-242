import { COLORS } from "@/constants/Colors";
import { TYPOGRAPHY } from "@/constants/Fonts";
import React from "react";
import { StyleSheet, TouchableOpacity, View, Text, Alert } from "react-native";
import Modal from "react-native-modal";



interface DeleteOverlayProps {
    openOverlay: boolean;
    setOverlayOpen: (openOverlay: boolean) => void;
    position: { x: number; y: number };  // Nhận vị trí để đặt modal
};


const DeleteOverlay: React.FC<DeleteOverlayProps> = ({ openOverlay, setOverlayOpen, position }) => {
    const AlertWhenDelete = () => {
        Alert.alert(
            "Xác nhận",
            "Bạn có chắc chắn muốn xóa?",
            [
                { text: "Hủy", style: "cancel" },
                { text: "Xóa", style: "destructive"},
            ],
            { cancelable: true }
        )
    };

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
                <TouchableOpacity style={DeleteOverlay_Style.inActiveButton} onPress={() => setOverlayOpen(false)}>
                    <Text style={DeleteOverlay_Style.inActiveButtonText}>Vô hiệu hóa</Text>
                </TouchableOpacity>
                <TouchableOpacity style={DeleteOverlay_Style.deleteButton} onPress={() => { AlertWhenDelete(), setOverlayOpen(false); }}>
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