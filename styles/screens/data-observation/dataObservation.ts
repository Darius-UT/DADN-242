import { COLORS } from "@/constants/Colors";
import { TYPOGRAPHY } from "@/constants/Fonts";
import { StyleSheet } from "react-native";

const DataObservation_Style = StyleSheet.create({
    headerContainer: {
        alignItems: "center",
        paddingVertical: 10.
    },

    textHeader: {
        fontFamily: "Roboto-ExtraBold",
        fontSize: TYPOGRAPHY.titleFontSize,
        color: COLORS.textPrimary,
    },
});

export default DataObservation_Style;