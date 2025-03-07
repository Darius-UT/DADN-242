import { StyleSheet } from "react-native";
import globalStyle from "@/styles/global";
import { COLORS } from "@/constants/Colors";
import { TYPOGRAPHY } from "@/constants/Fonts";
import { SPACING } from "@/constants/Spaces";


export const GeneraValue = StyleSheet.create({
    subTitleTextContainer: {
        paddingTop: 20
    },

    subTitleText: {
        fontFamily: "Roboto-SemiBold",
        fontSize: TYPOGRAPHY.subTitleFontSize,
        color: COLORS.textPrimary,
    },

    dataCardContainer: {
        width: "48%",
        height: 130,
        backgroundColor: COLORS.lightSecondary,
        borderRadius: 10,
        // Bóng đổ iOS
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        // Bóng đổ Android
        elevation: 6,

        padding: SPACING.small,
    },

    dataCard_Area_Container: {
        flexDirection: "row",
        justifyContent: "center",
    },

    dataCard_Area: {
        fontFamily: "Roboto-ExtraBold",
        fontSize: TYPOGRAPHY.subTitleFontSize + 2,
        color: COLORS.textPrimary,
        paddingBottom: 5,
    },

    dataCard_rowElement: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },

    dataCard_nameElement: {

    },

    dataCard_dataElement: {
        
    },

    scrollViewContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        paddingVertical: 10,
        paddingHorizontal: 5,
        rowGap: 15
    }
});

export const LatelyNotification = StyleSheet.create({
    noti_element_container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 10
    },

    noti_level: {
        width: 47,
        height: 47,
        backgroundColor: COLORS.Yello,
        borderRadius: 100,
    },

    noti_content_container: {
        width: "72%",
    },

    noti_3dots: {
        fontSize: 25,
        position: "absolute",
        right: 8,
        top: -13,
    },

    noti_time: {
        fontSize: TYPOGRAPHY.baseFontSize,
    },

    scrollViewContainer: {
        gap: 10,
    },

    expandButton: {
        paddingVertical: 10,
        backgroundColor: COLORS.darkerBackground,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        borderRadius: 8,
    },

    buttonText: {
        // fontFamily: "Roboto-SemiBold",
        fontSize: TYPOGRAPHY.buttonFontSize,
    },
});

export const deviceState = StyleSheet.create({
    tableContainer: {
        gap: 5,
    },

    headerRow: {
        flexDirection: "row",
        justifyContent: "space-evenly",
    },

    headerText: {
        width: "40%",
        textAlign: "center",
    },

    headerActive: {
        width: "30%",
    },

    headerError: {
        width: "20%",
    },

    listRow: {
        flexDirection: "row",
        paddingVertical: 10,
        backgroundColor: COLORS.lightSecondary,
        marginVertical: 4,
        borderRadius: 8,
        justifyContent: "space-evenly",
    },

    listCell: {
        width: "40%",
        alignSelf: "center",
    },

    active: {
        width: "30%",
        textAlign: "center",
        color: "#148B10",
    },

    error: {
        width: "20%",
        textAlign: "center",
        color: COLORS.Red,
    },
});

const Home_Style = StyleSheet.create({
    mainPadding: {
        padding: globalStyle.mainPadding.padding,
    },

    titleTextContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        paddingBottom: 10
    },

    titleText: {
        color: COLORS.textPrimary,
        fontFamily: "Roboto-ExtraBold",
        fontSize: TYPOGRAPHY.titleFontSize,
    },

    inforStatusContainer: {
        gap: 5,
    },

    subInforStatusContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },

    smallDotHeader: {
        width: 14,
        height: 14,
        backgroundColor: COLORS.textSecondary,
        borderRadius: 100,
    }
});

export default Home_Style;