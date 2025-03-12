import { COLORS } from "@/constants/Colors";
import { TYPOGRAPHY } from "@/constants/Fonts";
import globalStyle from "@/styles/global";
import React from "react";

import {
    StyleSheet,
    Text,
    View,
} from "react-native";

const RealtimeChartScreen_Style = StyleSheet.create({
    mainContainer: {
        padding: globalStyle.mainPadding.padding,
        backgroundColor: COLORS.background,
    },

    headerContainer: {
        justifyContent: "center",
        alignItems: "center",
    },

    headerText: {
        fontFamily: "Roboto_SemiBold",
        fontSize: TYPOGRAPHY.titleFontSize,
    },
});

export default RealtimeChartScreen_Style;