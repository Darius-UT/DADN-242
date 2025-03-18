import { COLORS } from "@/constants/Colors";
import { TYPOGRAPHY } from "@/constants/Fonts";
import globalStyle from "@/styles/global";
import { StyleSheet } from "react-native"

const UserAddScreen_Style = StyleSheet.create({
    overallContainer: {
        padding: globalStyle.mainPadding.padding + 5,
        gap: 8,
    },

    titleContainer: {
        flexDirection: "row",
        justifyContent: "center",
    },

    titleText: {
        fontFamily: "Roboto-SemiBold",
        fontSize: TYPOGRAPHY.titleFontSize - 5,
        color: COLORS.textPrimary,
    },

    textInputContainer: {
        flexDirection: "column",
        rowGap: 10,
    },

    confirmButtonContainer: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        backgroundColor: COLORS.secondary,
        alignItems: "center",
        borderRadius: 100,
        marginTop: 15,
    },

    confirmButtonText: {
        fontFamily: "Roboto-SemiBold",
        fontSize: TYPOGRAPHY.buttonFontSize,
        color: COLORS.white,
    },

    rejectButtonContainer: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        backgroundColor: COLORS.Red,
        alignItems: "center",
        borderRadius: 100,
        marginTop: 5,
    },

    rejectButtonText: {
        fontFamily: "Roboto-SemiBold",
        fontSize: TYPOGRAPHY.buttonFontSize,
        color: COLORS.white,
    },
});

export default UserAddScreen_Style;