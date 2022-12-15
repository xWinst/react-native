import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
// import CommentsScreen from "./CommentsScreen";
// import MapScreen from "./MapScreen";

import AddButton from "../../Components/AddButton";

const MainTab = createBottomTabNavigator();

const Home = ({ navigation }) => {
    return (
        <MainTab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: { height: 83 },
                headerShown: true,
                headerShadowVisible: true,
                headerTitleAlign: "center",
                headerLeftContainerStyle: {
                    paddingLeft: 16,
                },
                headerRightContainerStyle: {
                    paddingRight: 16,
                },
                headerTitleStyle: {
                    color: "#212121",
                    fontFamily: "Roboto-Medium",
                    fontSize: 17,
                    lineHeight: 22,
                    letterSpacing: -0.4,
                },
            }}
        >
            <MainTab.Screen
                options={{
                    title: "Публикации",
                    tabBarIcon: ({ focused, size, color }) => (
                        <AntDesign
                            name="appstore-o"
                            size={size}
                            color={color}
                        />
                    ),
                    headerRight: ({ focused, size, color }) => (
                        <Feather
                            name="log-out"
                            size={24}
                            color="#BDBDBD"
                            onPress={() => navigation.navigate("Login")}
                        />
                    ),
                }}
                name="Posts"
                component={PostsScreen}
            />
            <MainTab.Screen
                options={{
                    title: "Создать публикацию",
                    tabBarIcon: () => <AddButton />,
                    headerLeft: ({ focused, size, color }) => (
                        <Feather
                            name="arrow-left"
                            size={24}
                            color="#212121"
                            onPress={() =>
                                navigation.navigate("Home", {
                                    screen: "Posts",
                                })
                            }
                        />
                    ),
                    tabBarStyle: { display: "none" },
                }}
                name="CreatePosts"
                component={CreatePostsScreen}
            />
            <MainTab.Screen
                options={{
                    tabBarIcon: ({ focused, size, color }) => (
                        <Feather name="user" size={size} color={color} />
                    ),
                    headerShown: false,
                }}
                name="Profile"
                component={ProfileScreen}
            />
            {/* <MainTab.Screen name="Comments" component={CommentsScreen} />
                <MainTab.Screen name="Map" component={MapScreen} /> */}
        </MainTab.Navigator>
    );
};

export default Home;
