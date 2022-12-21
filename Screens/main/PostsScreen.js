import { useDispatch } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { Feather } from "@expo/vector-icons";
import MainScreen from "./PostsScreens/MainScreen";
import MapScreen from "./PostsScreens/MapScreen";
import CommentsScreen from "./PostsScreens/CommentsScreen";

import { logout } from "../../redux/auth/authOperation";

const Stack = createStackNavigator();

const PostsScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    const exit = () => {
        dispatch(logout());
    };

    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign: "center",
                headerLeftContainerStyle: {
                    paddingLeft: 16,
                },
                headerRightContainerStyle: {
                    paddingRight: 16,
                },
            }}
        >
            <Stack.Screen
                name="MainScreen"
                options={{
                    title: "Публикации",
                    headerLeft: null,
                    headerRight: ({ focused, size, color }) => (
                        <Feather
                            name="log-out"
                            size={24}
                            color="#BDBDBD"
                            onPress={exit}
                        />
                    ),
                    headerTitleStyle: {
                        color: "#212121",
                        fontFamily: "Roboto-Medium",
                        fontSize: 17,
                        lineHeight: 22,
                        letterSpacing: -0.4,
                    },
                }}
                component={MainScreen}
            />
            <Stack.Screen
                name="Map"
                options={{
                    title: "Карта местности",
                    tabBarStyle: { display: "none" },
                }}
                component={MapScreen}
            />
            <Stack.Screen
                name="Comments"
                options={{ title: "Комментарии", tabBarVisible: false }}
                component={CommentsScreen}
            />
        </Stack.Navigator>
    );
};

export default PostsScreen;
