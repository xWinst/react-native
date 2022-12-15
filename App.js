import { useState, useEffect, useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

import RegistrationScreen from "./Screens/auth/RegistrationScreen";
import LoginScreen from "./Screens/auth/LoginScreen";
import Home from "./Screens/main/Home";

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
        <NavigationContainer onLayout={onLayoutRootView}>
            <AuthStack.Navigator>
                <AuthStack.Screen
                    name="Register"
                    options={{ headerShown: false }}
                    component={RegistrationScreen}
                />
                <AuthStack.Screen
                    name="Login"
                    options={{ headerShown: false }}
                    component={LoginScreen}
                />
                <AuthStack.Screen
                    name="Home"
                    options={{ headerShown: false }}
                    component={Home}
                />
            </AuthStack.Navigator>
        </NavigationContainer>
    );
};

export default App;
