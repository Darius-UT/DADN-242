import RealtimeChartScreen_Style from "@/styles/screens/data-observation/realTimeChart";
import React from "react";
import {
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useFonts } from "expo-font";
import { useNavigation } from "expo-router";

const RealTimeChart_Screen = () => {
    // const navigation = useNavigation<any>();
    
    const [] = useFonts({
        "Roboto-ExtraBold": require("@/assets/fonts/Roboto/static/Roboto-ExtraBold.ttf"),
        "Roboto-SemiBold": require("@/assets/fonts/Roboto/static/Roboto-SemiBold.ttf"),
    });

    return (
        <View style={RealtimeChartScreen_Style.mainContainer}>
            <View style={RealtimeChartScreen_Style.headerContainer}>
                <Text style={RealtimeChartScreen_Style.headerText}>Biểu đồ thời gian thực</Text>
            </View>
        </View>
    );
};

export default RealTimeChart_Screen;