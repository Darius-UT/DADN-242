import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import TextInputTemplate from "./TextInput";
import * as UserAddScreen_Style from "@/styles/screens/adminScreens/user_add/userAdd";
import globalStyle from "@/styles/global";
import Modal from "react-native-modal";
import { COLORS } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addZone, updateUser } from "@/services/api.service";
import { ActivityIndicator } from "react-native-paper";


interface ModalTemplateProps {
    isVisible: boolean;
    setModalVisible: (visible: boolean) => void;
};

const ModalAddZone: React.FC<ModalTemplateProps> = (props) => {
    const {isVisible, setModalVisible} =  props;
    const [isLoading, setIsLoading] = useState(false);
    const handleAddZone = async () => {
        try {
            setIsLoading(true);
            const token = await AsyncStorage.getItem('accessToken');
            const data = {
                name: name,
            };
            const response:any = await addZone(token,data);
            console.log(response);
            if (response && response.statusCode == 201) {
                alert("Thêm khu vực thành công!");
                setModalVisible(false);
                resetModal();
            } 
            else if (response && response.message.includes("already exists")) {
                alert("Khu vực đã tồn tại!");
            }
            else {
                alert("Thêm khu vực thất bại, vui lòng kiểm tra lại thông tin!");
            }
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setIsLoading(false);
        }
    }
    const [name, setName] = useState("");
    const resetModal = () => {
        setName("");
    }


    return (
        <Modal 
            isVisible={isVisible} 
            animationIn="zoomInUp" 
            animationOut="zoomOutDown" 
            backdropOpacity={0.6}
            >
            {isLoading ? (
                <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={{ marginTop: 10 }}>Đang xử lý...</Text>
                </View>
            ) : (
                <ScrollView contentContainerStyle={ModalTemplate_Style.modalContainer}>
                <View style={UserAddScreen_Style.default.textInputContainer}>
                    <TextInputTemplate
                    subTitle="Tên khu vực*"
                    placeHolder="Nhập tên khu vực"
                    defaultValue={name}
                    onChangeText={(text: string) => setName(text)}
                    />
                </View>

                <TouchableOpacity 
                    style={UserAddScreen_Style.default.confirmButtonContainer} 
                    onPress={() => handleAddZone()} 
                    disabled={isLoading}
                >
                    <Text style={UserAddScreen_Style.default.confirmButtonText}>Thêm khu vực</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={UserAddScreen_Style.default.rejectButtonContainer} 
                    onPress={() => setModalVisible(false)}
                >
                    <Text style={UserAddScreen_Style.default.rejectButtonText}>Hủy</Text>
                </TouchableOpacity>
                </ScrollView>
            )}
        </Modal>

    );
};

export default ModalAddZone;





const ModalTemplate_Style = StyleSheet.create({
    modalContainer: {
        padding: globalStyle.mainPadding.padding + 10,
        backgroundColor: COLORS.background,
        borderRadius: 10,
        marginTop: 20,
    },
});

const styles = StyleSheet.create({
    loadingContainer: {
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });