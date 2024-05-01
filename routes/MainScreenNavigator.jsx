import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import ComicsScreen from "../screens/ComicsScreen";
import BookmarkScreen from "../screens/BookmarkScreen";
import ProfileScreen from "../screens/ProfileScreen";
import colors from "../variables/colors/colors";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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
