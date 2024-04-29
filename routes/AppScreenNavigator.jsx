import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import ProfileDetailScreen from "../screens/ProfileDetailScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import MainScreenNavigator from "./MainScreenNavigator";
import colors from "../variables/colors/colors";
import ChangeProfileScreen from "../screens/ChangeProfileScreen";

const Stack = createNativeStackNavigator();

const AppScreenNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
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
    </Stack.Navigator>
  );
};

export default AppScreenNavigator;

const styles = StyleSheet.create({});
