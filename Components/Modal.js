import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Modal,
    StyleSheet,
    Text,
    Pressable,
    View,
    useWindowDimensions,
} from "react-native";
import { errorReset } from "../redux/auth/authOperation";

const Messages = () => {
    const [isShowModal, setIsShowModal] = useState(false);
    const error = useSelector((state) => state.auth.error) || [];
    const dispatch = useDispatch();
    const { height, width } = useWindowDimensions();

    useEffect(() => setIsShowModal(error?.length ? true : false), [error]);

    const close = () => {
        setIsShowModal(false);
        dispatch(errorReset());
    };

    return (
        <View style={s.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isShowModal}
                onRequestClose={() => {}}
            >
                <View
                    style={{
                        ...s.modalBox,
                        width: width - 40,
                        top: (height - 200) / 2,
                    }}
                >
                    <View style={s.modalView}>
                        <Text style={s.modalTitle}>{error[0]}</Text>
                        <Text style={s.modalText}>{error[1]}</Text>
                        <View style={s.btnBox}>
                            <Pressable style={s.button} onPress={close}>
                                <Text style={s.textStyle}>Ok</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const s = StyleSheet.create({
    centeredView: {
        position: "absolute",
        flex: 1,
    },

    modalBox: {
        marginHorizontal: 20,
    },

    modalView: {
        backgroundColor: "#ffffff",
        borderRadius: 20,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    btnBox: {
        alignItems: "flex-end",
    },
    button: {
        width: 60,
        borderRadius: 20,
        padding: 10,
        elevation: 5,
        backgroundColor: "#FF6C00",
    },

    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },

    modalTitle: {
        fontSize: 20,
        lineHeight: 24,
        color: "#FF0000",
        textAlign: "center",
    },

    modalText: {
        marginTop: 15,
        marginBottom: 20,
    },
});

export default Messages;
