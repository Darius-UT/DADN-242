import Top_Header from "@/components/common/Top_Header";
import React, { useState } from "react";
import {
    TouchableOpacity
} from "react-native-gesture-handler";
import { View, Text } from "react-native-animatable";
import { BackArrow } from "@/components/ui/IconSymbol";
import { useNavigation } from "expo-router";
import * as DeviceAreaScreen_Style from "@/styles/screens/device-control/deviceArea";
import { useFonts } from "expo-font";
import { SafeAreaView, SectionList, } from "react-native";
import { COLORS } from "@/constants/Colors";
import { ArrowUp, ArrowDown } from "@/components/ui/IconSymbol";
import DeviceControlModal from "@/components/common/ModalDeviceControl";


const AreaName = "A";

const deviceData = [
    {
        title: "Nhóm kiểm soát môi trường",
        data: [
            { id: "1", type: "Quạt thông gió", symbol: "A-F1", mode: "Thủ công" },
            { id: "2", type: "Quạt thông gió", symbol: "A-F2", mode: "Thủ công" },
            { id: "3", type: "Quạt thông gió", symbol: "A-F3", mode: "Tự động" },
            { id: "4", type: "Quạt thông gió", symbol: "A-F4", mode: "Thủ công" },
        ]
    },
    {
        title: "Nhóm chiếu sáng",
        data: [
            { id: "1", type: "Đèn LED", symbol: "A-L1", mode: "Thủ công" },
            { id: "2", type: "Đèn LED", symbol: "A-L2", mode: "Thủ công" },
            { id: "3", type: "Đèn LED", symbol: "A-L3", mode: "Tự động" },
            { id: "4", type: "Đèn LED", symbol: "A-L4", mode: "Thủ công" },
            { id: "5", type: "Đèn LED", symbol: "A-L5", mode: "Thủ công" },
            { id: "6", type: "Đèn LED", symbol: "A-L6", mode: "Thủ công" },
        ]
    },
    {
        title: "Nhóm tưới tiêu",
        data: [
            { id: "1", type: "Máy bơm", symbol: "A-P1", mode: "Tự động" },
            { id: "2", type: "Máy bơm", symbol: "A-P2", mode: "Thủ công" },
            { id: "3", type: "Máy bơm", symbol: "A-P3", mode: "Thủ công" },
            { id: "4", type: "Máy bơm", symbol: "A-P4", mode: "Thủ công" },
            { id: "5", type: "Máy bơm", symbol: "A-P5", mode: "Thủ công" },
            { id: "6", type: "Máy bơm", symbol: "A-P6", mode: "Thủ công" },
            { id: "7", type: "Máy bơm", symbol: "A-P7", mode: "Thủ công" },
            { id: "8", type: "Máy bơm", symbol: "A-P8", mode: "Thủ công" },
            { id: "9", type: "Máy bơm", symbol: "A-P9", mode: "Thủ công" },
        ]
    }
];


const DeviceAreaScreen = () => {
    const navigation = useNavigation<any>();

    // UseState cho việc thu-phóng danh sách các nhóm thiết bị
    const [expand, setExpand] = useState<Set<string>>(new Set());

    const toggleExpand = (title: string) => {
        setExpand((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(title)) {
                newSet.delete(title)
            }
            else {
                newSet.add(title)
            }
            return newSet;
        });
    };


    // UseState cho việc mở/đóng modal Cấu hình thiết bị
    const [modalVisible, setModalVisible] = useState<boolean>(false)

    const [currentDevice, setCurrentDevice] = useState<{ name: string; symbol: string }>({ name: "", symbol: "" });

    const toggleDeviceModal = (name: string, symbol: string) => {
        setModalVisible(() => {
            setCurrentDevice({name, symbol})
            return true
        });
    }

    // Font chữ
    const [] = useFonts({
        "Roboto-ExtraBold": require("@/assets/fonts/Roboto/static/Roboto-ExtraBold.ttf"),
        "Roboto-SemiBold": require("@/assets/fonts/Roboto/static/Roboto-SemiBold.ttf"),
    });


    return (
        <SafeAreaView>
            {/* TopHeader */}
            <Top_Header></Top_Header>

            {/* Giao diện chính */}
            <View style={DeviceAreaScreen_Style.default.mainContainer}>

                {/* Tiêu đề */}
                <TouchableOpacity style={DeviceAreaScreen_Style.default.backArrow} onPress={() => navigation.goBack()}>
                    <BackArrow></BackArrow>
                </TouchableOpacity>
                <Text style={DeviceAreaScreen_Style.default.headerText}>Thiết bị khu {AreaName}</Text>


                {/* Danh sách các thiết bị theo nhóm */}
                <SectionList
                    style={{ height: "85%" }}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={DeviceAreaScreen_Style.default.sectionListContainer}
                    sections={deviceData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, section }) => (
                        <View>
                            {expand.has(section.title) && (<View>
                                <View style={DeviceAreaScreen_Style.deviceListTemplate_Style.listContainer}>
                                    <Text style={[DeviceAreaScreen_Style.deviceListTemplate_Style.cellContainer, { width: "35%" }]}>{item.type}</Text>
                                    <Text style={DeviceAreaScreen_Style.deviceListTemplate_Style.cellContainer}>{item.symbol}</Text>
                                    <Text style={DeviceAreaScreen_Style.deviceListTemplate_Style.cellContainer}>{item.mode}</Text>
                                    <TouchableOpacity style={{ alignItems: "center" }} containerStyle={DeviceAreaScreen_Style.deviceListTemplate_Style.cellContainer} onPress={()=>toggleDeviceModal(item.type, item.symbol)}>
                                        <Text style={[{ color: COLORS.secondary }]}>Chi tiết</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>)}
                        </View>
                    )}
                    renderSectionHeader={({ section: { title } }) => (
                        <View>
                            <TouchableOpacity style={DeviceAreaScreen_Style.deviceListTemplate_Style.typeBarContainer} onPress={() => toggleExpand(title)}>
                                <Text style={DeviceAreaScreen_Style.deviceListTemplate_Style.barText}>{title}</Text>
                                {!expand.has(title) && <ArrowDown />}
                                {expand.has(title) && <ArrowUp />}
                            </TouchableOpacity>

                            {expand.has(title) && <View style={DeviceAreaScreen_Style.deviceListTemplate_Style.listContainer}>
                                <Text style={[DeviceAreaScreen_Style.deviceListTemplate_Style.cellContainer, { width: "35%", fontFamily: "Roboto-SemiBold" }]}>Tên thiết bị</Text>
                                <Text style={[DeviceAreaScreen_Style.deviceListTemplate_Style.cellContainer, { fontFamily: "Roboto-SemiBold" }]}>Ký hiệu</Text>
                                <Text style={[DeviceAreaScreen_Style.deviceListTemplate_Style.cellContainer, { fontFamily: "Roboto-SemiBold" }]}>Chế độ</Text>
                                <Text style={[DeviceAreaScreen_Style.deviceListTemplate_Style.cellContainer, { fontFamily: "Roboto-SemiBold" }]}>Cấu hình</Text>
                            </View>}
                        </View>
                    )}
                />

                {/* Modal cấu hình thiết bị */}
                <DeviceControlModal visible={modalVisible} setVisible={setModalVisible} deviceName={currentDevice.name} deviceSymbol={currentDevice.symbol}/>
            </View>
        </SafeAreaView>
    );
};

export default DeviceAreaScreen;
