import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
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
import ChatGPTScreen from "../screens/ChatGPTScreen";

const Stack = createNativeStackNavigator();

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
          name="ChatGPT"
          component={ChatGPTScreen}
          options={{
            title: "Chat GPT",
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

const styles = StyleSheet.create({});
