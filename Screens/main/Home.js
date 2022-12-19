import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import PostsScreen from "./PostsScreen";
import Create from "./Create";
import ProfileScreen from "./ProfileScreen";

import AddButton from "../../Components/AddButton";

const MainTab = createBottomTabNavigator();

const Home = ({ navigation, route }) => {
    return (
        <MainTab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: { height: 83 },
                headerShown: false,
            }}
        >
            <MainTab.Screen
                options={({ route }) => ({
                    tabBarIcon: ({ focused, size, color }) => (
                        <Feather name="grid" size={size} color={color} />
                    ),
                    tabBarStyle: ((route) => {
                        const routeName =
                            getFocusedRouteNameFromRoute(route) ?? "";
                        console.log(routeName);
                        if (routeName === "Comments") {
                            return { display: "none" };
                        }
                        return { height: 83 };
                    })(route),
                })}
                name="Posts"
                component={PostsScreen}
            />
            <MainTab.Screen
                options={{
                    tabBarIcon: () => <AddButton />,
                    tabBarStyle: { display: "none" },
                }}
                name="Create"
                component={Create}
            />
            <MainTab.Screen
                options={{
                    tabBarIcon: ({ focused, size, color }) => (
                        <Feather name="user" size={size} color={color} />
                    ),
                }}
                name="Profile"
                component={ProfileScreen}
            />
        </MainTab.Navigator>
    );
};

export default Home;
