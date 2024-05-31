import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import ComicsScreen from "../screens/ComicsScreen";
import BookmarkScreen from "../screens/BookmarkScreen";
import ProfileScreen from "../screens/ProfileScreen";
import colors from "../variables/colors/colors";

// RESPONSIBILITY BY: HO HUU NHAN

const Tab = createBottomTabNavigator();

/**
 * `MainScreenNavigator` is a React component that sets up the bottom tab navigation for the main screens of the app.
 *
 * It uses the `createBottomTabNavigator` function from `@react-navigation/bottom-tabs` to create a bottom tab navigator.
 *
 * The bottom tab navigator has four screens: Home, Comics, Bookmark, and Profile. Each screen is associated
 * with a component and has a tab bar icon. The Home and Bookmark screens use icons from `@expo/vector-icons/Entypo`,
 * while the Comics and Profile screens use icons from `@expo/vector-icons/AntDesign`.
 *
 * The bottom tab navigator has some default screen options, such as the height and background color of the tab bar,
 * the bottom margin of the tab bar item (which is different for Android and iOS), the active tint color of the tab bar,
 * the top margin of the tab bar icon, the alignment of the header title, the font size, weight, and letter spacing of the header title.
 *
 * Each screen in the bottom tab navigator can also have its own options, such as the tab bar icon, whether the header is shown,
 * the label of the tab bar, the title of the header, the background color of the header, and the tint color of the header.
 *
 * @returns {ReactElement} The bottom tab navigator.
 */
const MainScreenNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {
          height: Platform.OS === "android" ? 60 : 90,
          backgroundColor: "black",
        },
        tabBarItemStyle: {
          marginBottom: Platform.OS === "android" ? 10 : 0,
        },
        tabBarActiveTintColor: "#e5c35b",
        tabBarIconStyle: {
          marginTop: 10,
        },
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: 28,
          fontWeight: "600",
          letterSpacing: 1.5,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Comics"
        component={ComicsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="search1" size={size - 4} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Bookmark"
        component={BookmarkScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="open-book" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" size={size} color={color} />
          ),
          tabBarLabel: "Profile",
          headerTitle: "Profile",
          headerStyle: {
            backgroundColor: colors.red700,
          },
          headerTintColor: "white",
        }}
      />
    </Tab.Navigator>
  );
};

export default MainScreenNavigator;
