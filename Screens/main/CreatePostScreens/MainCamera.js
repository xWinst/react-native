import { useState } from "react";
import { Camera, CameraType } from "expo-camera";
import * as Location from "expo-location";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const MainCamera = ({ navigation }) => {
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [camera, setCamera] = useState();

    if (!permission?.granted) {
        requestPermission();
    }

    const snap = async () => {
        const image = await camera.takePictureAsync();
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            alert("Permission to access location was denied");
            return;
        }

        const { coords } = await Location.getCurrentPositionAsync({});
        let keys = {
            latitude: coords.latitude,
            longitude: coords.longitude,
        };
        const place = await Location.reverseGeocodeAsync(keys);
        const location = {
            ...keys,
            place: `${place[0].region}, ${place[0].country}`,
        };

        navigation.navigate("CreatePost", { image, location });
    };

    return (
        <View style={s.container}>
            <View style={s.cameraBox}>
                <Camera ref={setCamera} style={s.camera} ratio="4:3">
                    <TouchableOpacity
                        style={s.btn}
                        activeOpacity={0.6}
                        onPress={() => navigation.navigate("CreatePost")}
                    >
                        <Feather name="arrow-left" size={24} color="#00ff00" />
                        <Text style={{ ...s.btnText, marginLeft: 10 }}>
                            Вернуться
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={s.fotoIcon}
                        activeOpacity={0.6}
                        onPress={snap}
                    >
                        <FontAwesome name="camera" size={30} color="#00ff00" />
                    </TouchableOpacity>
                </Camera>
            </View>
        </View>
    );
};

const s = StyleSheet.create({
    container: {
        flex: 1,
    },

    cameraBox: { flex: 1 },

    camera: {
        flex: 1,
    },

    btn: {
        marginTop: 30,
        marginLeft: 20,
        flexDirection: "row",
        alignItems: "center",
        width: 300,
    },

    btnText: {
        fontFamily: "Roboto-Regular",
        fontSize: 16,
        lineHeight: 19,
        color: "#00ff00",
        textAlign: "center",
    },

    fotoIcon: {
        position: "absolute",
        bottom: 20,
        right: 20,
        width: 80,
        height: 80,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#00ff00",
        borderRadius: 40,
    },
});

export default MainCamera;
