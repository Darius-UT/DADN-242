import { COLORS } from "@/constants/Colors";
import { TYPOGRAPHY } from "@/constants/Fonts";
import globalStyle from "@/styles/global";
import { StyleSheet } from "react-native";


export const AreaSelectedList_Style = StyleSheet.create({
    selectListContainer: {
        width: "100%",
        alignItems: "center",
    },

    selectListBox: {
        width: "50%",
        borderRadius: 100,
        backgroundColor: COLORS.primary,
    },

    selectInputText: {
        color: COLORS.white,
    },

    selectListDropDownBox: {

    }
});

export const AverageData_Style = StyleSheet.create({
    dataCard: {
        backgroundColor: COLORS.lightSecondary,
        width: "49%", maxWidth: 300,
        height: 100,
        borderRadius: 10,
        padding: 8,
        // Bóng đổ iOS
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        // Bóng đổ Android
        elevation: 6,
    },

    cardName: {
        alignItems: "center",
        
    },

    cardNameText: {
        fontFamily: "Roboto-SemiBold",
        fontSize: TYPOGRAPHY.subTitleFontSize,
        color: COLORS.textPrimary,
    },

    content: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
    },

    mainContent: {
        flexDirection: "row",
        alignItems: "center",
    },

    mainData: {
        
    },

    mainDataText: {
        fontFamily: "Roboto-SemiBold",
        fontSize: TYPOGRAPHY.titleFontSize + 10,
    },

    subMainData: {
        alignSelf: "flex-end",
        bottom: 8,
        gap: 4,
    },

    subMainDataText: {
        fontFamily: "Roboto-SemiBold",
        fontSize: TYPOGRAPHY.subTitleFontSize - 2,
    },

    subMainContent: {
        alignItems: "flex-end",
    },

    subMainContentText: {
        fontSize: TYPOGRAPHY.baseFontSize,
    },
    
    cardContainer: {
        width: "100%",
        height: 210,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        rowGap: 10,
    },
});

const DataObservation_Style = StyleSheet.create({
    headerContainer: {
        alignItems: "center",
        paddingBottom: 10,
    },

    textHeader: {
        fontFamily: "Roboto-ExtraBold",
        fontSize: TYPOGRAPHY.titleFontSize,
        color: COLORS.textPrimary,
    },
});

export default DataObservation_Style;