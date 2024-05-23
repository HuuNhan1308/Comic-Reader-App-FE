import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Platform,
} from "react-native";
import React, { useState } from "react";
import colors from "../variables/colors/colors";
import IconInput from "../components/IconInput";
import { AntDesign } from "@expo/vector-icons";
import { sendOTP, verifyOTP } from "../services/LoginServices";

const ForgetPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [OTP, setOTP] = useState("");
  const [isLoading, setIsLoading] = useState({
    sending: false,
    verifying: false,
  });
  const [message, setMessage] = useState("");

  function handleChangeEmail(text) {
    setEmail(text);
  }

  function handleChangeOTP(text) {
    setOTP(text);
  }

  async function handleSendOTP() {
    if (email === "") return setMessage("Please enter your email.");

    try {
      setIsLoading({ ...isLoading, sending: true });
      const res = await sendOTP(email);

      if (res && res.message) setMessage(res.message);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading({ ...isLoading, sending: false });
    }
  }

  async function handleVerifyOTP() {
    if (email === "") return setMessage("Please enter your email and OTP.");

    try {
      setIsLoading({ ...isLoading, verifying: true });

      const res = await verifyOTP(email, OTP);

      if (res && res.message) setMessage(res.message);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading({ ...isLoading, verifying: false });
    }
  }

  function handleNavigateToLogin() {
    navigation.navigate("Login");
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView style={styles.root}>
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
          <Text style={styles.title}>Forget password</Text>
          {/* <Text style={styles.description}>Sign in to continue</Text> */}
        </View>

        {/* Form to send OTP*/}
        <View>
          <IconInput
            value={email}
            onChangeText={handleChangeEmail}
            placeholder={"Your email"}
            icon={<AntDesign name="user" size={24} color="black" />}
          />

          <View style={styles.buttonContainer}>
            <Pressable
              onPress={handleSendOTP}
              style={({ pressed }) => [
                styles.button,
                pressed ? styles.pressed : null,
              ]}
            >
              {!isLoading.sending ? (
                <Text style={styles.buttonText}>Send</Text>
              ) : (
                <ActivityIndicator size="small" color="#0000ff" />
              )}
            </Pressable>
          </View>
        </View>

        {/* Form to send OTP*/}
        <View>
          {message && <Text style={{ textAlign: "center" }}>{message}</Text>}
          <IconInput
            value={OTP}
            onChangeText={handleChangeOTP}
            placeholder={"OTP"}
            icon={<AntDesign name="key" size={24} color="black" />}
            secureTextEntry={true}
          />

          <View style={styles.buttonContainer}>
            <Pressable
              onPress={handleVerifyOTP}
              style={({ pressed }) => [
                styles.button,
                pressed ? styles.pressed : null,
              ]}
            >
              {!isLoading.verifying ? (
                <Text style={styles.buttonText}>Verify</Text>
              ) : (
                <ActivityIndicator size="small" color="#0000ff" />
              )}
            </Pressable>
          </View>
        </View>

        <View style={styles.bottomTextContainer}>
          <Text
            style={styles.controllerText}
            onPress={handleNavigateToLogin}
            suppressHighlighting={false}
          >
            Back to Login
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ForgetPasswordScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 30,
  },
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
  },
  title: {
    fontSize: Platform.OS === "android" ? 40 : 30,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.purple800,
  },
  description: {
    fontSize: 20,
    color: colors.purple900,
    fontWeight: "600",
  },
  buttonContainer: { alignItems: "center" },
  button: {
    marginTop: 30,
    marginBottom: 30,
    paddingVertical: 10,
    paddingHorizontal: 40,
    width: 160,
    backgroundColor: "#BCA2D2",
    borderRadius: 100,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.7,
  },
  bottomTextContainer: {
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "center",
  },
  controllerText: {
    color: "#877099",
    fontWeight: "600",
    paddingVertical: 4,
    textAlign: "center",
  },
});
