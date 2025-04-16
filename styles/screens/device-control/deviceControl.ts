import { COLORS } from "@/constants/Colors";
import { TYPOGRAPHY } from "@/constants/Fonts";
import globalStyle from "@/styles/global";
import { StyleSheet } from "react-native";


export const CardAreaTemplate_Style = StyleSheet.create ({
    mainContainer: {
        width: "48%",
        height: 100,
        backgroundColor: COLORS.lightSecondary,
        elevation: 5,
        borderRadius: 10,
        padding: 8,
        justifyContent: "center",
        alignItems: "center",
    },

    areaTextContainer: {
        
    },

    areaText: {
        fontFamily: "Roboto-SemiBold",
        fontSize: TYPOGRAPHY.subTitleFontSize + 3,
        color: COLORS.textPrimary,
    },
});

const DeviceControlScreen_Style = StyleSheet.create ({
    overallContainer: {
        padding: globalStyle.mainPadding.padding,
    },

    cardContainer: {
        justifyContent: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        rowGap: 10,
        columnGap: 10,
    },
});

export default DeviceControlScreen_Style;