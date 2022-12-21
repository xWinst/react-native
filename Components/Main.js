import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    NavigationContainer,
    useNavigationContainerRef,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RegistrationScreen from "../Screens/auth/RegistrationScreen";
import LoginScreen from "../Screens/auth/LoginScreen";
import FaceCamera from "../Screens/auth/nested/FaceCamera";
import Home from "../Screens/main/Home";

import { getUser } from "../redux/auth/authOperation";

const AuthStack = createStackNavigator();

const Main = () => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigationRef = useNavigationContainerRef();

    useEffect(() => {
        dispatch(getUser());
    }, []);

    useEffect(() => {
        navigationRef.navigate(user ? "Home" : "Register");
    }, [user]);

    return (
        <NavigationContainer ref={navigationRef}>
            <AuthStack.Navigator initialRouteName={user ? "Home" : "Register"}>
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
                <AuthStack.Screen
                    name="FaceCamera"
                    options={{ headerShown: false }}
                    component={FaceCamera}
                />
            </AuthStack.Navigator>
        </NavigationContainer>
    );
};

export default Main;
