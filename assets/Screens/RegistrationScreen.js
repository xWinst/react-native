import { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";

import { useWindowDimensions } from "react-native";

const RegistrationScreen = ({ onClick }) => {
    const { height, width } = useWindowDimensions();
    const [isHidePass, setIsHidePass] = useState(true);
    const [isShowKeyboard, setIsShowKeyboard] = useState(false);
    const [login, setLogin] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [focused, setFocused] = useState();

    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
            setIsShowKeyboard(true);
        });
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            setIsShowKeyboard(false);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    const showPass = () => {
        setIsHidePass((state) => !state);
    };

    const submitForm = () => {
        const userData = { login, email, password };
        console.log("userData: ", userData);
        setLogin("");
        setEmail("");
        setPassword("");
    };

    const setFoto = () => {
        alert("Тут могла быть ваша реклама, ну или фото :)");
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View
                style={{
                    ...s.container,
                    marginBottom: isShowKeyboard ? -200 : 0,
                }}
            >
                <View
                    style={{
                        ...s.foto,
                        transform: [{ translateX: (width - 120) / 2 }],
                    }}
                >
                    <TouchableOpacity
                        style={s.plusBox}
                        activeOpacity={0.6}
                        onPress={setFoto}
                    >
                        <Text style={s.plus}>+</Text>
                    </TouchableOpacity>
                </View>
                <Text style={s.title}>Регистрация</Text>
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                >
                    <TextInput
                        style={{
                            ...s.input,
                            borderColor:
                                focused === "login" ? "#FF6C00" : "#E8E8E8",
                            backgroundColor:
                                focused === "login" ? "#FFffff" : "#F6F6F6",
                        }}
                        value={login}
                        onChangeText={setLogin}
                        onFocus={() => setFocused("login")}
                        placeholder="Логин"
                        placeholderTextColor="#BDBDBD"
                    />
                    <TextInput
                        style={{
                            ...s.input,
                            borderColor:
                                focused === "email" ? "#FF6C00" : "#E8E8E8",
                            backgroundColor:
                                focused === "email" ? "#FFffff" : "#F6F6F6",
                        }}
                        value={email}
                        onChangeText={setEmail}
                        onFocus={() => setFocused("email")}
                        placeholder="Адрес электронной почты"
                        placeholderTextColor="#BDBDBD"
                    />
                    <View style={s.passBox}>
                        <TextInput
                            style={{
                                ...s.input,
                                borderColor:
                                    focused === "password"
                                        ? "#FF6C00"
                                        : "#E8E8E8",
                                backgroundColor:
                                    focused === "password"
                                        ? "#FFffff"
                                        : "#F6F6F6",
                            }}
                            value={password}
                            onChangeText={setPassword}
                            onFocus={() => setFocused("password")}
                            placeholder="Пароль"
                            placeholderTextColor="#BDBDBD"
                            secureTextEntry={isHidePass}
                        />
                        <Text style={s.showPass} onPress={showPass}>
                            {isHidePass ? "Показать" : "Скрыть"}
                        </Text>
                    </View>
                </KeyboardAvoidingView>
                <TouchableOpacity
                    style={s.btn}
                    activeOpacity={0.6}
                    onPress={submitForm}
                >
                    <Text style={s.btnText}>Зарегистрироваться</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={s.btn2}
                    activeOpacity={0.6}
                    onPress={onClick}
                >
                    <Text style={s.btnText2}>Уже есть аккаунт? Войти</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
};

const s = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        justifyContent: "flex-end",
        paddingTop: 92,
        paddingBottom: 78,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },

    foto: {
        position: "absolute",
        top: -60,
        width: 120,
        height: 120,
        backgroundColor: "#F6F6F6",
        borderRadius: 16,
    },

    plusBox: {
        left: 107.5,
        top: 81,
        width: 25,
        height: 25,
        borderRadius: 12.5,
        borderColor: "#FF6C00",
        borderWidth: 1,
    },

    plus: {
        fontFamily: "Roboto-Regular",
        fontSize: 23,
        textAlign: "center",
        color: "#FF6C00",
        top: -5,
    },

    title: {
        fontFamily: "Roboto-Bold",
        marginBottom: 33,
        fontSize: 30,
        lineHeight: 36,
        textAlign: "center",
        letterSpacing: 0.14,

        color: "#212121",
    },

    input: {
        marginBottom: 16,
        marginHorizontal: 16,
        padding: 16,
        fontSize: 16,
        lineHeight: 19,
        borderWidth: 1,
        // borderColor: "#E8E8E8",
        borderRadius: 8,
        // backgroundColor: "#F6F6F6",
    },

    passBox: {
        position: "relative",
    },

    showPass: {
        position: "absolute",
        right: 32,
        top: 22,
        textAlign: "right",
        fontSize: 16,
        lineHeight: 19,
        color: "#1B4371",
    },

    btn: {
        marginTop: 43,
        marginHorizontal: 16,
        padding: 16,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#FF6C00",
    },

    btnText: {
        fontFamily: "Roboto-Regular",
        fontSize: 16,
        lineHeight: 19,
        color: "#ffffff",
        textAlign: "center",
    },

    btn2: {
        marginHorizontal: 16,
        padding: 16,
        height: 50,
        backgroundColor: "transparent",
    },

    btnText2: {
        fontFamily: "Roboto-Regular",
        fontSize: 16,
        lineHeight: 19,
        color: "#1B4371",
        textAlign: "center",
    },
});

export default RegistrationScreen;
