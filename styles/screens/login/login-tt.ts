import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants/Colors";
import { TYPOGRAPHY } from "../../../constants/Fonts"
import globalStyle from "../../../styles/global";

const Login_TT_Style = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },

    topContainer: {
        width: "100%",
        height: 150,
        padding: globalStyle.mainPadding.padding,

        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    bottomContainer: {
        width: "100%",
        height: "85%",
        backgroundColor: "white",
        borderRadius: 40,
        padding: globalStyle.mainPadding.padding,

        alignItems: "center",
    },

    logo: {
        width: 90,
        height: 90,
        marginTop: 30,
    },

    appName: {
        color: "white",
        fontFamily: "TheNautigal-Bold",
        fontSize: 80,
        marginTop: 20,
    },

    loginText: {
        color: COLORS.textPrimary,
        fontFamily: "Roboto-Bold",
        fontSize: TYPOGRAPHY.titleFontSize,
        marginBottom: 40,
    },

    inputContainer: {
        width: "90%",
        height: "auto",
        gap: 25,
    },

    inputText: {
        color: COLORS.textPrimary,
        fontFamily: "Roboto-Bold",
        fontSize: 15,
    },

    input: {
        borderBottomWidth: 1,
        borderBottomColor: COLORS.primary,
        paddingBottom: 1,
    },

    forgotPassword: {
        alignItems: "flex-end",
    },

    loginButton: {
        marginTop: 40,
        paddingVertical: 13,
        paddingHorizontal: 65,
        backgroundColor: COLORS.secondary,
        borderRadius: 100
    },

    lastLoginText: {
        color: COLORS.white,
        fontFamily: "Roboto-Bold",
        fontSize: TYPOGRAPHY.subTitleFontSize,
    },

    contact: {
        alignSelf: "flex-end",
        alignItems: "flex-end",
        marginTop: 220,
        gap: 5,
    }

});

export default Login_TT_Style;