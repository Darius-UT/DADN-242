import React, { useState } from "react";
import { View, Text } from "react-native-animatable";
import Modal from "react-native-modal";
import { Alert, Keyboard, KeyboardAvoidingView, Platform, SectionList, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, useWindowDimensions } from "react-native";
import { COLORS } from "@/constants/Colors";
import { TYPOGRAPHY } from "@/constants/Fonts";
import globalStyle from "@/styles/global";
import { SelectList } from "react-native-dropdown-select-list";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { Checkbox } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Toast from "react-native-toast-message";


// Dữ liệu dropBox chọn Cảm biến (dạng rời rạc)
const Sensor_SelectList_Data = [
    { id: "1", sensorType: "Cảm biến ánh sáng", sensorSymbol: "A-L1" },
    { id: "2", sensorType: "Cảm biến nhiệt độ", sensorSymbol: "A-T1" },
    { id: "3", sensorType: "Cảm biến độ ẩm", sensorSymbol: "A-M1" },
    { id: "4", sensorType: "Cảm biến độ ấm đất", sensorSymbol: "A-SM1" },
];
// Dữ liệu dropBox chọn Cảm biến (dạng chuẩn để chèn vào SelectList)
const Sensor_SelectList_Data_Official = Sensor_SelectList_Data.map((sensor) => ({
    key: sensor.id,
    value: `${sensor.sensorType} (${sensor.sensorSymbol})`,
}));

// Dữ liệu dropBox chọn action (dạng chuẩn để chèn vào SelectList)
const Action_SelectList_Data_Official = [
    { key: "1", value: "Bật" },
    { key: "2", value: "Tắt" },
]





interface ModalAddRule_props {
    visible: boolean;
    setVisible: (visible: boolean) => void;

    rule_index: string;
    deviceName: string;
};

const ModalAddRule: React.FC<ModalAddRule_props> = ({ visible, setVisible, rule_index = "1", deviceName = "defaultName" }) => {
    // useState SelectList chọn cảm biến: sensorSelection lưu trữ tên Cảm biến hiện tại.
    const [sensorSelection, setSensorSelection] = useState<string>("")

    // useState chọn khoảng giá trị: lowerBound lưu trữ giá trị chặn dưới dạng String (+inf, -inf)
    const [lowerBound, setLowerBound] = useState<string>("0");
    // useState chọn khoảng giá trị: upperBound lưu trữ giá trị chặn trên dạng String (+inf, -inf)
    const [upperBound, setUpperBound] = useState<string>("0");

    // useState đánh dấu lowerBound là -inf
    const [negative_inf, setNegative_inf] = useState<boolean>(false);
    // useState đánh dấu upperBound là +inf
    const [positive_inf, setPositive_inf] = useState<boolean>(false);

    // Hàm hiển thị thân thiện người dùng kết quả của Miền giá trị
    const handleShowRangeValue = () => {
        let left: string = "";
        let right: string = "";
        left = negative_inf ? ("(-∞") : ("[" + (lowerBound ? lowerBound : "- -"));
        right = positive_inf ? ("+∞)") : ((upperBound ? upperBound : "- -") + "]");
        return left + ", " + right;
    };


    // useState SelectList chọn Action:
    const [action, setAction] = useState<string>("")

    // useState DateTime Picker:
    // // Giờ bắt đầu
    const [isStartTimeVisible, setStartTimeVisible] = useState<boolean>(false);
    const [startTimePicker, setStartTimePicker] = useState<Date>(new Date());
    // // Giờ kết thúc
    const [isEndTimeVisible, setEndTimeVisible] = useState<boolean>(false);
    const [endTimePicker, setEndTimePicker] = useState<Date>(new Date());


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


    return (
        <Modal
            isVisible={visible}
            animationIn={"slideInRight"}
            animationOut={"slideOutRight"}
            backdropOpacity={0}
            onBackdropPress={() => setVisible(false)}
            avoidKeyboard={true}
        >

            <View style={ModalAddRule_Style.modalOverallContainer}>
                <View style={ModalAddRule_Style.headerContainer}>
                    <Text style={ModalAddRule_Style.headerText}>Quy tắc số {rule_index}</Text>
                </View>

                {/* Nếu */}
                <View style={[ModalAddRule_Style.subContainer, { zIndex: 999 }]}>
                    <Text style={ModalAddRule_Style.subText}>Nếu:</Text>
                    <SelectList
                        data={Sensor_SelectList_Data_Official}
                        setSelected={(myChoice: string) => setSensorSelection(myChoice)}
                        searchPlaceholder="Tìm từ khóa của cảm biến"
                        placeholder="Chọn một cảm biến"
                        boxStyles={ModalAddRule_Style.selectList_boxStyle}
                        dropdownStyles={ModalAddRule_Style.selectList_dropDownStyle}
                    />
                </View>

                {/* Nằm trong đoạn giá trị */}
                <View style={ModalAddRule_Style.subContainer}>
                    <Text style={ModalAddRule_Style.subText}>Có giá trị nằm trong khoảng</Text>
                    <Text style={{
                        textAlign: "center",
                        opacity: 0.7,
                        fontSize: TYPOGRAPHY.baseFontSize + 3,
                        padding: 5
                    }}
                    >
                        {handleShowRangeValue()}
                    </Text>
                    <View style={ModalAddRule_Style.valueContainer}>
                        {/* Nhập giá trị chặn dưới */}
                        <View style={ModalAddRule_Style.textInputContainer}>
                            <TextInput
                                style={ModalAddRule_Style.textInputStyle}
                                placeholder="Chặn dưới"
                                onChangeText={(myInput) => setLowerBound(myInput)}
                                value={negative_inf ? "-inf" : lowerBound}
                            />
                            <View style={ModalAddRule_Style.checkBoxContainer}>
                                <Checkbox
                                    status={negative_inf ? "checked" : "unchecked"}
                                    onPress={() => setNegative_inf(!negative_inf)}
                                    color={COLORS.primary}
                                />
                                <Text style={{ marginLeft: 4 }}>-∞</Text>
                            </View>
                        </View>

                        <Text style={[ModalAddRule_Style.subText, { fontSize: TYPOGRAPHY.baseFontSize + 1, opacity: 0.5, top: "15%" }]}>đến</Text>

                        {/* Nhập giá trị chặn trên */}
                        <View style={ModalAddRule_Style.textInputContainer}>
                            <TextInput
                                style={ModalAddRule_Style.textInputStyle}
                                placeholder="Chặn trên"
                                onChangeText={(myInput) => setUpperBound(myInput)}
                                value={positive_inf ? "+inf" : upperBound}
                            />
                            <View style={ModalAddRule_Style.checkBoxContainer}>
                                <Checkbox
                                    status={positive_inf ? "checked" : "unchecked"}
                                    onPress={() => setPositive_inf(!positive_inf)}
                                    color={COLORS.primary}
                                />
                                <Text style={{ marginLeft: 4 }}>+∞</Text>
                            </View>
                        </View>

                    </View>

                </View>

                {/* Thì */}
                <View style={[ModalAddRule_Style.subContainer, { zIndex: 100 }]}>
                    <Text style={ModalAddRule_Style.subText}>Thì:</Text>
                    <View style={ModalAddRule_Style.thenContainer}>
                        <View style={{ width: "55%" }}>
                            <SelectList
                                data={Action_SelectList_Data_Official}
                                setSelected={(myChoice: string) => setAction(myChoice.toString())}

                                placeholder="Chọn hành động"
                                searchPlaceholder="Tìm hành động"
                                boxStyles={ModalAddRule_Style.selectList_boxStyle}
                                dropdownStyles={ModalAddRule_Style.selectList_dropDownStyle}
                            />
                        </View>

                        <Text style={ModalAddRule_Style.deviceNameText}>{deviceName}</Text>
                    </View>
                </View>

                {/* Khung giờ hoạt động trong ngày */}
                <View style={[ModalAddRule_Style.subContainer, { marginTop: 10 }]}>
                    <Text style={ModalAddRule_Style.subText}>Khung giờ kích hoạt trong ngày:</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <TouchableOpacity style={ModalAddRule_Style.timePickerContainer} onPress={() => setStartTimeVisible(true)}>
                            <Text style={ModalAddRule_Style.timePickerText}>Giờ bắt đầu</Text>
                            <Text style={ModalAddRule_Style.timeText}>{startTimePicker.toLocaleTimeString()}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={ModalAddRule_Style.timePickerContainer} onPress={() => setEndTimeVisible(true)}>
                            <Text style={ModalAddRule_Style.timePickerText}>Giờ kết thúc</Text>
                            <Text style={ModalAddRule_Style.timeText}>{endTimePicker.toLocaleTimeString()}</Text>
                        </TouchableOpacity>
                    </View>

                    <DateTimePickerModal
                        isVisible={isStartTimeVisible}
                        mode="time"
                        onConfirm={(selectedTime) => {
                            setStartTimePicker(selectedTime);
                            setStartTimeVisible(false);
                        }}
                        onCancel={() => setStartTimeVisible(false)}
                    />
                    <DateTimePickerModal
                        isVisible={isEndTimeVisible}
                        mode="time"
                        onConfirm={(selectedTime) => {
                            if (selectedTime <= startTimePicker) {
                                Toast.show({
                                    type: 'error',
                                    text1: 'Thời gian không hợp lệ',
                                    text2: 'Giờ kết thúc phải sau giờ bắt đầu.',
                                    visibilityTime: 3000,
                                    position: 'top',
                                });
                                setEndTimePicker(startTimePicker)
                            }
                            else {
                                setEndTimePicker(selectedTime);
                            }
                            setEndTimeVisible(false);
                        }}
                        onCancel={() => setEndTimeVisible(false)}
                    />
                </View>

                {/* Nút Thêm mới + Hủy */}
                <View style={{ paddingHorizontal: 15, marginTop: 20, rowGap: 8 }}>
                    <TouchableOpacity style={ModalAddRule_Style.addButtonContainer} onPress={() => setVisible(false)}>
                        <Text style={ModalAddRule_Style.addButtonText}>Thêm mới</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[ModalAddRule_Style.cancelButtonContainer]} onPress={AlertWhenCancel}>
                        <Text style={[ModalAddRule_Style.addButtonText, { color: COLORS.textPrimary }]}>Hủy</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Toast />
        </Modal>
    );
};

export default ModalAddRule;



// CSS
const ModalAddRule_Style = StyleSheet.create({
    modalOverallContainer: {
        width: "100%",
        // height: "73%",
        backgroundColor: COLORS.background,
        borderRadius: 10,
        padding: globalStyle.mainPadding.padding,
        rowGap: 10,
    },

    headerContainer: {
        alignItems: "center"
    },

    headerText: {
        fontFamily: "Roboto-SemiBold",
        fontSize: TYPOGRAPHY.subTitleFontSize + 3,
        color: COLORS.textPrimary,
    },


    subContainer: {
        paddingHorizontal: 15,
        gap: 5,
        position: "relative",
    },

    subText: {
        fontFamily: "Roboto-SemiBold",
        fontSize: TYPOGRAPHY.subTitleFontSize - 2,
        color: COLORS.textPrimary,
    },


    selectList_boxStyle: {
        borderRadius: 8,
        borderColor: COLORS.primary,
    },

    selectList_dropDownStyle: {
        position: "absolute",
        width: "100%",
        top: 45,
        zIndex: 10,

        paddingHorizontal: 5,
        borderRadius: 8,
        backgroundColor: COLORS.background,
        elevation: 5
    },

    textInputContainer: {
        width: "45%",
    },

    textInputStyle: {
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderRadius: 8,
        paddingHorizontal: 12,
    },

    valueContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    checkBoxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: -5,
    },


    thenContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
    },

    deviceNameText: {
        opacity: 0.5,
        fontStyle: "italic",
    },


    timePickerContainer: {
        width: "49%",
        borderRadius: 8,
        paddingBottom: 12,
        paddingTop: 5,
        gap: 10,

        alignItems: "center",
        backgroundColor: COLORS.lightSecondary,
        elevation: 5,
    },

    timePickerText: {
        opacity: 0.5,
        fontFamily: "Roboto-SemiBold",
        fontSize: TYPOGRAPHY.baseFontSize + 2,
        color: COLORS.textPrimary,
    },

    timeText: {
        fontFamily: "Roboto-ExtraBold",
        fontSize: TYPOGRAPHY.subTitleFontSize,
        color: COLORS.textPrimary,
    },


    addButtonContainer: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 13,
        width: "100%",

        backgroundColor: COLORS.secondary,
        borderRadius: 100,
    },

    addButtonText: {
        fontFamily: "Roboto-SemiBold",
        color: COLORS.white,
        fontSize: TYPOGRAPHY.buttonFontSize,
    },

    cancelButtonContainer: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 12,
        width: "100%",
        borderRadius: 100,

        borderWidth: 1,
        borderColor: COLORS.primary,
    }
});