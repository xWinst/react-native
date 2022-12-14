import { useState, useEffect, useCallback } from "react";
import { Provider } from "react-redux";

import { Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

import { store } from "./redux/store";
import Main from "./Components/Main";
import Messages from "./Components/Modal";

const AuthStack = createStackNavigator();

SplashScreen.preventAutoHideAsync();

const loadFonts = async () => {
    await Font.loadAsync({
        "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
        "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
        "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    });
};

const App = () => {
    const [isReady, setIsReady] = useState(false);

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

    return (
        <Provider store={store}>
            <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
                <Messages />
                <Main />
            </View>
        </Provider>
    );
};

export default App;
