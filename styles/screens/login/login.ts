import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/Colors";
import { TYPOGRAPHY } from "@/constants/Fonts"

const LoginStyle = StyleSheet.create({
    background: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },

    container: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },

    logo: {
        width: 200,
        height: 200,
    },

    appName: {
        color: "white",
        fontFamily: "TheNautigal-Bold",
        fontSize: 100,
        marginBottom: 200,
    },

    loginButton: {
        backgroundColor: COLORS.white,
        paddingVertical: 13,
        paddingHorizontal: 65,
        borderRadius: 100,
        flexShrink: 0,

        shadowColor: "black",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 1,
        elevation: 10,
    },

    loginText: {
        color: COLORS.textPrimary,
        fontFamily: "Roboto-Bold",
        fontSize: TYPOGRAPHY.buttonFontSize,
    },

});

export default LoginStyle;