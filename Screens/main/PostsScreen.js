import { createStackNavigator } from "@react-navigation/stack";
import { Feather } from "@expo/vector-icons";
import MainScreen from "./PostsScreens/MainScreen";
import MapScreen from "./PostsScreens/MapScreen";
import CommentsScreen from "./PostsScreens/CommentsScreen";

const Stack = createStackNavigator();

const PostsScreen = ({ navigation }) => {
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
                    headerTitleAlign: "center",
                    headerLeft: null,
                    headerRight: ({ focused, size, color }) => (
                        <Feather
                            name="log-out"
                            size={24}
                            color="#BDBDBD"
                            onPress={() => navigation.navigate("Login")}
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
