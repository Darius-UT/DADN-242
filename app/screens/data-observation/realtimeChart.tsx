import * as RealtimeChartScreen_Style from "@/styles/screens/data-observation/realTimeChart";
import React from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";
import { useNavigation } from "expo-router";
import { SearchBar } from "@/components/common/SearchBar";
import * as Home_Style from "@/styles/screens/home/home";
import GaugeChart from "@/components/common/GaugeChart";
import { COLORS } from "@/constants/Colors";
import { BackArrow } from '@/components/ui/IconSymbol';




const TemperatureSensor_GaugeData = [
    { id: "1", value: 36, min: 0, max: 100, unit: "°C", name: "A-T1" },
    { id: "2", value: 20, min: 0, max: 100, unit: "°C", name: "A-T2" },
    { id: "3", value: 40, min: 0, max: 100, unit: "°C", name: "A-T3" },
    { id: "4", value: 80, min: 0, max: 100, unit: "°C", name: "A-T4" },
    { id: "5", value: 12, min: 0, max: 100, unit: "°C", name: "A-T5" },
]

const LightSensor_GaugeData = [
    { id: "1", value: 8000, min: 0, max: 50000, unit: "Lux", name: "A-L1" },
    { id: "2", value: 1100, min: 0, max: 50000, unit: "Lux", name: "A-L2" },
    { id: "3", value: 9000, min: 0, max: 50000, unit: "Lux", name: "A-L3" },
    { id: "4", value: 8900, min: 0, max: 50000, unit: "Lux", name: "A-L4" },
    { id: "5", value: 7600, min: 0, max: 50000, unit: "Lux", name: "A-L5" },
]

const MoistureSensor_GaugeData = [
    { id: "1", value: 36, min: 0, max: 100, unit: "%", name: "A-M1" },
    { id: "2", value: 20, min: 0, max: 100, unit: "%", name: "A-M2" },
    { id: "3", value: 40, min: 0, max: 100, unit: "%", name: "A-M3" },
    { id: "4", value: 80, min: 0, max: 100, unit: "%", name: "A-M4" },
    { id: "5", value: 12, min: 0, max: 100, unit: "%", name: "A-M5" },
]

const SoilMoistureSensor_GaugeData = [
    { id: "1", value: 36, min: 0, max: 100, unit: "%", name: "A-SM1" },
    { id: "2", value: 20, min: 0, max: 100, unit: "%", name: "A-SM2" },
    { id: "3", value: 40, min: 0, max: 100, unit: "%", name: "A-SM3" },
    { id: "4", value: 80, min: 0, max: 100, unit: "%", name: "A-SM4" },
    { id: "5", value: 12, min: 0, max: 100, unit: "%", name: "A-SM5" },
]


const Sensor = (sensorType: string, sensorData: Array<{ id: string, value: number, min: number, max: number, unit: string, name: string }>) => {
    const [] = useFonts({
        "Roboto-ExtraBold": require("@/assets/fonts/Roboto/static/Roboto-ExtraBold.ttf"),
        "Roboto-SemiBold": require("@/assets/fonts/Roboto/static/Roboto-SemiBold.ttf"),
    });

    const ChartTemplate = ({ value = 30, min = 0, max = 100, unit = "°C", name = "Biểu đồ" }) => {
        return (
            <View style={RealtimeChartScreen_Style.Sensor_Style.chartContaner}>
                <GaugeChart value={value} min={0} max={max} unit={unit} name={name} />
            </View>
        );
    };

    return (
        <View>
            <View style={Home_Style.GeneraValue.subTitleTextContainer}>
                <Text style={Home_Style.GeneraValue.subTitleText}>{sensorType}</Text>
            </View>
            <ScrollView
                style={{ maxHeight: 300, }}
                horizontal={true}
                contentContainerStyle={RealtimeChartScreen_Style.Sensor_Style.scrollView}
                nestedScrollEnabled={true}
                onStartShouldSetResponderCapture={() => true}
            >
                {sensorData.map((sensor) => (
                    <ChartTemplate
                        key={sensor.name}
                        value={sensor.value}
                        min={sensor.min}
                        max={sensor.max}
                        unit={sensor.unit}
                        name={sensorType + " " + sensor.name}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

const RealTimeChart_Screen = () => {
    const navigation = useNavigation<any>();
    const [] = useFonts({
        "Roboto-ExtraBold": require("@/assets/fonts/Roboto/static/Roboto-ExtraBold.ttf"),
        "Roboto-SemiBold": require("@/assets/fonts/Roboto/static/Roboto-SemiBold.ttf"),
    });

    return (
        <ScrollView
            style={{ backgroundColor: COLORS.background, }}
            contentContainerStyle={RealtimeChartScreen_Style.default.mainContainer}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
        >
            <View style={RealtimeChartScreen_Style.default.headerContainer}>
                <TouchableOpacity
                    style={RealtimeChartScreen_Style.default.backArrow}
                    onPress={() => navigation.goBack()}
                >
                    <BackArrow></BackArrow>
                </TouchableOpacity>
                <Text style={RealtimeChartScreen_Style.default.headerText}>Biểu đồ thời gian thực</Text>
            </View>

            <SearchBar />

            {Sensor("Cảm biến nhiệt độ", TemperatureSensor_GaugeData)}
            {Sensor("Cảm biến ánh sáng", LightSensor_GaugeData)}
            {Sensor("Cảm biến độ ẩm", MoistureSensor_GaugeData)}
            {Sensor("Cảm biến độ ẩm đất", SoilMoistureSensor_GaugeData)}

        </ScrollView>
    );
};

export default RealTimeChart_Screen;