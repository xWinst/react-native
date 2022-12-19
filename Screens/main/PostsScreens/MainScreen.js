import { useState, useEffect } from "react";
import {
    StyleSheet,
    Image,
    View,
    Text,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const MainScreen = ({ navigation, route }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (route.params) setPosts((state) => [...posts, route.params.post]);
    }, [route.params]);

    return (
        <View style={s.container}>
            <View style={s.user}>
                <Image
                    style={s.image}
                    resizeMode="cover"
                    source={require("../../../assets/images/user.jpg")}
                />
                <View style={s.userData}>
                    <Text style={s.name}>Oleg Chuchin</Text>
                    <Text style={s.email}>oleg@gmail.com</Text>
                </View>
            </View>
            <FlatList
                data={posts}
                keyExtractor={(item, idx) => idx.toString()}
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
                                    0
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
        paddingTop: 32,
        padding: 16,
        borderTopWidth: 2,
        borderColor: "#F6F6F6",
    },

    user: {
        alignItems: "center",
        flexDirection: "row",
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
        width: 60,
        height: 60,
        borderRadius: 16,
        marginRight: 8,
    },

    post: {
        marginTop: 32,
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
