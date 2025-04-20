import { COLORS } from "@/constants/Colors";
import { TYPOGRAPHY } from "@/constants/Fonts";
import globalStyle from "@/styles/global";
import { StyleSheet } from "react-native";

export const Template_Input_Information = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: COLORS.primary,
        paddingVertical: 6,
        paddingHorizontal: 15,
    },

    titleText: {
        fontSize: TYPOGRAPHY.subTitleFontSize - 3,
        color: COLORS.textPrimary,
        opacity: 0.6,
        marginLeft: 1,
    },

    inputContainer: {
        marginTop: -2,
        marginBottom: -2,
        fontSize: TYPOGRAPHY.baseFontSize + 4,
        width: "90%",
    },

    editButton: {
        position: "absolute",
        right: 10,
        top: "50%",
        bottom: "50%",
    }
});

const EditInformation_Style = StyleSheet.create({
    overallContainer: {
        backgroundColor: COLORS.background,
        padding: globalStyle.mainPadding.padding,
        rowGap: 15,
        paddingBottom: 50,
    },

    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },

    headerText: {
        fontFamily: "Roboto-ExtraBold",
        fontSize: TYPOGRAPHY.titleFontSize - 5,
        color: COLORS.textPrimary,
    },

    detailContainer: {
        gap: 10,
    },


    editAvatarContainer: {
        alignItems: "center",
    },

    editAvatarHeaderContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignSelf: "stretch",
        marginBottom: 5,
    },

    editAvatarHeaderText: {
        fontFamily: "Roboto-SemiBold",
        fontSize: TYPOGRAPHY.subTitleFontSize - 2,
        color: COLORS.textPrimary,
    },

    avatarContainer: {
        width: 130,
        height: 130,
        borderWidth: 3,
        borderColor: COLORS.primary,
        borderRadius: 100,
        overflow: "hidden",
    },

    avatarImage: {
        flex: 1,
    },

    rowLine: {
        width: "100%",
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.textPrimary,
        opacity: 0.3,
    },

    backgroundImage: {

    }
});

export default EditInformation_Style;