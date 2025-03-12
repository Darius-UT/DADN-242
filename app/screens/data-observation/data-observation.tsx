import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  Touchable,
  TouchableOpacity,
} from 'react-native'
import Top_Header from '@/components/common/Top_Header';
import { SelectList } from 'react-native-dropdown-select-list';
import * as DataObservation_Style from '@/styles/screens/data-observation/dataObservation';
import { useFonts } from 'expo-font';
import * as Icon from "@/components/ui/IconSymbol";
import * as Home_Style from '@/styles/screens/home/home';
import globalStyle from '@/styles/global';



const dataSelectList = [
  { id: "1", value: "Khu vực A" },
  { id: "2", value: "Khu vực B" },
  { id: "3", value: "Khu vực C" },
  { id: "4", value: "Khu vực D" },
];



const AreaSelectList = () => {
  const [selected, setSelected] = React.useState("");

  return (
    <View style={DataObservation_Style.AreaSelectedList_Style.selectListContainer}>
      <SelectList
        setSelected={setSelected}
        data={dataSelectList}
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
        <Text style={Home_Style.GeneraValue.subTitleText}>Cảnh báo gần đây</Text>
      </View>

      <View style={DataObservation_Style.AverageData_Style.cardContainer}>
        {TemperatureCard(30, 28, 29)}
        {LightCard(30, 28, 29)}
        {TemperatureCard(30, 28, 29)}
        {TemperatureCard(30, 28, 29)}
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
      <ScrollView style={globalStyle.mainPadding}>
        {/* Header */}
        <View style={DataObservation_Style.default.headerContainer}>
          <Text style={DataObservation_Style.default.textHeader}>Quan sát dữ liệu</Text>
        </View>

        {/* SelectList: Chọn khu vực */}
        <AreaSelectList />

        {/* Mục: Giá trị trung bình */}
        <AverageData />
      </ScrollView>

    </View>
  );
};

export default DataObservation;