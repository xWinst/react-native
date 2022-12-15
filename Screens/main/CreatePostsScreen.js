import { useState, useEffect } from "react";
import {
    StyleSheet,
    Image,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    useWindowDimensions,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const CreatePostsScreen = () => {
    const [title, setTitle] = useState();
    const [location, setLocation] = useState();

    const { width } = useWindowDimensions();

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={s.container}>
                <View style={s.foto}>
                    <View style={s.fotoIcon}>
                        <FontAwesome name="camera" size={20} color="#BDBDBD" />
                    </View>
                </View>
                <Text style={s.description}>Загрузите фото</Text>
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                >
                    <View style={s.form}>
                        <TextInput
                            style={s.input}
                            value={title}
                            onChangeText={setTitle}
                            placeholder="Название..."
                            placeholderTextColor="#BDBDBD"
                        />
                        <TextInput
                            style={{ ...s.input, paddingLeft: 28 }}
                            value={location}
                            onChangeText={setLocation}
                            placeholder="Местность..."
                            placeholderTextColor="#BDBDBD"
                        />
                        <SimpleLineIcons
                            style={s.icon}
                            name="location-pin"
                            size={24}
                            color="#BDBDBD"
                        />
                        <TouchableOpacity
                            style={title && location ? s.btn : s.disable}
                            activeOpacity={0.6}
                        >
                            <Text
                                style={
                                    title && location
                                        ? s.btnText
                                        : s.disableText
                                }
                            >
                                Опубликовать
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                ...s.basket,
                                transform: [
                                    { translateX: (width - 70) / 2 - 16 },
                                ],
                            }}
                            activeOpacity={0.6}
                        >
                            <Feather name="trash-2" size={24} color="#BDBDBD" />
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </TouchableWithoutFeedback>
    );
};

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        paddingTop: 32,
        padding: 16,
        borderTopWidth: 2,
        borderColor: "#F6F6F6",
    },

    foto: {
        height: 240,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#E8E8E8",
        borderRadius: 8,
        backgroundColor: "#F6F6F6",
    },

    fotoIcon: {
        width: 60,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff",
        borderRadius: 30,
    },

    description: {
        marginTop: 8,
        fontFamily: "Roboto-Regular",
        fontSize: 16,
        lineHeight: 19,
        color: "#BDBDBD",
    },

    form: {
        marginTop: 16,
    },

    input: {
        marginTop: 32,
        paddingBottom: 15,
        fontSize: 16,
        lineHeight: 19,
        borderBottomWidth: 1,
        borderColor: "#E8E8E8",
    },

    icon: {
        position: "absolute",
        top: 110,
        left: 0,
    },

    btn: {
        marginTop: 32,
        padding: 16,
        borderRadius: 100,
        backgroundColor: "#FF6C00",
    },

    disable: {
        marginTop: 32,
        padding: 16,
        borderRadius: 100,
        backgroundColor: "#F6F6F6",
    },

    btnText: {
        fontFamily: "Roboto-Regular",
        fontSize: 16,
        lineHeight: 19,
        color: "#ffffff",
        textAlign: "center",
    },

    disableText: {
        fontFamily: "Roboto-Regular",
        fontSize: 16,
        lineHeight: 19,
        color: "#BDBDBD",
        textAlign: "center",
    },

    basket: {
        // position: "absolute",
        width: 70,
        marginTop: 40,
        padding: 8,
        alignItems: "center",
        borderRadius: 20,
        backgroundColor: "#F6F6F6",
    },
});

export default CreatePostsScreen;
