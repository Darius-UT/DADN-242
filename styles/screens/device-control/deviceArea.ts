import { BackArrow } from "@/components/ui/IconSymbol";
import { COLORS } from "@/constants/Colors";
import { TYPOGRAPHY } from "@/constants/Fonts";
import globalStyle from "@/styles/global";
import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import { Dimensions } from "react-native";
const width = Dimensions.get('window').width;


export const deviceListTemplate_Style = StyleSheet.create({
    overalContainer: {
        // rowGap: 15,
    },

    typeBarContainer: {
        flexDirection: "row",
        justifyContent: "space-between",

        paddingVertical: 10,
        paddingHorizontal: 8,
        borderRadius: 5,

        backgroundColor: COLORS.secondary,
        marginBottom: 5,
    },

    barText: {
        color: COLORS.white,
        fontFamily: "Roboto-SemiBold",
        fontSize: TYPOGRAPHY.subTitleFontSize - 3,
    },

    listContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    cellContainer: {
        width: `${(65 / 100) / 3 * 100}%`,
        height: 35,
        textAlign: "center",
    }
});

const DeviceAreaScreen_Style = StyleSheet.create({
    mainContainer: {
        padding: globalStyle.mainPadding.padding,
    },

    backArrow: {
        position: "absolute",
        left: 10,
        top: 6,
    },

    headerText: {
        fontFamily: "Roboto-SemiBold",
        fontSize: TYPOGRAPHY.titleFontSize,
        color: COLORS.textPrimary,

        textAlign: "center",
        zIndex: -1,
        marginBottom: 16,
    },

    sectionListContainer: {
        // paddingBottom: 120,
    }
});

export default DeviceAreaScreen_Style;