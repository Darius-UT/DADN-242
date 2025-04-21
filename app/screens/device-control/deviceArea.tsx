import Top_Header from "@/components/common/Top_Header";
import React, { useEffect, useState } from "react";
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

import SensorModal    from "@/components/common/ModalSensorControl";
import ActuatorModal  from "@/components/common/ModalActuatorControl";

import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDevicesByArea } from "@/services/area.service";



const DeviceAreaScreen = () => {
    // tham số
    const myRoute = useRoute<any>();
    const { areaId, areaName } = myRoute.params as { areaId: number | string; areaName: string };

    const [deviceGroups, setDeviceGroups] = useState<any[]>([]);
    const [sensorList, setSensorList] = useState<any[]>([]);
    React.useEffect(() => {
        (async () => {
          try {
            const token = await AsyncStorage.getItem("accessToken");
            const res   = await getDevicesByArea(areaId, token);  // ← API của bạn
            setDeviceGroups([
                      { title: "Nhóm cảm biến",        data: res.data.filter((d: any) => d.type === "SENSOR") },
                      { title: "Nhóm cơ cấu chấp hành", data: res.data.filter((d: any) => d.type === "ACTUATOR") },
                    ]);
            setSensorList(res.data.filter((d:any)=> d.type === "SENSOR"));       
          } catch (err) {
            console.log("Không tải được danh sách thiết bị:", err);
          }
        })();
      }, [areaId]);
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
    const [currentModalType, setCurrentModalType] = useState<"SENSOR"|"ACTUATOR"|"">("");
    const [currentDevice, setCurrentDevice] = useState<{ name: string; symbol: string }>({ name: "", symbol: "" });

    const toggleDeviceModal = (name: string, symbol: string,type: "SENSOR" | "ACTUATOR") => {
        setModalVisible(() => {
            setCurrentDevice({name, symbol})
            setCurrentModalType(type);
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
                <Text style={DeviceAreaScreen_Style.default.headerText}>Thiết bị khu {areaName}</Text>


                {/* Danh sách các thiết bị theo nhóm */}
                <SectionList
                    style={{ height: "85%" }}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={DeviceAreaScreen_Style.default.sectionListContainer}
                    sections={deviceGroups}
                    keyExtractor={(item, index) => index.toString()}
                    //ToDo render item
                     renderItem={({ item, section }) => {
                           if (!expand.has(section.title)) return null;   // nhóm đang đóng → không vẽ item
                           return (
                             <View style={DeviceAreaScreen_Style.deviceListTemplate_Style.listContainer}>
                               <Text
                                 style={[
                                   DeviceAreaScreen_Style.deviceListTemplate_Style.cellContainer,
                                   { width: "35%" },
                                 ]}
                           >
                                 {item.deviceName}
                               </Text>
                        
                               <Text style={DeviceAreaScreen_Style.deviceListTemplate_Style.cellContainer}>
                                 {item.feedName}
                               </Text>
                               
                        
                               <TouchableOpacity
                                
                                 onPress={() => toggleDeviceModal(item.deviceName, item.feedName, item.type as "SENSOR"|"ACTUATOR") }
                               >
                                 <Text style={{ color: COLORS.secondary }}>Chi tiết</Text>
                               </TouchableOpacity>
                             </View>
                           );
                         }}
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
                                <Text style={[DeviceAreaScreen_Style.deviceListTemplate_Style.cellContainer, { fontFamily: "Roboto-SemiBold" }]}>Cấu hình</Text>
                            </View>}
                        </View>
                    )}
                />
                {currentModalType === "SENSOR" && (
                                            <SensorModal
                                                visible={modalVisible}
                                                setVisible={setModalVisible}
                                                deviceName={currentDevice.name}
                                                deviceSymbol={currentDevice.symbol}
                                                
                                            />
                                            )}

                                            {currentModalType === "ACTUATOR" && (
                                            <ActuatorModal
                                                visible={modalVisible}
                                                setVisible={setModalVisible}
                                                deviceName={currentDevice.name}
                                                deviceSymbol={currentDevice.symbol}
                                                sensorList={sensorList}
                                            />
                                            )}
                {/* Modal cấu hình thiết bị */}
                {/* <DeviceControlModal visible={modalVisible} setVisible={setModalVisible} deviceName={currentDevice.name} deviceSymbol={currentDevice.symbol } sensorList={sensorList}/> */}
            </View>
        </SafeAreaView>
    );
};

export default DeviceAreaScreen;
