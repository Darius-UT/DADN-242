import { COLORS } from "@/constants/Colors";
import { TYPOGRAPHY } from "@/constants/Fonts";
import globalStyle from "@/styles/global";
import { StyleSheet } from "react-native"

const UserAddScreen_Style = StyleSheet.create({
    overallContainer: {
        padding: globalStyle.mainPadding.padding,
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
});

export default UserAddScreen_Style;