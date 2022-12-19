import { StyleSheet, Text, View } from "react-native";

const AddButton = () => {
    return (
        <View style={s.btn}>
            <Text style={s.btnText}>+</Text>
        </View>
    );
};

const s = StyleSheet.create({
    btn: {
        width: 70,
        height: 40,
        padding: 1,
        borderRadius: 20,
        backgroundColor: "#FF6C00",
    },

    btnText: {
        fontFamily: "Roboto-Regular",
        fontSize: 26,
        color: "#ffffff",
        textAlign: "center",
    },
});

export default AddButton;
