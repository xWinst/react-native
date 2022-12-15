import { StyleSheet, Image, View, Text } from "react-native";
const PostsScreen = () => {
    return (
        <View style={s.container}>
            <View style={s.user}>
                <Image
                    style={s.image}
                    resizeMode="cover"
                    source={require("../../assets/images/user.jpg")}
                />
                <View style={s.userData}>
                    <Text style={s.name}>Oleg Chuchin</Text>
                    <Text style={s.email}>oleg@gmail.com</Text>
                </View>
            </View>
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
});

export default PostsScreen;
