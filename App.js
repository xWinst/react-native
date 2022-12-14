import { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, ImageBackground } from "react-native";
import * as Font from "expo-font";

import * as SplashScreen from "expo-splash-screen";
import RegistrationScreen from "./assets/Screens/RegistrationScreen";
import LoginScreen from "./assets/Screens/LoginScreen";
// import RegistrationScreen from "./assets/Screens";

SplashScreen.preventAutoHideAsync();

const loadFonts = async () => {
    await Font.loadAsync({
        "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
        "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    });
};

const App = () => {
    const [isReady, setIsReady] = useState(false);
    const [page, setPage] = useState("register");

    useEffect(() => {
        async function prepare() {
            try {
                await loadFonts();
            } catch (e) {
                console.warn(e);
            } finally {
                setIsReady(true);
            }
        }

        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (isReady) await SplashScreen.hideAsync();
    }, [isReady]);

    if (!isReady) {
        return null;
    }

    const login = () => setPage("login");

    const register = () => setPage("register");

    return (
        <View style={s.container}>
            <ImageBackground
                style={s.image}
                resizeMode="cover"
                source={require("./assets/images/bg.jpg")}
                onLayout={onLayoutRootView}
            >
                {page === "register" && <RegistrationScreen onClick={login} />}
                {page === "login" && <LoginScreen onClick={register} />}
            </ImageBackground>
        </View>
    );
};

const s = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "#fff",
        // alignItems: "center",
    },

    image: {
        flex: 1,
        justifyContent: "flex-end",
    },
});

export default App;
