import globalStyle from "@/styles/global";
import { StyleSheet } from "react-native";

const AdminUserList_Style = StyleSheet.create({
    overallContainer: {
        padding: globalStyle.mainPadding.padding,
        flexDirection: "column",
        alignItems: "center",
        // rowGap: 5,
        // backgroundColor: COLORS.background,
        flex: 1,
    },
});

export default AdminUserList_Style;