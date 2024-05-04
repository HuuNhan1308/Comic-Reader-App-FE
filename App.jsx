import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet } from "react-native";
import { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import AppScreenNavigator from "./routes/AppScreenNavigator";
import AuthContextProvider, { AuthContext } from "./store/AuthContext";
import { checkExpiredToken, checkNearExpiredToken } from "./utils/TokenUtil";
import { checkValidToken, refreshToken } from "./services/TokenServices";
import UserContextProvider, { UserContext } from "./store/UserContext";
import { getMyInformation } from "./services/UserServices";
import { SET_ALL } from "./store/UserReducer/constants";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Root() {
  const authCtx = useContext(AuthContext);
  const { userDispatch } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(true);

  /**
   * Fetches the token from AsyncStorage and performs authentication and user information retrieval.
   * If the token is expired, it logs out the user.
   * If the token is near expiration, it refreshes the token.
   * If the token is valid, it authenticates the user and sets the userContext.
   */
  useEffect(() => {
    async function fetchToken() {
      try {
        let storedToken = await AsyncStorage.getItem("token");

        if (storedToken) {
          // If token is expired then logout
          if (checkExpiredToken(storedToken) === true) {
            console.log("Token is expired!!");
            authCtx.logout();
            return;
          }

          // If token is not valid anymore
          if (checkValidToken(storedToken) === false) {
            console.log("Token is invalid!!");
            authCtx.logout();
            return;
          }

          // If token is near expired then refresh the token
          if (checkNearExpiredToken(storedToken, 3600) === true) {
            const response = await refreshToken(storedToken);
            storedToken = response.result.token;
          }

          // If token is valid then authenticate the user and set userContext
          console.log(storedToken);
          authCtx.authenticate(storedToken);
          const res = await getMyInformation(storedToken);
          userDispatch({
            type: SET_ALL,
            payload: {
              id: res.result.id,
              fullName: res.result.fullName,
              email: res.result.email,
              dateOfBirth: res.result.dateOfBirth,
              isMale: res.result.male,
            },
          });
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
    return <ActivityIndicator size="large" color="grey" style={{ flex: 1 }} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={authCtx.isAuthenticated ? "App" : "Login"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="App" component={AppScreenNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default function App() {
  return (
    <>
      <StatusBar />
      <AuthContextProvider>
        <UserContextProvider>
          <Root />
        </UserContextProvider>
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
