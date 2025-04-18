import { StyleSheet } from "react-native";
import { TYPOGRAPHY } from "../constants/Fonts";
import { COLORS } from  "../constants/Colors"

const globalStyle = StyleSheet.create ({
    background: {
        flex: 1,
    },

    mainPadding: {
        padding: 16
    },

    titleText: {
        fontSize: TYPOGRAPHY.titleFontSize,
        color: COLORS.textPrimary,
        fontWeight: 900
    },

    subTitleText: {
        fontSize: TYPOGRAPHY.subTitleFontSize,
        color: COLORS.textPrimary,
        fontWeight: 600
    },

    normalText: {
        fontSize: TYPOGRAPHY.baseFontSize,
        color: COLORS.black,
    },

    buttonText: {
        fontSize: TYPOGRAPHY.buttonFontSize,
        color: COLORS.white,
        fontWeight: 600
    }
});

export default globalStyle;