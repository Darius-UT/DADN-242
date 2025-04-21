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

    indexContentTextEdit: {
        width: "60%",
        borderBottomWidth: 1,
        borderBottomColor: COLORS.primary,
        paddingBottom: 1,
    },
    indexContentText: {
        width: "60%",
    },

    container: {
        marginTop: 10,
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
        backgroundColor: COLORS.background,
        paddingBottom: 100
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
        top: 145,
        left: 10,

        borderWidth: 4,
        borderColor: COLORS.white,
    },

    avatarImage: {
        width: "100%",
        height: "100%",
    },

    userInformationContainer: {
        marginLeft: 150,
        marginTop: 5,
        gap: 3,
    },

    userNameText: {
        fontFamily: "Roboto-SemiBold",
        fontSize: TYPOGRAPHY.subTitleFontSize + 2,
    },

    fullNameText: {
        fontFamily: "Roboto-SemiBold",
        fontSize: TYPOGRAPHY.subTitleFontSize - 2,
    },

    userRoleText: {

    },

    mainContentContainer: {
        padding: globalStyle.mainPadding.padding,
    },

    editButtonView: {
        alignItems: "center",
    },

    editButtonContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,

        width: "90%",
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderRadius: 5,
    },

    editButtonText: {
        fontFamily: "Roboto-SemiBold",
        fontSize: TYPOGRAPHY.buttonFontSize,
        color: COLORS.textPrimary,
    },


    logoutButtonContainer: {
        alignItems: "center",
        marginTop: 15,
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