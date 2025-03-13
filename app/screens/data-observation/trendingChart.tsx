import React from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity
} from "react-native";
import { useNavigation } from "expo-router";
import { useFonts } from "expo-font";
import { SearchBar } from "@/components/common/SearchBar";
import * as RealtimeChartScreen_Style from "@/styles/screens/data-observation/realTimeChart";
import { COLORS } from "@/constants/Colors";
import { BackArrow } from "@/components/ui/IconSymbol";
import * as TrendingChartScreen_Style from "@/styles/screens/data-observation/trendingChart";
import LineChartTemplate from "@/components/common/LineChart";



const TemperatureSensor_LineData1 = [
    { value: 20, label: '00:00' },
    { value: 22, label: '01:00' },
    { value: 21, label: '02:00' },
    { value: 22, label: '03:00' },
    { value: 20, label: '04:00' },
    { value: 19, label: '05:00' },
    { value: 20, label: '06:00' },
    { value: 21, label: '07:00' },
    { value: 20, label: '08:00' },
    { value: 24, label: '09:00' },
    { value: 20, label: '10:00' },
    { value: 19, label: '11:00' },
];

const TemperatureSensor_LineData2 = [
    { value: 30, label: '00:00' },
    { value: 34, label: '01:00' },
    { value: 33, label: '02:00' },
    { value: 33, label: '03:00' },
    { value: 29, label: '04:00' },
    { value: 39, label: '05:00' },
    { value: 29, label: '06:00' },
    { value: 28, label: '07:00' },
    { value: 28, label: '08:00' },
    { value: 29, label: '09:00' },
    { value: 30, label: '10:00' },
    { value: 29, label: '11:00' },
];

const TemperatureSensor_LineData3 = [
    { value: 34, label: '00:00' },
    { value: 32, label: '01:00' },
    { value: 32, label: '02:00' },
    { value: 29, label: '03:00' },
    { value: 30, label: '04:00' },
    { value: 31, label: '05:00' },
    { value: 28, label: '06:00' },
    { value: 27, label: '07:00' },
    { value: 29, label: '08:00' },
    { value: 30, label: '09:00' },
    { value: 32, label: '10:00' },
    { value: 33, label: '11:00' },
];

const TemperatureSensor_LineData4 = [
    { value: 21, label: '00:00' },
    { value: 20, label: '01:00' },
    { value: 24, label: '02:00' },
    { value: 20, label: '03:00' },
    { value: 24, label: '04:00' },
    { value: 22, label: '05:00' },
    { value: 25, label: '06:00' },
    { value: 21, label: '07:00' },
    { value: 23, label: '08:00' },
    { value: 20, label: '09:00' },
    { value: 23, label: '10:00' },
    { value: 23, label: '11:00' },
];



const LightSensor_LineData1 = [
    { value: 8000, label: '00:00' },
    { value: 10000, label: '01:00' },
    { value: 10000, label: '02:00' },
    { value: 9000, label: '03:00' },
    { value: 9200, label: '04:00' },
    { value: 9300, label: '05:00' },
    { value: 9500, label: '06:00' },
    { value: 9400, label: '07:00' },
    { value: 9300, label: '08:00' },
    { value: 9500, label: '09:00' },
    { value: 9000, label: '10:00' },
    { value: 9900, label: '11:00' },
];

const LightSensor_LineData2 = [
    { value: 9000, label: '00:00' },
    { value: 9600, label: '01:00' },
    { value: 10000, label: '02:00' },
    { value: 9300, label: '03:00' },
    { value: 9600, label: '04:00' },
    { value: 9100, label: '05:00' },
    { value: 9200, label: '06:00' },
    { value: 9200, label: '07:00' },
    { value: 9300, label: '08:00' },
    { value: 9200, label: '09:00' },
    { value: 9200, label: '10:00' },
    { value: 9400, label: '11:00' },
];

const LightSensor_LineData3 = [
    { value: 10000, label: '00:00' },
    { value: 10300, label: '01:00' },
    { value: 10300, label: '02:00' },
    { value: 10200, label: '03:00' },
    { value: 11400, label: '04:00' },
    { value: 11500, label: '05:00' },
    { value: 11100, label: '06:00' },
    { value: 10200, label: '07:00' },
    { value: 11100, label: '08:00' },
    { value: 10300, label: '09:00' },
    { value: 10200, label: '10:00' },
    { value: 11300, label: '11:00' },
];

const LightSensor_LineData4 = [
    { value: 13000, label: '00:00' },
    { value: 13200, label: '01:00' },
    { value: 13100, label: '02:00' },
    { value: 13200, label: '03:00' },
    { value: 13300, label: '04:00' },
    { value: 13400, label: '05:00' },
    { value: 13500, label: '06:00' },
    { value: 13300, label: '07:00' },
    { value: 13100, label: '08:00' },
    { value: 13200, label: '09:00' },
    { value: 13100, label: '10:00' },
    { value: 13400, label: '11:00' },
];



const MoistureSensor_LineData1 = [
    { value: 20, label: '00:00' },
    { value: 22, label: '01:00' },
    { value: 21, label: '02:00' },
    { value: 22, label: '03:00' },
    { value: 20, label: '04:00' },
    { value: 19, label: '05:00' },
    { value: 20, label: '06:00' },
    { value: 21, label: '07:00' },
    { value: 20, label: '08:00' },
    { value: 24, label: '09:00' },
    { value: 20, label: '10:00' },
    { value: 19, label: '11:00' },
];

const MoistureSensor_LineData2 = [
    { value: 30, label: '00:00' },
    { value: 34, label: '01:00' },
    { value: 33, label: '02:00' },
    { value: 33, label: '03:00' },
    { value: 29, label: '04:00' },
    { value: 39, label: '05:00' },
    { value: 29, label: '06:00' },
    { value: 28, label: '07:00' },
    { value: 28, label: '08:00' },
    { value: 29, label: '09:00' },
    { value: 30, label: '10:00' },
    { value: 29, label: '11:00' },
];

const MoistureSensor_LineData3 = [
    { value: 34, label: '00:00' },
    { value: 32, label: '01:00' },
    { value: 32, label: '02:00' },
    { value: 29, label: '03:00' },
    { value: 30, label: '04:00' },
    { value: 31, label: '05:00' },
    { value: 28, label: '06:00' },
    { value: 27, label: '07:00' },
    { value: 29, label: '08:00' },
    { value: 30, label: '09:00' },
    { value: 32, label: '10:00' },
    { value: 33, label: '11:00' },
];

const MoistureSensor_LineData4 = [
    { value: 21, label: '00:00' },
    { value: 20, label: '01:00' },
    { value: 24, label: '02:00' },
    { value: 20, label: '03:00' },
    { value: 24, label: '04:00' },
    { value: 22, label: '05:00' },
    { value: 25, label: '06:00' },
    { value: 21, label: '07:00' },
    { value: 23, label: '08:00' },
    { value: 20, label: '09:00' },
    { value: 23, label: '10:00' },
    { value: 23, label: '11:00' },
];



const SoilMoistureSensor_LineData1 = [
    { value: 20, label: '00:00' },
    { value: 22, label: '01:00' },
    { value: 21, label: '02:00' },
    { value: 22, label: '03:00' },
    { value: 20, label: '04:00' },
    { value: 19, label: '05:00' },
    { value: 20, label: '06:00' },
    { value: 21, label: '07:00' },
    { value: 20, label: '08:00' },
    { value: 24, label: '09:00' },
    { value: 20, label: '10:00' },
    { value: 19, label: '11:00' },
];

const SoilMoistureSensor_LineData2 = [
    { value: 30, label: '00:00' },
    { value: 34, label: '01:00' },
    { value: 33, label: '02:00' },
    { value: 33, label: '03:00' },
    { value: 29, label: '04:00' },
    { value: 39, label: '05:00' },
    { value: 29, label: '06:00' },
    { value: 28, label: '07:00' },
    { value: 28, label: '08:00' },
    { value: 29, label: '09:00' },
    { value: 30, label: '10:00' },
    { value: 29, label: '11:00' },
];

const SoilMoistureSensor_LineData3 = [
    { value: 34, label: '00:00' },
    { value: 32, label: '01:00' },
    { value: 32, label: '02:00' },
    { value: 29, label: '03:00' },
    { value: 30, label: '04:00' },
    { value: 31, label: '05:00' },
    { value: 28, label: '06:00' },
    { value: 27, label: '07:00' },
    { value: 29, label: '08:00' },
    { value: 30, label: '09:00' },
    { value: 32, label: '10:00' },
    { value: 33, label: '11:00' },
];

const SoilMoistureSensor_LineData4 = [
    { value: 21, label: '00:00' },
    { value: 20, label: '01:00' },
    { value: 24, label: '02:00' },
    { value: 20, label: '03:00' },
    { value: 24, label: '04:00' },
    { value: 22, label: '05:00' },
    { value: 25, label: '06:00' },
    { value: 21, label: '07:00' },
    { value: 23, label: '08:00' },
    { value: 20, label: '09:00' },
    { value: 23, label: '10:00' },
    { value: 23, label: '11:00' },
];



const TemperatureDataSets = [
    { data: TemperatureSensor_LineData1, label: "A", color: "rgba(0, 133, 27, 0.8)", pointColor: "rgb(0, 51, 10)" },
    { data: TemperatureSensor_LineData2, label: "B", color: "rgba(17, 128, 188, 0.8)", pointColor: "rgb(0, 48, 73)" },
    { data: TemperatureSensor_LineData3, label: "C", color: "rgba(255, 99, 71, 0.8)", pointColor: "rgb(139, 0, 0)" },
    { data: TemperatureSensor_LineData4, label: "D", color: "rgb(71, 37, 170)", pointColor: "rgb(12, 0, 49)" },
];

const LightDataSets = [
    { data: LightSensor_LineData1, label: "A", color: "rgba(0, 133, 27, 0.8)", pointColor: "rgb(0, 51, 10)" },
    { data: LightSensor_LineData2, label: "B", color: "rgba(17, 128, 188, 0.8)", pointColor: "rgb(0, 48, 73)" },
    { data: LightSensor_LineData3, label: "C", color: "rgba(255, 99, 71, 0.8)", pointColor: "rgb(139, 0, 0)" },
    { data: LightSensor_LineData4, label: "D", color: "rgb(71, 37, 170)", pointColor: "rgb(12, 0, 49)" },
];

const MoistureDataSets = [
    { data: MoistureSensor_LineData1, label: "A", color: "rgba(0, 133, 27, 0.8)", pointColor: "rgb(0, 51, 10)" },
    { data: MoistureSensor_LineData2, label: "B", color: "rgba(17, 128, 188, 0.8)", pointColor: "rgb(0, 48, 73)" },
    { data: MoistureSensor_LineData3, label: "C", color: "rgba(255, 99, 71, 0.8)", pointColor: "rgb(139, 0, 0)" },
    { data: MoistureSensor_LineData4, label: "D", color: "rgb(71, 37, 170)", pointColor: "rgb(12, 0, 49)" },
];

const SoilMoistureDataSets = [
    { data: SoilMoistureSensor_LineData1, label: "A", color: "rgba(0, 133, 27, 0.8)", pointColor: "rgb(0, 51, 10)" },
    { data: SoilMoistureSensor_LineData2, label: "B", color: "rgba(17, 128, 188, 0.8)", pointColor: "rgb(0, 48, 73)" },
    { data: SoilMoistureSensor_LineData3, label: "C", color: "rgba(255, 99, 71, 0.8)", pointColor: "rgb(139, 0, 0)" },
    { data: SoilMoistureSensor_LineData4, label: "D", color: "rgb(71, 37, 170)", pointColor: "rgb(12, 0, 49)" },
];



type SensorProps = {
    dataSets: { data: { value: number; label: string }[]; label: string; color: string; pointColor: string }[];
    sensorType: string;
};

const Sensor: React.FC<SensorProps> = ({ dataSets, sensorType }) => {
    return (
        <View style={TrendingChartScreen_Style.default.areaContainer}>
            <View style={TrendingChartScreen_Style.default.subHeaderContainer}>
                <Text style={TrendingChartScreen_Style.default.subHeaderText}>{sensorType}</Text>
            </View>

            <View style={TrendingChartScreen_Style.Sensor_Style.chartContainer}>
                <LineChartTemplate dataSets={dataSets} chartTitle={"Giá trị " + sensorType + " giữa các khu vực."} />
            </View>
        </View>
    );
};


const TrendingChart_Screen = () => {
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
        >
            <View style={RealtimeChartScreen_Style.default.headerContainer}>
                <TouchableOpacity
                    style={RealtimeChartScreen_Style.default.backArrow}
                    onPress={() => navigation.goBack()}>
                    <BackArrow></BackArrow>
                </TouchableOpacity>
                <Text style={RealtimeChartScreen_Style.default.headerText}>Biểu đồ xu hướng</Text>
            </View>

            <SearchBar />

            <Sensor dataSets={TemperatureDataSets} sensorType="Cảm biến nhiệt độ" />
            <Sensor dataSets={LightDataSets} sensorType="Cảm biến ánh sáng" />
            <Sensor dataSets={MoistureDataSets} sensorType="Cảm biến độ ẩm" />
            <Sensor dataSets={SoilMoistureDataSets} sensorType="Cảm biến độ ẩm đất" />
        </ScrollView>
    );
};

export default TrendingChart_Screen;