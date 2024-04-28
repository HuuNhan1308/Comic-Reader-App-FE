import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, Platform, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import ComicsScreen from "./screens/ComicsScreen";
import BookmarkScreen from "./screens/BookmarkScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AuthContextProvider, { AuthContext } from "./store/AuthContext";
import IconButton from "./components/IconButton";
import { checkExpiredToken, checkNearExpiredToken } from "./utils/TokenUtil";
import { refreshToken } from "./services/TokenServices";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabScreen() {
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();

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
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="exit"
            color={tintColor}
            size={24}
            onPress={() => {
              authCtx.logout();
              navigation.navigate("Login");
            }}
          />
        ),
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
        }}
      />
    </Tab.Navigator>
  );
}

function Root() {
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    /**
     * Fetches the token from AsyncStorage and performs necessary actions based on the token's validity.
     * If the token is expired, it logs out the user.
     * If the token is near expiration, it refreshes the token.
     * If the token is valid, it authenticates the user.
     */
    async function fetchToken() {
      try {
        const storedToken = await AsyncStorage.getItem("token");

        if (storedToken) {
          // If token is expired then logout
          if (checkExpiredToken(storedToken) === true) {
            console.log("Token is expired!!");
            authCtx.logout();
            return;
          }

          // If token is near expired then refresh the token
          if (checkNearExpiredToken(storedToken, 3600) === true) {
            const response = await refreshToken(storedToken);
            authCtx.authenticate(response.result.token);
            return;
          }

          // If token is valid then authenticate the user
          authCtx.authenticate(storedToken);
        } else console.log("No token in local device");
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchToken();
  }, []);

  if (isLoading) {
    return (
      <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1 }} />
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={authCtx.isAuthenticated ? "Main" : "Login"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Main" component={TabScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default function App() {
  return (
    <>
      <StatusBar />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
