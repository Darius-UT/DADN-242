import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import TextInputTemplate from "./TextInput";
import * as UserAddScreen_Style from "@/styles/screens/adminScreens/user_add/userAdd";
import globalStyle from "@/styles/global";
import Modal from "react-native-modal";
import { COLORS } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addDevice, updateUser } from "@/services/api.service";
import { ActivityIndicator } from "react-native-paper";


interface ModalTemplateProps {
    isVisible: boolean;
    setModalVisible: (visible: boolean) => void;
};

const ModalAddDevice: React.FC<ModalTemplateProps> = (props) => {
    const {isVisible, setModalVisible} =  props;
    const [isLoading, setIsLoading] = useState(false);
    const [deviceName, setDeviceName] = useState("");
    const [type, setType] = useState("");
    const [subType, setSubType] = useState("");
    const [zoneId, setZoneId] = useState("");
    const resetModal = () => {
        setDeviceName("");
        setType("");
        setSubType("");
        setZoneId("");
    }
    const handleAddDevice = async () => {
        try {
            setIsLoading(true);
            const token = await AsyncStorage.getItem('accessToken');
            const data = {
                deviceName: deviceName,
                type: type,
                subType: subType,
                zoneId: zoneId
            };
            const response:any = await addDevice(token,data);
            console.log(response);
            if (response && response.statusCode == 200) {
                alert("Thêm thiết bị thành công!");
                setModalVisible(false);
                resetModal();
            } 
            else if (response && response.message.includes("not found")) {
                alert("Khu vực không tồn tại!");
            }
            else {
                alert("Thêm thiết bị thất bại, vui lòng kiểm tra lại thông tin!");
            }
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setIsLoading(false);
        }
    }
    return (
        <Modal 
            isVisible={isVisible} 
            animationIn="zoomInUp" 
            animationOut="zoomOutDown" 
            backdropOpacity={0.6}
            // onBackdropPress={() => setModalVisible(false)}
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
                    subTitle="Tên thiết bị*"
                    placeHolder="Nhập tên thiết bị"
                    defaultValue={deviceName}
                    onChangeText={(text: string) => setDeviceName(text)}
                    />
                    <TextInputTemplate
                    subTitle="Type*"
                    placeHolder="Nhập type"
                    defaultValue={type}
                    onChangeText={(text: string) => setType(text)}
                    />
                    <TextInputTemplate
                    subTitle="SubType*"
                    placeHolder="Nhập subType"
                    defaultValue={subType}
                    onChangeText={(text: string) => setSubType(text)}
                    />
                    <TextInputTemplate
                    subTitle="Zone Id*"
                    placeHolder="Nhập Id khu vực"
                    defaultValue={zoneId}
                    onChangeText={(text: string) => setZoneId(text)}
                    />
                </View>

                <TouchableOpacity 
                    style={UserAddScreen_Style.default.confirmButtonContainer} 
                    onPress={() => handleAddDevice()}>
                    <Text style={UserAddScreen_Style.default.confirmButtonText}>Thêm thiết bị</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={UserAddScreen_Style.default.rejectButtonContainer} 
                    onPress={() => setModalVisible(false)}>
                    <Text style={UserAddScreen_Style.default.rejectButtonText}>Hủy</Text>
                </TouchableOpacity>
                </ScrollView>
            )}
            </Modal>
                );
};

export default ModalAddDevice;





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