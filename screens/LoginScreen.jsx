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

const LoginScreen = ({ navigation, route }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isTryingLogin, setIsTryingLogin] = useState(false);

  const authCtx = useContext(AuthContext);
  const { userDispatch } = useContext(UserContext);

  function handleChangeUsername(username) {
    setUsername(username);
  }

  function handleChangePassword(password) {
    setPassword(password);
  }

  function handleNavigateToHome() {
    navigation.replace("App", { screen: "Home" });
  }

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
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView
        behavior="position"
        style={styles.screen}
        contentContainerStyle={styles.rootContainer}
      >
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
        <View style={{ width: "80%" }}>
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

        <View>
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

        <View style={styles.registerTextContainer}>
          <Text>Dont have account? </Text>
          <Text
            style={styles.registerText}
            onPress={() => {
              navigation.navigate("Register");
            }}
            suppressHighlighting={false}
          >
            Register
          </Text>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: { flex: 1, alignItems: "center" },
  imageContainer: {
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    height: 150,
  },
  image: {
    width: "100%",
    height: "100%",
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
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "500",
  },
  buttonPressed: {
    opacity: 0.7,
  },
  registerTextContainer: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },
  registerText: {
    color: "#877099",
    fontWeight: "600",
    paddingVertical: 4,
  },
  skipButton: {
    position: "absolute",
    top: 60,
    right: 40,
  },
  pressed: {
    opacity: 0.5,
  },
});
