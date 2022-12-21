import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { Feather } from "@expo/vector-icons";
import { addPost } from "../../../redux/dashboard/postsOperations";

const CreatePostsScreen = ({ navigation, route }) => {
    const [title, setTitle] = useState();
    const [location, setLocation] = useState();
    const [image, setImage] = useState();

    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const { width } = useWindowDimensions();

    useEffect(() => {
        setImage(route.params?.image.uri);
        setLocation(route.params?.location);
    }, [route.params]);

    const reset = () => {
        setTitle(null);
        setLocation(null);
        setImage(null);
    };

    const publish = () => {
        const post = { title, image, location, id: user.id };
        reset();
        dispatch(addPost(post));
        navigation.navigate("MainScreen");
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={s.container}>
                <View style={s.foto}>
                    {image && (
                        <Image
                            style={s.image}
                            resizeMode="cover"
                            source={{ uri: image }}
                        />
                    )}
                    <View style={s.fotoIcon}>
                        <FontAwesome
                            name="camera"
                            size={20}
                            color="#BDBDBD"
                            onPress={() => navigation.navigate("MainCamera")}
                        />
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
                        <View style={s.location}>
                            <Feather
                                style={s.icon}
                                name="map-pin"
                                size={24}
                                color="#BDBDBD"
                            />
                            <Text
                                style={{
                                    ...s.description,
                                    color: location ? "#212121" : "#BDBDBD",
                                }}
                            >
                                {location ? location.place : "Местность..."}
                            </Text>
                        </View>

                        <TouchableOpacity
                            style={title && image ? s.btn : s.disable}
                            activeOpacity={0.6}
                            onPress={publish}
                        >
                            <Text
                                style={
                                    title && image ? s.btnText : s.disableText
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
                            onPress={reset}
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

    image: {
        width: "100%",
        height: 240,
        borderRadius: 8,
    },

    fotoIcon: {
        position: "absolute",
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

    location: {
        flexDirection: "row",
        marginTop: 20,
        paddingBottom: 15,
        paddingTop: 15,
        fontSize: 16,
        lineHeight: 19,
        borderBottomWidth: 1,
        borderColor: "#E8E8E8",
        color: "#BDBDBD",
    },

    icon: {
        marginRight: 12,
        top: 5,
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
        width: 70,
        marginTop: 40,
        padding: 8,
        alignItems: "center",
        borderRadius: 20,
        backgroundColor: "#F6F6F6",
    },
});

export default CreatePostsScreen;
