import { COLORS } from "@/constants/Colors";
import { TYPOGRAPHY } from "@/constants/Fonts";
import { SPACING } from "@/constants/Spaces";
import globalStyle from "@/styles/global";
import {
    StyleSheet,
} from "react-native";


export const Sensor_Style = StyleSheet.create({
    scrollView: {
        flexDirection: "row",
        columnGap: 10,
        paddingVertical: 10,
        paddingHorizontal: 5,
    },

    chartContaner: {
        padding: SPACING.medium,
        backgroundColor: COLORS.white,
        width: "20%", maxWidth: 400,
        borderRadius: 16,
        elevation: 5,
    },
});


const RealtimeChartScreen_Style = StyleSheet.create({
    mainContainer: {
        padding: globalStyle.mainPadding.padding,
        gap: 20,
    },

    backArrow: {
        position: "absolute",
        left: 10,
    },

    headerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    headerText: {
        fontFamily: "Roboto-SemiBold",
        fontSize: TYPOGRAPHY.titleFontSize,
        color: COLORS.textPrimary,
    },
});

export default RealtimeChartScreen_Style;