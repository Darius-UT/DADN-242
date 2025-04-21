import { COLORS } from "@/constants/Colors";
import { TYPOGRAPHY } from "@/constants/Fonts";
import globalStyle from "@/styles/global";
import React, { useEffect, useState } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getRulesAndConditionRulesByAction } from "@/services/api.service";



const Rule_Data = [
    { id: "1", sensor: "A-T1", range: "[3, +inf)", action: "bật" },
    { id: "2", sensor: "A-L1", range: "[8000, 9000]", action: "tắt" },
    { id: "3", sensor: "A-L1", range: "(-inf, 8900]", action: "tắt" },
    { id: "4", sensor: "A-S1", range: "[3, +inf)", action: "bật" },
]

// {
//     "statusCode": 200,
//     "error": null,
//     "message": "CALL API SUCCESS",
//     "data": [
//         {
//             "id": 1,
//             "action": "pump-1/on",
//             "feedName": "light-1",
//             "userId": 3,
//             "conditionRuleResponses": [
//                 {
//                     "id": 1,
//                     "name": "testrule",
//                     "minValue": "9999",
//                     "maxValue": "9999",
//                     "startDate": "2025-04-21T16:34:20.152",
//                     "endDate": "2025-04-21T16:34:20.152"
//                 }
//             ]
//         },
//         {
//             "id": 3,
//             "action": "pump-1/off",
//             "feedName": "airm-1",
//             "userId": 3,
//             "conditionRuleResponses": [
//                 {
//                     "id": 3,
//                     "name": "testrule",
//                     "minValue": "9999",
//                     "maxValue": "9999",
//                     "startDate": "1899-12-30T17:17:56",
//                     "endDate": "1899-12-31T17:17:55"
//                 }
//             ]
//         }
//     ]
// }






// COPONENT: Chế độ thủ công
const ManualModeArea: React.FC<{ selectedTab: 'manual' | 'auto'; setSelectedTab: React.Dispatch<React.SetStateAction<'manual' | 'auto'>> }> = ({ selectedTab, setSelectedTab }) => {
    const [isDateVisible, setDateVisible] = useState<boolean>(false);
    const [isTimeVisible, setTimeVisible] = useState<boolean>(false);

    const [myDate, setDate] = useState(new Date());
    const [myTime, setTime] = useState(new Date());

    const AlertWhenToggleMode = () => {
        Alert.alert(
            "Xác nhận",
            "Khi chuyển sang chế độ thủ công, các thiết lập trong chế độ tự động sẽ tạm thời bị vô hiệu hóa.\n\nBạn vẫn muốn chuyển?",
            [
                { text: "Hủy", style: "cancel" },
                { text: "Chuyển", style: "default", onPress: () => setSelectedTab('manual') }
            ]
        );
    };

    return (
        <View style={[
            { opacity: 0.4 },
            selectedTab === 'manual' && { opacity: 1 },
        ]}>
            <View style={DeviceControlModal_Style.modeContainer}>
                <TouchableOpacity style={DeviceControlModal_Style.buttonModeContainer} onPress={()=>setSelectedTab('manual')} >
                    <Text style={DeviceControlModal_Style.buttonModeText}>Chế độ thủ công</Text>
                </TouchableOpacity>
            </View>

            {selectedTab === 'manual' &&
                <View style={ManualModeArea_Style.contentContainer}>
                    
                </View>
            }
        </View>
    );
};


// COPONENT: Chế độ tự động
const AutoModeArea:
    React.FC<{
        selectedTab: 'manual' | 'auto';
        setSelectedTab: React.Dispatch<React.SetStateAction<'manual' | 'auto'>>;
        deviceName: string,
        deviceSymbol: string
        sensorList: any
    }> = ({
        selectedTab,
        setSelectedTab,
        deviceName,
        deviceSymbol,
        sensorList
    }) => {
        
        const [add_rule_modal_visible, set_add_rule_modal_visible] = useState<boolean>(false);
    const [Rule_Data, setRule_Data] = useState<any[]>([]); // State for API data
    const [error, setError] = useState<string | null>(null);

    const transformRuleData = (rulesArray: any) => {
        return rulesArray.map((rule: any) => {
            const condition = rule.conditionRuleResponses[0];
            const min = parseFloat(condition.minValue);
            const max = parseFloat(condition.maxValue);
    
            const rangeStart = min <= -9999 ? '(-inf, ' : `[${min}, `;
            const rangeEnd = max >= 9999 ? '+inf)' : `${max}]`;
            const range = rangeStart + rangeEnd;
    
            const actionType = rule.action.split('/')[1];
            const actionMapped = actionType === 'on' ? 'bật' : actionType === 'off' ? 'tắt' : 'unknown';
    
            return {
                id: rule.id.toString(),
                sensor: rule.feedName,
                range: range,
                action: actionMapped,
            };
        });
    };

    // Fetch rules from API when component mounts or deviceSymbol changes
    useEffect(() => {
        const fetchRules = async () => {
            try {
                const token = await AsyncStorage.getItem('accessToken');
                if (!token) {
                    setError('No token found. Please log in.');
                    return;
                }

                const response = await getRulesAndConditionRulesByAction(token, deviceSymbol);
                console.log('API response:', response.data); // Log the entire response for debugging
                const rulesArray = response.data; // Extract the rules array

                console.log('Rules array:', rulesArray); // Log the rules array for debugging

                const transformedData = transformRuleData(rulesArray);
                setError(null);
            } catch (err: any) {
                console.error('Error fetching rules:', err);
                if (err.response?.status === 404) {
                    setError('No rules found for this device and zone.');
                    setRule_Data([]); // Clear data on 404
                } else if (err.response?.status === 401) {
                    setError('Session expired. Please log in again.');
                } else {
                    setError('Failed to fetch rules. Please try again.');
                }
            }
        };

        if (selectedTab === 'auto') {
            fetchRules(); // Fetch rules when in auto mode
        }
    }, [selectedTab, deviceSymbol]); // Re-fetch if tab or deviceSymbol changes

        const AlertWhenDeleteRule = () => {
            Alert.alert(
                "Xác nhận",
                "Bạn chắc chắn muốn xóa quy tắc này?",
                [
                    { text: "Hủy", style: "cancel" },
                    { text: "Xóa", style: "destructive" },
                ],
                { cancelable: true }
            );
        };

        const AlertWhenToggleMode = () => {
            Alert.alert(
                "Xác nhận",
                "Khi chuyển sang chế độ tự động, các thiết lập trong chế độ thủ công sẽ tạm thời bị vô hiệu hóa.\n\nBạn vẫn muốn chuyển?",
                [
                    { text: "Hủy", style: "cancel" },
                    { text: "Chuyển", style: "default", onPress: () => setSelectedTab('auto') }
                ]
            );
        };

        // Template cho mỗi thẻ Quy tắc
        const Template_rule_card = ({ index = "0", content_rule = "Nội dung quy tắc" }: { index: string; content_rule?: string }) => {
            return (
                <View style={AutoModeArea_Style.overallContainer}>
                    <View style={AutoModeArea_Style.headerCardContainer}>
                        <Text style={{ fontWeight: "bold" }}>Quy tắc {index}</Text>
                        <TouchableOpacity style={{ marginTop: -5 }} onPress={AlertWhenDeleteRule}>
                            <Cross_Symbol />
                        </TouchableOpacity>
                    </View>

                    <View style={AutoModeArea_Style.content_rule_container}>
                        <Text style={AutoModeArea_Style.content_rule_text}>{content_rule}</Text>
                    </View>
                </View>
            );
        };

        // Khu vực code chính
        return (
            <View style={[
                { opacity: 0.4 },
                selectedTab === 'auto' && { opacity: 1 },
            ]}>
                <View style={DeviceControlModal_Style.modeContainer}>
                    <TouchableOpacity style={DeviceControlModal_Style.buttonModeContainer} onPress={()=>setSelectedTab('auto')}>
                        <Text style={DeviceControlModal_Style.buttonModeText}>Chế độ tự động</Text>
                    </TouchableOpacity>
                </View>

                {selectedTab === 'auto' &&
                    <View>
                        <View style={AutoModeArea_Style.headerContainer}>
                            <Text style={AutoModeArea_Style.titleText}>Các quy tắc đã thiết lập</Text>
                            <TouchableOpacity onPress={() => set_add_rule_modal_visible(true)}>
                                <Add_Circle />
                            </TouchableOpacity>

                        </View>

                        <FlatList
                            data={Rule_Data}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <Template_rule_card index={item.id} content_rule={"Nếu cảm biến " + item.sensor + " có giá trị trong khoảng " + item.range + ", thì " + item.action + " " + deviceName.toLocaleLowerCase() + " " + deviceSymbol} />
                            )}
                            scrollEnabled={true}
                            style={{ height: 300 }}
                        />
                    </View>}

                {/* Modal thêm quy tắc */}
                <ModalAddRule visible={add_rule_modal_visible} setVisible={set_add_rule_modal_visible} rule_index={(Rule_Data.length + 1).toLocaleString()} deviceName={deviceName} deviceSymbol={deviceSymbol} sensorList={sensorList} />
            </View>
        )
    };


interface deviceControlProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;

    deviceName: string;
    deviceSymbol: string;
    sensorList: any;
};

// HÀM CHÍNH
const ActuatorModal: React.FC<deviceControlProps> = ({ visible, setVisible, deviceName, deviceSymbol , sensorList}) => {
    
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
    const [selectedTab, setSelectedTab] = useState<'manual' | 'auto'>('auto');

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

                {/* Khu vực chế độ tự động */}
                <AutoModeArea selectedTab={selectedTab} setSelectedTab={setSelectedTab} deviceName={deviceName} deviceSymbol={deviceSymbol} sensorList={sensorList}/>

                {/* Nút THOÁT + SAVE */}
                <View style={DeviceControlModal_Style.cancel_save_button_container}>
                    <TouchableOpacity style={[DeviceControlModal_Style.buttonModeContainer, DeviceControlModal_Style.cancel_button_container]} onPress={() => AlertWhenCancel()}>
                        <Text style={[DeviceControlModal_Style.buttonModeText, { color: COLORS.textPrimary }]}>Thoát</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[DeviceControlModal_Style.buttonModeContainer, DeviceControlModal_Style.save_button_container]} onPress={() => setVisible(false)}>
                        <Text style={DeviceControlModal_Style.buttonModeText}>Lưu</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Toast />
        </Modal>
    )
};

export default ActuatorModal




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