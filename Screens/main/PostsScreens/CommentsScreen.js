import { useState, useEffect } from "react";
import {
    StyleSheet,
    Image,
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
    Keyboard,
    useWindowDimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const CommentsScreen = ({ navigation, route }) => {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState();
    const [image, setImage] = useState();

    const { width } = useWindowDimensions();

    useEffect(() => {
        if (route.params) setImage(route.params.image);
    }, [route.params]);

    const sendComments = () => {
        setComments((state) => [...state, comment]);
        setComment("");
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={s.container}>
                <View>
                    <Image
                        style={s.picture}
                        resizeMode="cover"
                        source={{ uri: image }}
                    />
                    <FlatList
                        data={comments}
                        keyExtractor={(item, idx) => idx.toString()}
                        renderItem={({ item }) => (
                            <View style={s.comment}>
                                <View style={s.icon}>
                                    <Feather
                                        name="user"
                                        size={24}
                                        color="#BDBDBD"
                                    />
                                </View>
                                <Text style={s.text}>{item}</Text>
                            </View>
                        )}
                    />
                </View>
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                >
                    <View style={s.form}>
                        <TextInput
                            style={{ ...s.input, width: width - 82 }}
                            value={comment}
                            onChangeText={setComment}
                            multiline={true}
                            placeholder="Коменнтировать..."
                            placeholderTextColor="#BDBDBD"
                        />
                        <TouchableOpacity
                            style={s.btn}
                            activeOpacity={0.6}
                            onPress={sendComments}
                        >
                            <Feather
                                name="arrow-up"
                                size={24}
                                color="#ffffff"
                            />
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
        justifyContent: "space-between",
        backgroundColor: "#ffffff",
        paddingTop: 32,
        padding: 16,
        borderTopWidth: 2,
        borderColor: "#F6F6F6",
    },

    picture: {
        width: "100%",
        height: 240,
        borderRadius: 8,
    },

    comment: {
        marginTop: 24,
        flexDirection: "row",
    },

    icon: {
        width: 28,
        height: 28,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1B4371",
        borderRadius: 14,
    },

    text: {
        marginLeft: 16,
        padding: 16,
        fontSize: 16,
        lineHeight: 19,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
        color: "#212121",
        backgroundColor: "#00000008",
    },

    form: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingRight: 8,
        backgroundColor: "#F6F6F6",
        borderTopWidth: 1,
        borderColor: "#E8E8E8",
        borderRadius: 25,
    },

    input: {
        padding: 16,
        fontSize: 16,
        lineHeight: 19,
    },

    btn: {
        width: 34,
        height: 34,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FF6C00",
        borderRadius: 17,
    },
});

export default CommentsScreen;
