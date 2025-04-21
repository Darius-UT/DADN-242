import Top_Header from '@/components/common/Top_Header';
import { getAllZones } from '@/services/api.service';
import * as DataObservation_Style from '@/styles/screens/data-observation/dataObservation';
import * as DeviceControlScreen_Style from '@/styles/screens/device-control/deviceControl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { useNavigation } from 'expo-router';
import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';


// Dữ liệu số lượng + tên các khu vực
const AreaName_Data = [
  { key: "1", value: "A" },
  { key: "2", value: "B" },
  { key: "3", value: "C" },
  { key: "4", value: "D" },
]




interface CardAreaTemplateProps {
  nameArea?: string;
};

const CardAreaTemplate: React.FC<CardAreaTemplateProps> = ({ nameArea = "A" }) => {

  const [] = useFonts({
    "Roboto-ExtraBold": require("@/assets/fonts/Roboto/static/Roboto-ExtraBold.ttf"),
    "Roboto-SemiBold": require("@/assets/fonts/Roboto/static/Roboto-SemiBold.ttf"),
  });

  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity style={DeviceControlScreen_Style.CardAreaTemplate_Style.mainContainer} onPress={() => navigation.navigate("DeviceArea", {areaName: nameArea})}>
      <View style={DeviceControlScreen_Style.CardAreaTemplate_Style.areaTextContainer}>
        <Text style={DeviceControlScreen_Style.CardAreaTemplate_Style.areaText}>Khu {nameArea}</Text>
      </View>
    </TouchableOpacity>
  );
};

const DeviceControlScreen = () => {
  const [] = useFonts({
    "Roboto-ExtraBold": require("@/assets/fonts/Roboto/static/Roboto-ExtraBold.ttf"),
    "Roboto-SemiBold": require("@/assets/fonts/Roboto/static/Roboto-SemiBold.ttf"),
  });
  const [zones, setZones] = React.useState([]);

  const getZones = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      const response:any = await getAllZones(token);
      if (response.statusCode === 200) {
        setZones(response.data);
      } 
    } catch (error) {
      console.error("Error fetching zones:", error);
    }
  };
  const isFocused = useIsFocused(); // Sử dụng useIsFocused để kiểm
  
  useFocusEffect(
    useCallback(() => {
      getZones();
    }, [isFocused])
  );
  return (
    <View>
      {/* Top_Header */}
      <Top_Header></Top_Header>

      <View
        style={DeviceControlScreen_Style.default.overallContainer}>
        {/* Header */}
        <View style={DataObservation_Style.default.headerContainer}>
          <Text style={DataObservation_Style.default.textHeader}>Điều khiển thiết bị</Text>
        </View>

        {/* <View style={DeviceControlScreen_Style.default.cardContainer}>
          <CardAreaTemplate nameArea='A' />
          <CardAreaTemplate nameArea='B' />
          <CardAreaTemplate nameArea='C' />
          <CardAreaTemplate nameArea='D' />
        </View> */}
        <View style={DeviceControlScreen_Style.default.cardContainer}>
          {zones.map((item:any) => (
            <CardAreaTemplate key={item.id} nameArea={item.name} />
          ))}
        </View>
      </View>
    </View>
  );
};

export default DeviceControlScreen;