import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import TextInputTemplate from "./TextInput";
import * as UserAddScreen_Style from "@/styles/screens/adminScreens/user_add/userAdd";
import globalStyle from "@/styles/global";
import Modal from "react-native-modal";
import { COLORS } from "@/constants/Colors";


interface ModalTemplateProps {
    isVisible: boolean;
    setModalVisible: (visible: boolean) => void;
};

const ModalTemplate: React.FC<ModalTemplateProps> = ({ isVisible, setModalVisible }) => {
    return (
        <Modal 
        isVisible={isVisible} 
        animationIn="zoomInUp" 
        animationOut="zoomOutDown" 
        backdropOpacity={0.6} 
        onBackdropPress={() => setModalVisible(false)}>
            <ScrollView contentContainerStyle={ModalTemplate_Style.modalContainer}>
                <View style={UserAddScreen_Style.default.textInputContainer}>
                    <TextInputTemplate
                        subTitle="Họ tên đầy đủ (Full name)*"
                        placeHolder="Nhập họ tên đầy đủ"
                    />

                    <TextInputTemplate
                        subTitle="Tên tài khoản (User name)*"
                        placeHolder="Nhập tên tài khoản"
                    />

                    <TextInputTemplate
                        subTitle="Mật khẩu (Password)*"
                        placeHolder="Nhập mật khẩu"
                    // secureTextEntry = {true}
                    />

                    <TextInputTemplate
                        subTitle="Giới tính (Sex)*"
                        isDropDown={true}
                        placeHolder="Chọn giới tính"
                        dropdownOptions={[
                            { label: "Nam", value: "Nam" },
                            { label: "Nữ", value: "Nữ" },
                        ]}
                    />

                    <TextInputTemplate
                        subTitle="Vai trò (Role)*"
                        isDropDown={true}
                        placeHolder="Chọn vai trò"
                        dropdownOptions={[
                            { label: "Quản trị viên", value: "Quản trị viên" },
                            { label: "Kỹ thuật viên", value: "Kỹ thuật viên" },
                        ]}
                    />

                    <TextInputTemplate
                        subTitle="Số điện thoại (Phone number)*"
                        placeHolder="Nhập số điện thoại"
                    />

                    <TextInputTemplate
                        subTitle="Email*"
                        placeHolder="Nhập địa chỉ email"
                    />
                </View>

                <TouchableOpacity style={UserAddScreen_Style.default.confirmButtonContainer} onPress={() => setModalVisible(false)}>
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