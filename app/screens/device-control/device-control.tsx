import Top_Header from '@/components/common/Top_Header';
import * as DataObservation_Style from '@/styles/screens/data-observation/dataObservation';
import * as DeviceControlScreen_Style from '@/styles/screens/device-control/deviceControl';
import { useFonts } from 'expo-font';
import { useNavigation } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


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
    <TouchableOpacity style={DeviceControlScreen_Style.CardAreaTemplate_Style.mainContainer} onPress={() => navigation.navigate("DeviceArea")}>
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

  return (
    <View>
      {/* Top_Header */}
      <Top_Header></Top_Header>

      <ScrollView
        contentContainerStyle={DeviceControlScreen_Style.default.overallContainer}>
        {/* Header */}
        <View style={DataObservation_Style.default.headerContainer}>
          <Text style={DataObservation_Style.default.textHeader}>Điều khiển thiết bị</Text>
        </View>

        <View style={DeviceControlScreen_Style.default.cardContainer}>
          <CardAreaTemplate nameArea='A' />
          <CardAreaTemplate nameArea='B' />
          <CardAreaTemplate nameArea='C' />
          <CardAreaTemplate nameArea='D' />
        </View>
      </ScrollView>
    </View>
  );
};

export default DeviceControlScreen;