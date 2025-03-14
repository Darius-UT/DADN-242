import { COLORS } from "@/constants/Colors";
import { TYPOGRAPHY } from "@/constants/Fonts";
import globalStyle from "@/styles/global";
import { StyleSheet } from "react-native";


export const AreaSelectedList_Style = StyleSheet.create({
    selectListContainer: {
        alignItems: "center",
        justifyContent: "center",
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
        position: "absolute",
        zIndex: 10000,
        top: "100%",
        left: 0,
        right: 0,
        backgroundColor: COLORS.background,
        borderColor: COLORS.background,
        elevation: 5,
    }
});

export const AverageData_Style = StyleSheet.create({
    dataCard: {
        backgroundColor: COLORS.lightSecondary,
        width: "95%", maxWidth: 350,
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
        justifyContent: "space-between",
        paddingHorizontal: 40,
    },

    mainContent: {
        flexDirection: "row",
        alignItems: "center",
    },

    mainData: {

    },

    mainDataText: {
        fontFamily: "Roboto-SemiBold",
        fontSize: TYPOGRAPHY.titleFontSize + 15,
    },

    subMainData: {
        alignSelf: "flex-end",
        bottom: 8,
        gap: 6,
    },

    subMainDataText: {
        fontFamily: "Roboto-SemiBold",
        fontSize: TYPOGRAPHY.subTitleFontSize - 2,
    },

    subMainContent: {
        alignItems: "flex-end",
        gap: 5,
    },

    subMainContentText: {
        fontSize: TYPOGRAPHY.baseFontSize,
    },

    cardContainer: {
        width: "100%",
        justifyContent: "space-evenly",
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        rowGap: 10,
        paddingTop: 10,
    },
});

export const RealTimeChart_Style = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexGrow: 1,
    },
});

export const TrendingChart_Style = StyleSheet.create({
    container: {
        // height: 500,
        paddingTop: 10,
        flexDirection: "column",
        alignItems: "center",
        rowGap: 8,
    },

    chartContainer: {
        
    },

    lineChartName: {
        color: COLORS.textPrimary,
        fontWeight: 500,
    },
});

export const OverThresoldChart_Style = StyleSheet.create({
    progressChartContainer: {
       alignItems: "center",
    },

    noteContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        padding: 8,
    },

    noteElementContainer: {
        flexDirection: "row",
        width: "50%",
        alignItems: "center",
    },
});

const DataObservation_Style = StyleSheet.create({
    scrollView: {
        padding: globalStyle.mainPadding.padding,
        flexGrow: 1,
        gap: 18,
        paddingBottom: 100,
    },

    headerContainer: {
        alignItems: "center",
    },

    textHeader: {
        fontFamily: "Roboto-ExtraBold",
        fontSize: TYPOGRAPHY.titleFontSize,
        color: COLORS.textPrimary,
    },
});

export default DataObservation_Style;