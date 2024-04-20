import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import IconInput from "../components/IconInput";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import colors from "../variables/colors/colors";

const RegisterScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChangeEmail(event) {
    setEmail(event.target.value);
  }

  function handleChangePassword(event) {
    setPassword(event.target.value);
  }

  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView
        behavior="position"
        style={styles.screen}
        contentContainerStyle={styles.rootContainer}
      >
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/book-icon.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>CREATE NEW ACCOUNT</Text>
          <View style={styles.registerTextContainer}>
            <Text style={styles.description}>Already registered? </Text>
            <Text
              style={[styles.description, { fontWeight: "bold" }]}
              onPress={() => {
                navigation.navigate("Login");
              }}
              suppressHighlighting={false}
            >
              Login
            </Text>
          </View>
        </View>

        <IconInput
          value={email}
          onChange={handleChangeEmail}
          placeholder={"Email"}
          icon={<AntDesign name="user" size={24} color="black" />}
          inputStyle={styles.inputStyle}
        />

        <IconInput
          value={email}
          onChange={handleChangeEmail}
          placeholder={"Full name"}
          icon={<Ionicons name="information" size={24} color="black" />}
          inputStyle={styles.inputStyle}
        />

        <IconInput
          value={email}
          onChange={handleChangeEmail}
          placeholder={"Date of birth"}
          icon={<Fontisto name="date" size={24} color="black" />}
          inputStyle={styles.inputStyle}
        />

        <IconInput
          value={password}
          onChange={handleChangePassword}
          placeholder={"Password"}
          icon={<AntDesign name="key" size={24} color="black" />}
          secureTextEntry={true}
          inputStyle={styles.inputStyle}
        />

        <IconInput
          value={email}
          onChange={handleChangeEmail}
          placeholder={"Email"}
          icon={<AntDesign name="user" size={24} color="black" />}
          inputStyle={styles.inputStyle}
        />

        <View>
          <Pressable
            onPress={() => {
              console.log("Press");
            }}
            style={({ pressed }) => [
              styles.button,
              pressed ? styles.buttonPressed : null,
            ]}
          >
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default RegisterScreen;

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
    marginBottom: 10,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.purple800,
    textAlign: "center",
  },
  description: {
    fontSize: 20,
    color: colors.purple900,
    fontWeight: "400",
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
  inputStyle: {},
});
