import { COLORS } from "@/constants/Colors";
import { TYPOGRAPHY } from "@/constants/Fonts";
import globalStyle from "@/styles/global";
import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import Modal from "react-native-modal";
import ToggleSwitch from "toggle-switch-react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Add_Circle, Cross_Symbol } from "../ui/IconSymbol";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import ModalAddRule from "./ModalAddRule";
import { getStatusDevice, updateStatusDevice } from "@/services/device.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";



const Rule_Data = [
    { id: "1", sensor: "A-T1", range: "[3, +inf)", action: "bật" },
    { id: "2", sensor: "A-L1", range: "[8000, 9000]", action: "tắt" },
    { id: "3", sensor: "A-L1", range: "(-inf, 8900]", action: "tắt" },
    { id: "4", sensor: "A-S1", range: "[3, +inf)", action: "bật" },
]






// COPONENT: Chế độ thủ công
const ManualModeArea: React.FC<{ selectedTab: 'manual' | 'auto'; setSelectedTab: React.Dispatch<React.SetStateAction<'manual' | 'auto'>> }> = ({ selectedTab, setSelectedTab }) => {
    const [isDateVisible, setDateVisible] = useState<boolean>(false);
    const [isTimeVisible, setTimeVisible] = useState<boolean>(false);

    const [myDate, setDate] = useState(new Date());
    const [myTime, setTime] = useState(new Date());

   

    return (
        <View style={[
            { opacity: 0.4 },
            selectedTab === 'manual' && { opacity: 1 },
        ]}>
            <View style={DeviceControlModal_Style.modeContainer}>
                
            </View>

        </View>
    );
};



interface deviceControlProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;

    deviceName: string;
    deviceSymbol: string;
    
};

// HÀM CHÍNH
const SensorModal: React.FC<deviceControlProps> = ({ visible, setVisible, deviceName, deviceSymbol }) => {
    
    const AlertWhenCancel = () => {
        Alert.alert(
            "Cảnh báo",
            "Thay đổi chưa được lưu. \nBạn có muốn ở lại?",
            [
                { text: "Thoát", style: "default", onPress: () => setVisible(false) },
                { text: "Trở lại", style: "cancel" },
            ],
            { cancelable: true }
        )
    };
    const [isEnable, setIsEnable] = useState<boolean>(true);
    const [selectedTab, setSelectedTab] = useState<'manual' | 'auto'>('manual');

    React.useEffect(() => {
        const getStatus = async () => {
            try {
                const token = await AsyncStorage.getItem('accessToken');
                if (!token) throw new Error('No token');

                const res = await getStatusDevice(token, deviceSymbol);
                console.log("getStatusDevice res:", res);
                if(res.data == "ENABLE") {
                    setIsEnable(true);
                }
                else if(res.data == "DISABLE") {
                    setIsEnable(false);
                }
            } catch (e) {
                console.log('getStatusDevice error:', e);
            }
        };
        getStatus();
    }
    , [deviceSymbol]);

    const handleSave = async () => {
        console.log("Saving...");
        
        try {
          const token = await AsyncStorage.getItem('accessToken');
          if (!token) throw new Error('No token');
    
          const res = await updateStatusDevice(token, isEnable, deviceSymbol);
        
            
          Toast.show({
            type: 'info',
            text1: 'Thành công',
            text2: 'Đã cập nhật trạng thái thiết bị.',
            visibilityTime: 2000,
            position: 'top',
          });
          setVisible(false);               // đóng modal sau khi lưu
        } catch (e) {
          Toast.show({
            type: 'info',
            text1: 'Lỗi',
            text2: 'Cập nhật thất bại!',
            visibilityTime: 2000,
            position: 'top',
          });
          console.log('updateStatusDevice error:', e);
        }
      };
    return (
        <Modal
            isVisible={visible}
            animationIn={"zoomInUp"}
            animationOut={"zoomOutDown"}
            backdropOpacity={0.6}
            onBackdropPress={() => setVisible(false)}
        >
            <View style={DeviceControlModal_Style.overallContainer}>
                {/* Header */}
                <View style={DeviceControlModal_Style.headerContainer}>
                    <Text style={DeviceControlModal_Style.headerText}>{deviceSymbol}</Text>
                    <Text style={[DeviceControlModal_Style.headerText]}>{deviceName}</Text>
                    <View>
                        <ToggleSwitch
                            isOn={isEnable}
                            onColor={COLORS.primary}
                            offColor={COLORS.darkerBackground}
                            label={isEnable ? "Bật" : "Tắt"}
                            labelStyle={{ fontWeight: "400", fontSize: TYPOGRAPHY.baseFontSize }}
                            size="medium"
                            onToggle={() => {
                                if (selectedTab === 'manual') {
                                    setIsEnable(!isEnable);
                                } else {
                                    Toast.show({
                                        type: 'info',
                                        text1: 'Cảnh báo',
                                        text2: 'Chức năng chỉ khả dụng khi ở chế độ thủ công.',
                                        visibilityTime: 2000,
                                        position: 'top',
                                    });
                                }
                            }}
                            animationSpeed={100}
                        />
                    </View>
                </View>

                {/* Khu vực chế độ thủ công */}
                <ManualModeArea selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

                

                {/* Nút THOÁT + SAVE */}
                <View style={DeviceControlModal_Style.cancel_save_button_container}>
                    <TouchableOpacity style={[DeviceControlModal_Style.buttonModeContainer, DeviceControlModal_Style.cancel_button_container]} onPress={() => AlertWhenCancel()}>
                        <Text style={[DeviceControlModal_Style.buttonModeText, { color: COLORS.textPrimary }]}>Thoát</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[DeviceControlModal_Style.buttonModeContainer, DeviceControlModal_Style.save_button_container]} onPress={handleSave}>
                        <Text style={DeviceControlModal_Style.buttonModeText}>Lưu</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Toast />
        </Modal>
    )
};

export default SensorModal




// CSS
const ManualModeArea_Style = StyleSheet.create({
    contentContainer: {

    },

    commonContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 5,
    },

    dateContainer: {
        alignItems: "center",
        justifyContent: "center",

        width: "48%",
        paddingVertical: 5,
        borderRadius: 10,

        backgroundColor: COLORS.lightSecondary,
        elevation: 5,
    },

    subTitleText: {
        fontFamily: "Roboto-SemiBold",
        opacity: 0.4,
        color: COLORS.textPrimary,
    },

    dateText: {
        paddingVertical: 15,
        textAlign: "center",

        color: COLORS.primary,
        fontFamily: "Roboto-SemiBold",
        fontSize: TYPOGRAPHY.subTitleFontSize,

    }
})

const AutoModeArea_Style = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 5,
        marginBottom: 5,
    },

    titleText: {
        fontFamily: "Roboto-SemiBold",
        fontSize: TYPOGRAPHY.subTitleFontSize - 3,
        margin: 5,
    },

    // Template_rule_card CSS
    overallContainer: {
        maxHeight: 200,
        padding: 10,
        backgroundColor: COLORS.lightSecondary,
        borderRadius: 10,
        elevation: 2,
        marginBottom: 10,
    },

    headerCardContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    content_rule_container: {
        marginLeft: 10,
        marginTop: 5,
    },

    content_rule_text: {

    }
})


const DeviceControlModal_Style = StyleSheet.create({
    overallContainer: {
        padding: globalStyle.mainPadding.padding,
        backgroundColor: COLORS.background,

        borderRadius: 10,
        gap: 10,
    },

    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    headerText: {
        fontFamily: "Roboto-SemiBold",
        fontSize: TYPOGRAPHY.subTitleFontSize - 2,
        color: COLORS.textPrimary,
    },


    buttonModeContainer: {
        width: "100%",
        paddingVertical: 11,
        backgroundColor: COLORS.secondary,
        justifyContent: "center",
        alignItems: "center",

        borderRadius: 100,
        marginTop: 10,
    },

    buttonModeText: {
        color: COLORS.white,
        fontFamily: "Roboto-SemiBold",
        fontSize: TYPOGRAPHY.subTitleFontSize - 3,
    },

    modeContainer: {
        alignItems: "center",
    },

    cancel_save_button_container: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
    },

    cancel_button_container: {
        width: "47%",
        backgroundColor: COLORS.background,
        borderWidth: 1,
        borderColor: COLORS.primary,
    },

    save_button_container: {
        width: "47%",
    }
})