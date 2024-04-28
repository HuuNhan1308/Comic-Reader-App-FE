import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState, useContext } from "react";
import IconInput from "../components/IconInput";
import { AntDesign } from "@expo/vector-icons";
import colors from "../variables/colors/colors";
import { login } from "../services/LoginServices";
import { AuthContext } from "../store/AuthContext";

const LoginScreen = ({ navigation, route }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const authCtx = useContext(AuthContext);

  function handleChangeUsername(username) {
    setUsername(username);
  }

  function handleChangePassword(password) {
    setPassword(password);
  }

  async function handleLogin() {
    try {
      const response = await login(username, password);

      if (response.code === 4000) {
        Alert.alert("Failed", `Login failed, ${response.message}`);
        return;
      }

      const authObj = response.result;
      authCtx.authenticate(authObj.token, JSON.stringify(authObj.id));
      navigation.navigate("Main");
    } catch (error) {
      console.log("Fetc failed ", error);
    }
  }

  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView
        behavior="position"
        style={styles.screen}
        contentContainerStyle={styles.rootContainer}
      >
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
});
