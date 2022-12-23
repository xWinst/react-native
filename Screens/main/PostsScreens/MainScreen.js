import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    StyleSheet,
    Image,
    View,
    Text,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { subscribePosts } from "../../../redux/dashboard/postsOperations";

const MainScreen = ({ navigation }) => {
    const user = useSelector((state) => state.auth.user);
    const posts = useSelector((state) => state.posts.posts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(subscribePosts());
    }, []);

    return (
        <View style={s.container}>
            <View style={s.user}>
                <Image
                    style={{ ...s.image, width: 60, height: 60 }}
                    resizeMode="cover"
                    source={
                        user?.photo
                            ? { uri: user.photo }
                            : require("../../../assets/images/nophoto.png")
                    }
                />
                <View style={s.userData}>
                    <Text style={s.name}>{user?.name || "anonym"}</Text>
                    <Text style={s.email}>{user?.email || "no email"}</Text>
                </View>
            </View>
            <FlatList
                data={posts}
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
                                                    -1, 0, 0, 0, 0, 1, 0, 0, 0,
                                                    0, 1, 0, 0, 0, 0, 1,
                                                ],
                                            },
                                        ],
                                    }}
                                    name="message-circle"
                                    size={24}
                                    color="#BDBDBD"
                                />
                                <Text style={{ ...s.text, color: "#BDBDBD" }}>
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
    );
};

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        padding: 16,
        paddingTop: 32,
        borderTopWidth: 2,
        borderColor: "#F6F6F6",
    },

    user: {
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 32,
    },

    name: {
        fontFamily: "Roboto-Bold",
        fontSize: 13,
        lineHeight: 15,
    },

    email: {
        fontFamily: "Roboto-Regular",
        fontSize: 11,
        lineHeight: 13,
    },

    image: {
        borderRadius: 16,
        marginRight: 8,
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

export default MainScreen;
