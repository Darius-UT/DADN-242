import { COLORS } from "@/constants/Colors";
import { TYPOGRAPHY } from "@/constants/Fonts";
import globalStyle from "@/styles/global";
import { StyleSheet } from "react-native";

export const UserBoxTemplate_Style = StyleSheet.create ({
    container: {
        width: "100%",
        height: 80,
        // backgroundColor: COLORS.white,
        // borderRadius: 8,
        // elevation: 5,
        padding: 8,

        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },

    avatarContainer: {
        width: 60,
        height: 60,
        borderRadius: 100,
        backgroundColor: COLORS.darkerBackground,
        overflow: "hidden",
    },
    avatarImage: {
        width: "100%",
        height: "100%",
    },

    nameContainer: {
        flexDirection: "column",
        gap: 2, 
    },
    userNameText: {
        fontFamily: "Roboto-SemiBold",
        fontSize: TYPOGRAPHY.subTitleFontSize - 2,
        maxWidth: 170,
    },
    fullNameText: {
        fontFamily: "Roboto",
        fontSize: TYPOGRAPHY.subTitleFontSize - 4,
        maxWidth: 170,
    },
    
    editButtonContainer: {
        paddingVertical: 6,
        paddingHorizontal: 40,
        backgroundColor: COLORS.secondary,
        borderRadius: 8,
        marginLeft: 10,
        position: "absolute",
        right: "9%",
    },
    editButtonText: {
        color: COLORS.white,
    },

    threeDotsContainer: {
        position: "absolute",
        right: "2%",
    },
    threeDotsText: {
        
        fontSize: TYPOGRAPHY.titleFontSize,
    },
    
});

const EngineerUserList_Style = StyleSheet.create ({
    overallContainer: {
        padding: globalStyle.mainPadding.padding,
        flexDirection: "column",
        alignItems: "center",
        // rowGap: 5,
        // backgroundColor: COLORS.background,
        flex: 1,
    },
});

export default EngineerUserList_Style;