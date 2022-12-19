import { createStackNavigator } from "@react-navigation/stack";
import { Feather } from "@expo/vector-icons";
import CreatePostsScreen from "./CreatePostScreens/CreatePostsScreen";
import MainCamera from "./CreatePostScreens/MainCamera";

const CreateStack = createStackNavigator();

const Create = ({ navigation }) => {
    return (
        <CreateStack.Navigator>
            <CreateStack.Screen
                name="CreatePost"
                options={{
                    title: "Создать публикацию",
                    headerTitleAlign: "center",
                    headerLeftContainerStyle: {
                        paddingLeft: 16,
                    },
                    headerRightContainerStyle: {
                        paddingRight: 16,
                    },
                    headerLeft: () => (
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
                }}
                component={CreatePostsScreen}
            />
            <CreateStack.Screen
                name="MainCamera"
                options={{ headerShown: false }}
                component={MainCamera}
            />
        </CreateStack.Navigator>
    );
};

export default Create;
