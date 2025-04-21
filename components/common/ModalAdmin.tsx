import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import TextInputTemplate from "./TextInput";
import * as UserAddScreen_Style from "@/styles/screens/adminScreens/user_add/userAdd";
import globalStyle from "@/styles/global";
import Modal from "react-native-modal";
import { COLORS } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateUser } from "@/services/api.service";


interface ModalTemplateProps {
    isVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    id: string;
    setId: (text: string) => void;
    fullName: string;
    setFullName: (text: string) => void;
    username: string;
    setUsername: (text: string) => void;
    password: string;
    setPassword: (text: string) => void
    gender: string;
    setGender: (text: string) => void;
    role: string;
    setRole: (text: string) => void;
    phone: string;
    setPhone: (text: string) => void;
    email: string;
    setEmail: (text: string) => void;
};

const ModalTemplate: React.FC<ModalTemplateProps> = (props) => {
    const {isVisible, setModalVisible,id, setId, fullName, setFullName, username, setUsername, password, setPassword, gender, setGender, role, setRole, phone, setPhone, email, setEmail} =  props;
    const [isLoading, setIsLoading] = useState(false);
    const handleUpdateUser = async () => {
        const data = {
            fullName: fullName,
            username: username,
            password: password,
            gender: gender,
            role: role,
            phone: phone,
            email: email
        };
        const token = await AsyncStorage.getItem('accessToken');
        try {
            setIsLoading(true);
            const response:any = await updateUser(token,id,data);
            console.log(response);
            if (response && response.status == 200) {
                alert("Cập nhật người dùng thành công!");
                setModalVisible(false);
            } else {
                alert("Cập nhật người dùng thất bại, vui lòng kiểm tra lại thông tin!");
            }
        } catch (error) {
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
            <ScrollView contentContainerStyle={ModalTemplate_Style.modalContainer}>
                <View style={UserAddScreen_Style.default.textInputContainer}>
                <TextInputTemplate
                        subTitle="Họ tên đầy đủ (Full name)*"
                        placeHolder="Nhập họ tên đầy đủ"
                        defaultValue={fullName}
                        onChangeText={(text: string) => setFullName(text)}
                    />

                    <TextInputTemplate
                        subTitle="Tên tài khoản (User name)*"
                        placeHolder="Nhập tên tài khoản"
                        defaultValue={username}
                        onChangeText={(text: string) => setUsername(text)}
                    />

                    <TextInputTemplate
                        subTitle="Mật khẩu (Password)*"
                        placeHolder="Nhập mật khẩu"
                        secureTextEntry = {true}
                        defaultValue=""
                        onChangeText={(text: string) => setPassword(text)}
                    />

                    <TextInputTemplate
                        subTitle="Giới tính (Gender)*"
                        placeHolder="Nhập giới tính"
                        defaultValue={gender}
                        onChangeText={(text: string) => setGender(text)}
                    />

                    <TextInputTemplate
                        subTitle="Vai trò (Role)*"
                        placeHolder="Nhập giới tính"
                        defaultValue={role}
                        onChangeText={(text: string) => setRole(text)}
                    />

                    <TextInputTemplate
                        subTitle="Số điện thoại (Phone number)*"
                        placeHolder="Nhập số điện thoại"
                        defaultValue={phone}
                        onChangeText={(text: string) => setPhone(text)}
                    />

                    <TextInputTemplate
                        subTitle="Email*"
                        placeHolder="Nhập địa chỉ email"
                        defaultValue={email}
                        onChangeText={(text: string) => setEmail(text)}
                    />
                </View>

                <TouchableOpacity style={UserAddScreen_Style.default.confirmButtonContainer} onPress={() => handleUpdateUser()} disabled={isLoading}>
                    <Text style={UserAddScreen_Style.default.confirmButtonText}>Cập nhật</Text>
                </TouchableOpacity>

                <TouchableOpacity style={UserAddScreen_Style.default.rejectButtonContainer} onPress={() => setModalVisible(false)}>
                    <Text style={UserAddScreen_Style.default.rejectButtonText}>Hủy</Text>
                </TouchableOpacity>
            </ScrollView>
        </Modal>
    );
};

export default ModalTemplate;





const ModalTemplate_Style = StyleSheet.create({
    modalContainer: {
        padding: globalStyle.mainPadding.padding + 10,
        backgroundColor: COLORS.background,
        borderRadius: 10,
        marginTop: 20,
    },
});