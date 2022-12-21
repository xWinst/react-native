import { useDispatch, useSelector } from "react-redux";
import {
    StyleSheet,
    View,
    Text,
    Image,
    ImageBackground,
    FlatList,
    TouchableOpacity,
    useWindowDimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import { logout } from "../../redux/auth/authOperation";

const ProfileScreen = ({ navigation }) => {
    const user = useSelector((state) => state.auth.user);
    const posts = useSelector((state) => state.posts.posts);

    const { width } = useWindowDimensions();
    const dispatch = useDispatch();

    const exit = () => {
        dispatch(logout());
    };

    const getUserPost = () => {
        return posts.filter((post) => post.user === user.id);
    };

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                style={s.bg}
                resizeMode="cover"
                source={require("../../assets/images/bg.jpg")}
            >
                <View style={s.container}>
                    <View style={{ top: -60, left: (width - 120) / 2 - 16 }}>
                        <Image
                            style={{ ...s.image, width: 120, height: 120 }}
                            resizeMode="cover"
                            source={
                                user?.photo
                                    ? { uri: user.photo }
                                    : require("../../assets/images/nophoto.png")
                            }
                        />
                    </View>
                    <Feather
                        style={s.logout}
                        name="log-out"
                        size={24}
                        color="#BDBDBD"
                        onPress={exit}
                    />
                    <Text style={s.name}>{user?.name || "anonym"}</Text>
                    <FlatList
                        style={{ maxHeight: 320 }}
                        data={getUserPost()}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={s.post}>
                                <Image
                                    style={s.picture}
                                    resizeMode="cover"
                                    source={{ uri: item.image }}
                                />
                                <Text style={s.title}>{item.title}</Text>
                                <View style={s.thumb}>
                                    <TouchableOpacity
                                        style={s.div}
                                        onPress={() =>
                                            navigation.navigate("Comments", {
                                                image: item.image,
                                                post: item.id,
                                            })
                                        }
                                    >
                                        <Feather
                                            style={{
                                                transform: [
                                                    {
                                                        matrix: [
                                                            -1, 0, 0, 0, 0, 1,
                                                            0, 0, 0, 0, 1, 0, 0,
                                                            0, 0, 1,
                                                        ],
                                                    },
                                                ],
                                            }}
                                            name="message-circle"
                                            size={24}
                                            color="#BDBDBD"
                                        />
                                        <Text
                                            style={{
                                                ...s.text,
                                                color: "#BDBDBD",
                                            }}
                                        >
                                            {item.comments.length}
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={s.div}
                                        onPress={() =>
                                            navigation.navigate("Map", {
                                                coords: item.location,
                                            })
                                        }
                                    >
                                        <Feather
                                            name="map-pin"
                                            size={24}
                                            color="#BDBDBD"
                                        />
                                        <Text style={s.text}>
                                            {item.location.place}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />
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
        minHeight: 300,
        padding: 16,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },

    image: {
        borderRadius: 16,
        marginRight: 8,
    },

    name: {
        marginTop: -28,
        marginBottom: 33,
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

    post: {
        marginBottom: 32,
    },

    picture: {
        width: "100%",
        height: 240,
        borderRadius: 8,
    },

    title: {
        marginTop: 8,
        fontFamily: "Roboto-Bold",
        fontSize: 16,
        lineHeight: 19,
    },

    thumb: {
        marginTop: 12,
        flexDirection: "row",
        justifyContent: "space-between",
    },

    div: {
        flexDirection: "row",
        alignItems: "center",
    },

    text: {
        marginLeft: 8,
        fontSize: 16,
        lineHeight: 19,
    },
});

export default ProfileScreen;
