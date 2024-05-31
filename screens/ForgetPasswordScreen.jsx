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

/**
 * Renders the Forget Password screen.
 *
 * @component
 * @param {object} navigation - The navigation object provided by React Navigation.
 * @returns {JSX.Element} The Forget Password screen component.
 */
const ForgetPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [OTP, setOTP] = useState("");
  const [isLoading, setIsLoading] = useState({
    sending: false,
    verifying: false,
  });
  const [message, setMessage] = useState("");

  /**
   * Handles the change of the email input value.
   *
   * @param {string} text - The text entered by the user.
   *
   * This function is typically used to update the email state when the user types in the email input field.
   */
  function handleChangeEmail(text) {
    setEmail(text);
  }

  /**
   * Handles the change of the OTP input value.
   *
   * @param {string} text - The text entered by the user.
   *
   * This function is typically used to update the OTP state when the user types in the OTP input field.
   */
  function handleChangeOTP(text) {
    setOTP(text);
  }

  /**
   * Sends an OTP to the user's email.
   *
   * This function is asynchronous. It first checks if the email state is empty, and returns early with a message if it is.
   * It then sets the sending property of the isLoading state to true and calls the `sendOTP` API with the email.
   *
   * If the response from the API includes a message, it sets the message state to the response message.
   *
   * If an error occurs during the process, it logs the error.
   *
   * Regardless of the outcome, it finally sets the sending property of the isLoading state to false.
   */
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

  /**
   * Verifies the OTP entered by the user.
   *
   * This function is asynchronous. It first checks if the email state is empty, and returns early with a message if it is.
   * It then sets the verifying property of the isLoading state to true and calls the `verifyOTP` API with the email and the OTP.
   *
   * If the response from the API includes a message, it sets the message state to the response message.
   *
   * If an error occurs during the process, it logs the error.
   *
   * Regardless of the outcome, it finally sets the verifying property of the isLoading state to false.
   */
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

  /**
   * Navigates to the Login screen.
   *
   * This function is typically used to navigate to the Login screen when the navigate to login button is pressed.
   * It uses the navigate function from the navigation prop to navigate to the Login screen.
   */
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
