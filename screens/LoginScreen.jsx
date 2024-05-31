import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  ActivityIndicator,
  Platform,
} from "react-native";
import React, { useState, useContext } from "react";
import IconInput from "../components/IconInput";
import { AntDesign } from "@expo/vector-icons";
import colors from "../variables/colors/colors";
import { login } from "../services/LoginServices";
import { AuthContext } from "../store/AuthContext";
import { UserContext } from "../store/UserContext";
import { SET_ALL } from "../store/UserReducer/constants";
import { getMyInformation } from "../services/UserServices";
import { getMyBookmakrs } from "../services/BookmarkServices";

// RESPONSIBILITY BY: DIEP HOAI AN

/**
 * Represents the login screen component.
 *
 * @component
 * @param {object} navigation - The navigation object used for screen navigation.
 * @returns {JSX.Element} The login screen component.
 */
const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isTryingLogin, setIsTryingLogin] = useState(false);

  const authCtx = useContext(AuthContext);
  const { userDispatch } = useContext(UserContext);

  /**
   * Handles the change of the username input value.
   *
   * @param {string} username - The username entered by the user.
   *
   * This function is typically used to update the username state when the user types in the username input field.
   */
  function handleChangeUsername(username) {
    setUsername(username);
  }

  /**
   * Handles the change of the password input value.
   *
   * @param {string} password - The password entered by the user.
   *
   * This function is typically used to update the password state when the user types in the password input field.
   */
  function handleChangePassword(password) {
    setPassword(password);
  }

  /**
   * Navigates to the Home screen.
   *
   * This function is typically used to navigate to the Home screen when the user successfully logs in.
   * It uses the replace function from the navigation prop to replace the current screen with the Home screen.
   */
  function handleNavigateToHome() {
    navigation.replace("App", { screen: "Home" });
  }

  /**
   * Navigates to the ForgetPassword screen.
   *
   * This function is typically used to navigate to the ForgetPassword screen when the forget password button is pressed.
   * It uses the navigate function from the navigation prop to navigate to the ForgetPassword screen.
   */
  function handleNavigateToForgetPW() {
    navigation.navigate("ForgetPassword");
  }

  /**
   * Logs the user in.
   *
   * This function is asynchronous. It first sets the isTryingLogin state to true.
   * It then calls the `login` API with the username and password.
   *
   * If the response code from the API is 4000, it shows an alert with the response message and returns early.
   *
   * It then stores the token from the response in the auth context.
   *
   * It then fetches the user's information and bookmarks from the server using the token, and stores them in the user context and reducer.
   *
   * It then navigates to the Home screen.
   *
   * If an error occurs during the process, it shows an alert with a generic error message and logs the error.
   *
   * Regardless of the outcome, it finally sets the isTryingLogin state to false.
   */
  async function handleLogin() {
    try {
      setIsTryingLogin(true);
      const loginResponse = await login(username, password);

      if (loginResponse.code === 4000) {
        Alert.alert("Failed", `Login failed, ${loginResponse.message}`);
        return;
      }

      //store token to context
      const authObj = loginResponse.result;
      authCtx.authenticate(authObj.token);

      //store user information to context + reducer
      const myInformationResponse = await getMyInformation(authObj.token);
      const myBookmarksResponse = await getMyBookmakrs(authObj.token);
      userDispatch({
        type: SET_ALL,
        payload: {
          id: myInformationResponse.result.id,
          fullName: myInformationResponse.result.fullName,
          email: myInformationResponse.result.email,
          dateOfBirth: myInformationResponse.result.dateOfBirth,
          isMale: myInformationResponse.result.male,
          bookmarks: myBookmarksResponse.result,
        },
      });
      handleNavigateToHome();
      setIsTryingLogin(false);
    } catch (error) {
      Alert.alert(
        "Failed",
        `Login failed with unexpected error, try again later`
      );
      console.log("Fetc failed ", error);
    } finally {
      setIsTryingLogin(false);
    }
  }

  if (isTryingLogin === true) {
    return <ActivityIndicator size="large" color="black" style={{ flex: 1 }} />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
        <Pressable
          style={({ pressed }) => [
            styles.skipButton,
            pressed ? styles.pressed : null,
          ]}
          onPress={handleNavigateToHome}
        >
          <Text style={{ fontSize: 20, fontWeight: "600" }}>Skip</Text>
        </Pressable>

        {/* Logo */}
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/book-icon.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        {/* Header */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>LOGIN</Text>
          <Text style={styles.description}>Sign in to continue</Text>
        </View>

        {/* Form */}
        <View>
          <IconInput
            value={username}
            onChangeText={handleChangeUsername}
            placeholder={"Username"}
            icon={<AntDesign name="user" size={24} color="black" />}
          />

          <IconInput
            value={password}
            onChangeText={handleChangePassword}
            placeholder={"Password"}
            icon={<AntDesign name="key" size={24} color="black" />}
            secureTextEntry={true}
          />
        </View>

        <View style={{ alignItems: "center" }}>
          <Pressable
            onPress={handleLogin}
            style={({ pressed }) => [
              styles.button,
              pressed ? styles.buttonPressed : null,
            ]}
          >
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
        </View>

        <View style={styles.bottomTextContainer}>
          <Text>Dont have account? </Text>
          <Text
            style={styles.controllerText}
            onPress={() => {
              navigation.navigate("Register");
            }}
            suppressHighlighting={false}
          >
            Register
          </Text>
        </View>
        <View style={styles.bottomTextContainer}>
          <Text
            style={styles.controllerText}
            onPress={handleNavigateToForgetPW}
            suppressHighlighting={false}
          >
            Forget your password?
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 30,
  },
  rootContainer: { flex: 1, alignItems: "center" },
  imageContainer: {
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 150,
    height: 150,
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.purple800,
  },
  description: {
    fontSize: 20,
    color: colors.purple900,
    fontWeight: "600",
  },
  button: {
    marginTop: 30,
    marginBottom: 30,
    paddingVertical: 10,
    paddingHorizontal: 50,
    backgroundColor: "#BCA2D2",
    borderRadius: 100,
    width: Platform.OS === "android" ? 160 : 180,
  },
  buttonText: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "500",
  },
  buttonPressed: {
    opacity: 0.7,
  },
  bottomTextContainer: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  controllerText: {
    color: "#877099",
    fontWeight: "600",
    paddingVertical: 4,
  },
  skipButton: {
    position: "absolute",
    top: 60,
    right: 0,
    padding: 4,
    zIndex: 100,
  },
  pressed: {
    opacity: 0.5,
  },
});
