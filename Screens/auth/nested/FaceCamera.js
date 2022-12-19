import { useState } from "react";
import { Camera, CameraType } from "expo-camera";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const FaceCamera = ({ navigation }) => {
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [camera, setCamera] = useState();

    if (!permission?.granted) {
        requestPermission();
    }

    const snap = async () => {
        const data = await camera.takePictureAsync();
        navigation.navigate("Register", { photo: data.uri });
    };

    return (
        <View style={s.container}>
            <TouchableOpacity
                style={s.btn}
                activeOpacity={0.6}
                onPress={() => navigation.navigate("Register")}
            >
                <Feather name="arrow-left" size={24} color="#ffffff" />
                <Text style={{ ...s.btnText, marginLeft: 10 }}>Вернуться</Text>
            </TouchableOpacity>
            <View style={s.cameraBox}>
                <Camera
                    ref={setCamera}
                    type={CameraType.front}
                    ratio="1:1"
                    style={s.camera}
                />
            </View>

            <TouchableOpacity
                style={s.fotoIcon}
                activeOpacity={0.6}
                onPress={snap}
            >
                <FontAwesome name="camera" size={30} color="#1B4371" />
            </TouchableOpacity>
        </View>
    );
};

const s = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    cameraBox: {
        width: 300,
        height: 300,
        borderRadius: 30,
        overflow: "hidden",
        borderWidth: 3,
        borderColor: "#FF6C00",
    },

    camera: {
        width: 300,
        height: 300,
    },

    btn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: 300,
        marginBottom: 40,
        padding: 16,
        borderRadius: 100,
        backgroundColor: "#FF6C00",
    },

    btnText: {
        fontFamily: "Roboto-Regular",
        fontSize: 16,
        lineHeight: 19,
        color: "#ffffff",
        textAlign: "center",
    },

    fotoIcon: {
        width: 80,
        height: 80,
        marginTop: 32,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff",
        borderRadius: 40,
    },
});

export default FaceCamera;
