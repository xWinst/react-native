import { StyleSheet, View, Text, Image, ImageBackground } from "react-native";

import { Feather } from "@expo/vector-icons";

const ProfileScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                style={s.bg}
                resizeMode="cover"
                source={require("../../assets/images/bg.jpg")}
            >
                <View style={s.container}>
                    <View style={{ top: -60 }}>
                        <Image
                            style={s.image}
                            resizeMode="cover"
                            source={require("../../assets/images/user.jpg")}
                        />
                    </View>
                    <Feather
                        style={s.logout}
                        name="log-out"
                        size={24}
                        color="#BDBDBD"
                        onPress={() => navigation.navigate("Login")}
                    />
                    <Text style={s.name}>Oleg Chuchin</Text>
                </View>
            </ImageBackground>
        </View>
    );
};

const s = StyleSheet.create({
    bg: {
        flex: 1,
        justifyContent: "flex-end",
    },

    container: {
        position: "relative",
        backgroundColor: "#ffffff",
        alignItems: "center",
        paddingBottom: 244,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },

    image: {
        width: 120,
        height: 120,
        borderRadius: 16,
        marginRight: 8,
    },

    name: {
        marginTop: -28,
        fontFamily: "Roboto-Medium",
        fontSize: 30,
        lineHeight: 35,
        textAlign: "center",
    },

    logout: {
        position: "absolute",
        right: 16,
        top: 22,
    },
});

export default ProfileScreen;
