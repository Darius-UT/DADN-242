import { COLORS } from "@/constants/Colors";
import { TYPOGRAPHY } from "@/constants/Fonts";
import globalStyle from "@/styles/global";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const PersonalInformation_Style = StyleSheet.create({
    rowElement: {
        flexDirection: "row",
        columnGap: 20,
    },

    indexTitleText: {
        width: "30%",
        fontFamily: "Roboto-SemiBold",
    },

    indexContentText: {
        width: "60%",
    },

    container: {
        marginTop: 25,
    },

    titleText: {
        fontFamily: "Roboto-SemiBold",
        fontSize: TYPOGRAPHY.subTitleFontSize,
        color: COLORS.textPrimary,
    },

    contentContainer: {
        gap: 8,
        marginTop: 5,
        marginLeft: 20,
    },
});


export const Setting_Style = StyleSheet.create({
    rowContainer: {
        gap: 8,
        marginTop: 5,
        marginLeft: 20,
        flexDirection: "row",
        alignItems: "center",
    },

    switch: {
        width: "60%",
    },
});


const ProfileScreen_Style = StyleSheet.create({
    container: {
        // padding: globalStyle.mainPadding.padding,
        backgroundColor: COLORS.white,
    },

    backgroundImageContainer: {
        width: width,
        height: 180,
        elevation: 10,
        overflow: "hidden",
    },

    backgroundImage: {
        width: width,
        height: "100%",
    },

    avatarImageContainer: {
        width: 130,
        height: 130,
        borderRadius: 100,
        zIndex: 100,
        overflow: "hidden",
        position: "absolute",
        top: 135,
        left: 16,

        borderWidth: 4,
        borderColor: COLORS.white,
    },

    avatarImage: {
        width: "100%",
        height: "100%",
    },

    userInformationContainer: {
        marginLeft: 155,
        marginTop: 5,
        gap: 5,
    },

    userNameText: {
        fontFamily: "Roboto-SemiBold",
        fontSize: TYPOGRAPHY.subTitleFontSize + 2,
    },

    userRoleText: {

    },

    mainContentContainer: {
        marginTop: 25,
        padding: globalStyle.mainPadding.padding,
    },

    logoutButtonContainer: {
        alignItems: "center",
        marginTop: 100
    },

    logoutButton: {
        width: "40%", maxWidth: 200,
        backgroundColor: COLORS.Red,
        paddingVertical: 10,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
    },

    logoutButtonText: {
        fontFamily: "Roboto-SemiBold",
        fontSize: TYPOGRAPHY.buttonFontSize,
        color: COLORS.white,
    },
});

export default ProfileScreen_Style;