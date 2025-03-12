import React, { useRef, useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native'
import Top_Header from '@/components/common/Top_Header';
import { SelectList } from 'react-native-dropdown-select-list';
import * as DataObservation_Style from '@/styles/screens/data-observation/dataObservation';
import { useFonts } from 'expo-font';
import * as Icon from "@/components/ui/IconSymbol";
import * as Home_Style from '@/styles/screens/home/home';
import GaugeChart from '@/components/common/GaugeChart';
import { LineChart } from "react-native-gifted-charts";
import { SeeAll_Button } from '@/components/common/Button';
import { useNavigation } from 'expo-router';




const DataSelectList = [
  { id: "1", value: "Khu vực A" },
  { id: "2", value: "Khu vực B" },
  { id: "3", value: "Khu vực C" },
  { id: "4", value: "Khu vực D" },
];

const LightSensor_GaugeData = [
  { id: "1", value: 36, min: 0, max: 100, name: "Cảm biến nhiệt độ A-T1" },
  { id: "2", value: 20, min: 0, max: 100, name: "Cảm biến nhiệt độ A-T2" },
  { id: "3", value: 40, min: 0, max: 100, name: "Cảm biến nhiệt độ A-T3" },
  { id: "4", value: 80, min: 0, max: 100, name: "Cảm biến nhiệt độ A-T4" },
  { id: "5", value: 12, min: 0, max: 100, name: "Cảm biến nhiệt độ A-T5" },
]

const LightSensor_LineData1 = [
  { value: 15, label: '00:00' },
  { value: 20, label: '01:00' },
  { value: 24, label: '02:00' },
  { value: 20, label: '03:00' },
  { value: 18, label: '04:00' },
  { value: 29, label: '05:00' },
  { value: 30, label: '06:00' },
  { value: 34, label: '07:00' },
  { value: 35, label: '08:00' },
  { value: 39, label: '09:00' },
  { value: 29, label: '10:00' },
  { value: 32, label: '11:00' },
];

const LightSensor_LineData2 = [
  { value: 20, label: '00:00' },
  { value: 24, label: '01:00' },
  { value: 25, label: '02:00' },
  { value: 24, label: '03:00' },
  { value: 20, label: '04:00' },
  { value: 19, label: '05:00' },
  { value: 20, label: '06:00' },
  { value: 24, label: '07:00' },
  { value: 25, label: '08:00' },
  { value: 24, label: '09:00' },
  { value: 20, label: '10:00' },
  { value: 19, label: '11:00' },
];

const LightSensor_LineData3 = [
  { value: 30, label: '00:00' },
  { value: 34, label: '01:00' },
  { value: 35, label: '02:00' },
  { value: 39, label: '03:00' },
  { value: 29, label: '04:00' },
  { value: 32, label: '05:00' },
  { value: 15, label: '06:00' },
  { value: 20, label: '07:00' },
  { value: 24, label: '08:00' },
  { value: 20, label: '09:00' },
  { value: 18, label: '10:00' },
  { value: 29, label: '11:00' },
];



const AreaSelectList = () => {
  const [selected, setSelected] = React.useState("");

  return (
    <View style={DataObservation_Style.AreaSelectedList_Style.selectListContainer}>
      <SelectList
        setSelected={setSelected}
        data={DataSelectList}
        save="value"

        boxStyles={DataObservation_Style.AreaSelectedList_Style.selectListBox}
        placeholder="Chọn khu vực"
        searchPlaceholder="Tìm kiếm"

        inputStyles={DataObservation_Style.AreaSelectedList_Style.selectInputText}

        arrowicon={<Icon.ArrowDown />}
        closeicon={<Icon.Cross />}
        searchicon={<Icon.Search />}

        dropdownStyles={DataObservation_Style.AreaSelectedList_Style.selectListDropDownBox}
      />
    </View>

  );
};


const AverageData = () => {
  const [] = useFonts({
    "Roboto-ExtraBold": require("@/assets/fonts/Roboto/static/Roboto-ExtraBold.ttf"),
    "Roboto-SemiBold": require("@/assets/fonts/Roboto/static/Roboto-SemiBold.ttf"),
  });

  const TemperatureCard = (mainData: number, time1: number, time2: number) => {
    return (
      <TouchableOpacity style={DataObservation_Style.AverageData_Style.dataCard}>
        <View style={DataObservation_Style.AverageData_Style.cardName}>
          <Text style={DataObservation_Style.AverageData_Style.cardNameText}>Nhiệt độ</Text>
        </View>

        <View style={DataObservation_Style.AverageData_Style.content}>

          <View style={DataObservation_Style.AverageData_Style.mainContent}>
            <View style={DataObservation_Style.AverageData_Style.mainData}>
              <Text style={DataObservation_Style.AverageData_Style.mainDataText}>{mainData}</Text>
            </View>
            <View style={DataObservation_Style.AverageData_Style.subMainData}>
              <Icon.Degree />
              <Text style={DataObservation_Style.AverageData_Style.subMainDataText}>C</Text>
            </View>
          </View>

          <View style={DataObservation_Style.AverageData_Style.subMainContent}>
            <Text style={DataObservation_Style.AverageData_Style.subMainContentText}>1 phút trước: {time1}</Text>
            <Text style={DataObservation_Style.AverageData_Style.subMainContentText}>30 phút trước: {time2}</Text>
          </View>

        </View>
      </TouchableOpacity>
    );
  };

  const LightCard = (mainData: number, time1: number, time2: number) => {
    return (
      <TouchableOpacity style={DataObservation_Style.AverageData_Style.dataCard}>
        <View style={DataObservation_Style.AverageData_Style.cardName}>
          <Text style={DataObservation_Style.AverageData_Style.cardNameText}>Ánh sáng</Text>
        </View>

        <View style={DataObservation_Style.AverageData_Style.content}>

          <View style={DataObservation_Style.AverageData_Style.mainContent}>
            <View style={DataObservation_Style.AverageData_Style.mainData}>
              <Text style={DataObservation_Style.AverageData_Style.mainDataText}>{mainData}</Text>
            </View>
            <View style={DataObservation_Style.AverageData_Style.subMainData}>
              <Text style={DataObservation_Style.AverageData_Style.subMainDataText}>Lux</Text>
            </View>
          </View>

          <View style={DataObservation_Style.AverageData_Style.subMainContent}>
            <Text style={DataObservation_Style.AverageData_Style.subMainContentText}>1 phút trước: {time1}</Text>
            <Text style={DataObservation_Style.AverageData_Style.subMainContentText}>30 phút trước: {time2}</Text>
          </View>

        </View>
      </TouchableOpacity>
    );
  };

  const MoistureCard = (mainData: number, time1: number, time2: number) => {
    return (
      <TouchableOpacity style={DataObservation_Style.AverageData_Style.dataCard}>
        <View style={DataObservation_Style.AverageData_Style.cardName}>
          <Text style={DataObservation_Style.AverageData_Style.cardNameText}>Độ ẩm</Text>
        </View>

        <View style={DataObservation_Style.AverageData_Style.content}>

          <View style={DataObservation_Style.AverageData_Style.mainContent}>
            <View style={DataObservation_Style.AverageData_Style.mainData}>
              <Text style={DataObservation_Style.AverageData_Style.mainDataText}>{mainData}</Text>
            </View>
            <View style={DataObservation_Style.AverageData_Style.subMainData}>
              <Text style={DataObservation_Style.AverageData_Style.subMainDataText}>%</Text>
            </View>
          </View>

          <View style={DataObservation_Style.AverageData_Style.subMainContent}>
            <Text style={DataObservation_Style.AverageData_Style.subMainContentText}>1 phút trước: {time1}</Text>
            <Text style={DataObservation_Style.AverageData_Style.subMainContentText}>30 phút trước: {time2}</Text>
          </View>

        </View>
      </TouchableOpacity>
    );
  };

  const SoilMoistureCard = (mainData: number, time1: number, time2: number) => {
    return (
      <TouchableOpacity style={DataObservation_Style.AverageData_Style.dataCard}>
        <View style={DataObservation_Style.AverageData_Style.cardName}>
          <Text style={DataObservation_Style.AverageData_Style.cardNameText}>Độ ẩm đất</Text>
        </View>

        <View style={DataObservation_Style.AverageData_Style.content}>

          <View style={DataObservation_Style.AverageData_Style.mainContent}>
            <View style={DataObservation_Style.AverageData_Style.mainData}>
              <Text style={DataObservation_Style.AverageData_Style.mainDataText}>{mainData}</Text>
            </View>
            <View style={DataObservation_Style.AverageData_Style.subMainData}>
              <Text style={DataObservation_Style.AverageData_Style.subMainDataText}>%</Text>
            </View>
          </View>

          <View style={DataObservation_Style.AverageData_Style.subMainContent}>
            <Text style={DataObservation_Style.AverageData_Style.subMainContentText}>1 phút trước: {time1}</Text>
            <Text style={DataObservation_Style.AverageData_Style.subMainContentText}>30 phút trước: {time2}</Text>
          </View>

        </View>
      </TouchableOpacity>
    );
  };


  return (
    <View>
      <View style={Home_Style.GeneraValue.subTitleTextContainer}>
        <Text style={Home_Style.GeneraValue.subTitleText}>Giá trị trung bình</Text>
      </View>

      <View style={DataObservation_Style.AverageData_Style.cardContainer}>
        {TemperatureCard(30, 28, 29)}
        {LightCard(3000, 2800, 2900)}
        {MoistureCard(70, 71, 65)}
        {SoilMoistureCard(40, 45, 34)}
      </View>
    </View>
  );
};


const RealTimeChart = () => {
  const navigation = useNavigation<any>();

  return (
    <View>
      <View style={Home_Style.GeneraValue.subTitleTextContainer}>
        <Text style={Home_Style.GeneraValue.subTitleText}>Biểu đồ thời gian thực</Text>
      </View>

      <ScrollView
        style={{ maxHeight: 220, }}
        contentContainerStyle={DataObservation_Style.RealTimeChart_Style.container}
        horizontal={true}
        onStartShouldSetResponderCapture={() => true}
        nestedScrollEnabled={true}>
        {LightSensor_GaugeData.map((sensor) => (
          <GaugeChart
            key={sensor.id}
            value={sensor.value}
            min={sensor.min}
            max={sensor.max}
            name={sensor.name}
          />
        ))}
      </ScrollView>

      <SeeAll_Button name="Xem toàn bộ" onPressed={() => navigation.navigate("RealTimeChart_Screen")} />
    </View>
  );
};


const TrendingChart = () => {
  const scrollRef = useRef(null);
  const minValue = Math.min(...LightSensor_LineData1.map(d => d.value));
  const maxValue = Math.max(...LightSensor_LineData1.map(d => d.value));
  const navigation = useNavigation<any>();

  return (
    <View>
      <View style={Home_Style.GeneraValue.subTitleTextContainer}>
        <Text style={Home_Style.GeneraValue.subTitleText}>Biểu đồ xu hướng</Text>
      </View>

      <View style={DataObservation_Style.TrendingChart_Style.container}>
        <LineChart
          data={LightSensor_LineData1}
          data2={LightSensor_LineData2}
          data3={LightSensor_LineData3}

          thickness={3}
          height={300}
          spacing={50}

          // Màu sắc đường
          color1="rgba(0, 133, 27, 0.8)"
          color2="rgba(17, 128, 188, 0.8)"

          // Điểm dữ liệu
          dataPointsColor1="rgb(0, 51, 10)"
          dataPointsColor2="rgb(0, 48, 73)"
          dataPointsRadius={4}

          // Hiệu ứng gradient
          curved

          // Lưới và focus
          showVerticalLines
          verticalLinesColor="rgba(0, 0, 0, 0.1)"
          xAxisColor="rgba(0, 0, 0, 0.2)"
          yAxisColor="rgba(0, 0, 0, 0.2)"
          focusEnabled

          adjustToWidth
          yAxisOffset={minValue - 10}
          yAxisLabelTexts={[
            (minValue - 5).toString(),
            minValue.toString(),
            ((minValue + maxValue) / 2).toString(),
            maxValue.toString(),
            (maxValue + 5).toString()
          ]}

          // Gán ref cho biểu đồ
          scrollRef={scrollRef}
        />
        <Text style={DataObservation_Style.TrendingChart_Style.lineChartName}>Giá trị đo được của các cảm biến nhiệt độ khu A</Text>
      </View>

      <SeeAll_Button name="Xem toàn bộ" onPressed={() => navigation.navigate("RealTimeChart_Screen")} />
    </View>
  );
};


const OverThresoldChart = () => {
  return (
    <View>
      <View style={Home_Style.GeneraValue.subTitleTextContainer}>
        <Text style={Home_Style.GeneraValue.subTitleText}>Biểu đồ tỷ lệ vượt ngưỡng</Text>
      </View>
    </View>
  );
};


const DataObservation = () => {
  const [] = useFonts({
    "Roboto-ExtraBold": require("@/assets/fonts/Roboto/static/Roboto-ExtraBold.ttf"),
    "Roboto-SemiBold": require("@/assets/fonts/Roboto/static/Roboto-SemiBold.ttf"),
  });

  return (
    <View>
      {/* Header */}
      <Top_Header />

      {/* Data Observation */}
      <ScrollView
        contentContainerStyle={DataObservation_Style.default.scrollView}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={true}
      >
        {/* Header */}
        <View style={DataObservation_Style.default.headerContainer}>
          <Text style={DataObservation_Style.default.textHeader}>Quan sát dữ liệu</Text>
        </View>

        {/* SelectList: Chọn khu vực */}
        <AreaSelectList />

        {/* Mục: Giá trị trung bình */}
        <AverageData />

        {/* Mục: Biểu đồ thời gian thực */}
        <RealTimeChart />

        {/* Mục: Biểu đồ xu hướng */}
        <TrendingChart />

        {/* Mục: Biểu đồ tỷ lệ vượt ngưỡng */}
        <OverThresoldChart />
      </ScrollView>

    </View>
  );
};

export default DataObservation;