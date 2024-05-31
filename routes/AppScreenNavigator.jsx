import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileDetailScreen from "../screens/ProfileDetailScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import MainScreenNavigator from "./MainScreenNavigator";
import colors from "../variables/colors/colors";
import ChangeProfileScreen from "../screens/ChangeProfileScreen";
import ComicDetailScreen from "../screens/ComicDetailScreen";
import ReadComicScreen from "../screens/ReadComicScreen";
import ChooseChaptersScreen from "../screens/ChooseChaptersScreen";
import CommentsScreen from "../screens/CommentsScreen";
import FilterScreen from "../screens/FilterScreen";
import ChatBotScreen from "../screens/ChatBotScreen";

const Stack = createNativeStackNavigator();

/**
 * `AppScreenNavigator` is a React component that sets up the navigation for the app.
 *
 * It uses the `createNativeStackNavigator` function from `@react-navigation/native-stack` to create a stack navigator.
 *
 * The stack navigator has two groups of screens:
 *
 * - The first group includes the main screens of the app, such as the main screen, 
 * profile detail screen, change password screen, change profile screen, 
 * comic detail screen, read comic screen, and chat bot screen. These screens are navigated to in a stack format, 
 * meaning that each new screen is placed on top of the stack and the user can navigate back to the previous screen.
 *
 * - The second group includes the choose chapter screen, comments screen, and filter screen. These screens are presented modally, 
 * meaning that they slide up from the bottom of the screen and the user can dismiss them by swiping down.
 *
 * The stack navigator has some default screen options, such as the alignment of the header title, the style of the header, the color of the header tint, the style of the header title, and whether the back title is visible.
 *
 * Each screen in the stack navigator can also have its own options, such as whether the header is shown and the title of the screen.
 *
 * @returns {ReactElement} The stack navigator.
 */
const AppScreenNavigator = () => {
  return (
    <Stack.Navigator
      // initialRouteName="Comments"
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: colors.darkgrey,
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontSize: 28,
          fontWeight: "600",
          letterSpacing: 1.5,
        },
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Group>
        <Stack.Screen
          component={MainScreenNavigator}
          name="Main"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={ProfileDetailScreen}
          name="ProfileDetail"
          options={{ title: "Profile & Security" }}
        />
        <Stack.Screen
          component={ChangePasswordScreen}
          name="ChangePassword"
          options={{ title: "Change Password" }}
        />
        <Stack.Screen
          component={ChangeProfileScreen}
          name="ChangeProfile"
          options={{ title: "Change Profile" }}
        />
        <Stack.Screen
          component={ComicDetailScreen}
          name="ComicDetail"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={ReadComicScreen}
          name="ReadComic"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChatBot"
          component={ChatBotScreen}
          options={{
            title: "Chat with AI",
            headerTitleStyle: {
              color: colors.white,
              fontSize: 28,
              fontWeight: "600",
              letterSpacing: 1.5,
            },
          }}
        />
      </Stack.Group>

      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          name="ChooseChapter"
          component={ChooseChaptersScreen}
          options={{ title: "List chapters" }}
        />
        <Stack.Screen
          name="Comments"
          component={CommentsScreen}
          options={{ title: "Comments" }}
        />
        <Stack.Screen
          name="Filter"
          component={FilterScreen}
          options={{
            title: "Filter",
            headerTitleStyle: {
              color: colors.white,
              fontSize: 28,
              fontWeight: "600",
              letterSpacing: 1.5,
            },
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default AppScreenNavigator;
