import { COLORS } from "@/constants/Colors";
import { TYPOGRAPHY } from "@/constants/Fonts";
import React from "react";

import {
    StyleSheet,
    Text,
    View,
} from "react-native";

export const Sensor_Style = StyleSheet.create({
    chartContainer: {
        backgroundColor: COLORS.white,
        borderRadius: 16,
        elevation: 5,
        padding: 8,
    },
});

const TrendingChartScreen_Style = StyleSheet.create({
    areaContainer: {
        gap: 10,
    },

    subHeaderContainer: {

    },

    subHeaderText: {
        fontFamily: "Roboto-SemiBold",
        fontSize: TYPOGRAPHY.subTitleFontSize,
        color: COLORS.textPrimary,
    },
});

export default TrendingChartScreen_Style;