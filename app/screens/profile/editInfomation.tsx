import React, { useState } from "react";
import { Text } from "react-native-animatable";
import { View } from "react-native";
import * as EditInformation_Style from "@/styles/screens/profile/editInformation";
import { BackArrow, Edit, Tick } from "@/components/ui/IconSymbol";
import { Alert, TouchableOpacity } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { Image } from "react-native";
import { COLORS } from "@/constants/Colors";
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from "expo-router";


const FullName = "Nguyễn Lê Hoàng Phúc";
const UserName = "Huangfu_1204"
const UserEmail = "Phuc.nguyenlehoang707@hcmut.edu.vn";
const UserPhoneNumber = "0766909533";

const defaultAvatarImage = "https://thuvienanime.net/wp-content/uploads/2024/11/tu-ba-ba-tu-au-u-thuvienanime-9.jpg";
const defaultBackgroundImage = "https://thuvienanime.net/wp-content/uploads/2024/10/muc-than-ky-thuvienanime-1.jpg";



interface TemplateInputProps {
    title: string;
    value: string;
    setValue: (value: string) => void;
}

const Template_Input_Information: React.FC<TemplateInputProps> = ({ title, value, setValue }) => {

    // useState đánh dấu textInput có edit được không
    const [editable, setEditable] = useState<boolean>(false);
    const [oldValue, setOldValue] = useState<string>(value);

    const AlertWhenChangeInformation = () => {
        Alert.alert(
            "Xác nhận",
            "Bạn có chắc chắn muốn thay đổi thông tin này?",
            [
                { text: "Hủy", style: "cancel", onPress: () => { setValue(oldValue), setEditable(false) } },
                { text: "Đổi", style: "default", onPress: () => { setEditable(false) } },
            ],
            { cancelable: true }
        );
    };

    return (
        <View style={[EditInformation_Style.Template_Input_Information.container, { borderColor: editable ? COLORS.primary : COLORS.darkerBackground }]}>
            <Text style={EditInformation_Style.Template_Input_Information.titleText}>{title}</Text>
            <TextInput
                value={value}
                style={[EditInformation_Style.Template_Input_Information.inputContainer,
                { opacity: editable ? 1 : 0.6 }
                ]}
                editable={editable}
                onChangeText={(myText) => setValue(myText)}
            />
            <TouchableOpacity
                style={EditInformation_Style.Template_Input_Information.editButton}
                onPress={() => {
                    if (editable) {
                        AlertWhenChangeInformation();
                    } else {
                        setOldValue(value);
                        setEditable(true);
                    }
                }}
            >
                {!editable ? <Edit /> : <Tick />}
            </TouchableOpacity>
        </View>
    )
};


// HÀM CHÍNH
const EditInformation_Screen = () => {

    const navigation = useNavigation<any>();

    const [currentFullName, setCurrentFullName] = useState<string>(FullName);
    const [currentUserName, setCurrentUserName] = useState<string>(UserName);
    const [currentUserEmail, setCurrentUserEmail] = useState<string>(UserEmail);
    const [currentUserPhone, setCurrentUserPhone] = useState<string>(UserPhoneNumber);

    // useState lưu trữ link ảnh đại diện, ảnh bìa
    const [avatarUri, setAvatarUri] = useState<string>(defaultAvatarImage);
    const [backgroundUri, setBackgroundUri] = useState<string>(defaultBackgroundImage);

    const pickAvatarImage = async () => {
        // Yêu cầu quyền truy cập thư viện
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            alert("Bạn cần cấp quyền truy cập thư viện để chọn ảnh.");
            return;
        }

        // Mở thư viện chọn ảnh
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setAvatarUri(result.assets[0].uri); // Cập nhật ảnh
        }
    };

    const pickBackgroundImage = async () => {
        // Yêu cầu quyền truy cập thư viện
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            alert("Bạn cần cấp quyền truy cập thư viện để chọn ảnh.");
            return;
        }

        // Mở thư viện chọn ảnh
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [5, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setBackgroundUri(result.assets[0].uri); // Cập nhật ảnh
        }
    };


    return (
        <ScrollView style={{ height: 1000 }}
            contentContainerStyle={EditInformation_Style.default.overallContainer}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
        >
            {/* Header */}
            <View style={EditInformation_Style.default.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <BackArrow />
                </TouchableOpacity>
                <Text style={EditInformation_Style.default.headerText}>Chỉnh sửa trang cá nhân</Text>
            </View>

            {/* Chỉnh sửa ảnh đại diện */}
            <View style={EditInformation_Style.default.editAvatarContainer}>
                {/* Header */}
                <View style={EditInformation_Style.default.editAvatarHeaderContainer}>
                    <Text style={EditInformation_Style.default.editAvatarHeaderText}>Ảnh đại diện</Text>
                    <TouchableOpacity onPress={pickAvatarImage}>
                        <Text style={EditInformation_Style.default.editAvatarHeaderText}>Chỉnh sửa</Text>
                    </TouchableOpacity>
                </View>
                {/* Ảnh */}
                <TouchableOpacity style={EditInformation_Style.default.avatarContainer} onPress={pickAvatarImage}>
                    <Image source={{ uri: avatarUri}} style={EditInformation_Style.default.avatarImage} />
                </TouchableOpacity>
                {/* Đường kẻ phân chia */}
                <View style={EditInformation_Style.default.rowLine} />
            </View>

            {/* Chỉnh sửa ảnh bìa */}
            <View style={EditInformation_Style.default.editAvatarContainer}>
                {/* Header */}
                <View style={EditInformation_Style.default.editAvatarHeaderContainer}>
                    <Text style={EditInformation_Style.default.editAvatarHeaderText}>Ảnh bìa</Text>
                    <TouchableOpacity onPress={pickBackgroundImage}>
                        <Text style={EditInformation_Style.default.editAvatarHeaderText}>Chỉnh sửa</Text>
                    </TouchableOpacity>
                </View>
                {/* Ảnh */}
                <TouchableOpacity style={[EditInformation_Style.default.avatarContainer, { width: "90%", height: 170, borderRadius: 10, borderWidth: 1 }]} onPress={pickBackgroundImage}>
                    <Image source={{ uri: backgroundUri }} style={EditInformation_Style.default.avatarImage} />
                </TouchableOpacity>
                {/* Đường kẻ phân chia */}
                <View style={EditInformation_Style.default.rowLine} />
            </View>


            {/* Chỉnh sửa ảnh bìa */}
            <TouchableOpacity>
                <Image source={{ uri: defaultAvatarImage }} />
            </TouchableOpacity>


            {/* Chỉnh sửa thông tin cá nhân */}
            <View style={EditInformation_Style.default.detailContainer}>
                <Template_Input_Information title="Họ và tên" value={currentFullName} setValue={setCurrentFullName} />
                <Template_Input_Information title="Tên người dùng" value={currentUserName} setValue={setCurrentUserName} />
                <Template_Input_Information title="Email" value={currentUserEmail} setValue={setCurrentUserEmail} />
                <Template_Input_Information title="Số điện thoại" value={currentUserPhone} setValue={setCurrentUserPhone} />
            </View>
        </ScrollView>
    )
};

export default EditInformation_Screen;