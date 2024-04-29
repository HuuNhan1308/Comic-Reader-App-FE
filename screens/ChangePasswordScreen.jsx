import {
  StyleSheet,
  Text,
  Pressable,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import colors from "../variables/colors/colors";
import InputField from "../components/Profile/InputField";
import { changePassword } from "../services/UserServices";
import { AuthContext } from "../store/AuthContext";

const ChangePasswordScreen = ({ route, navigation }) => {
  const [currentPasswordInputVisibility, setCurrentPasswordInputVisibility] =
    useState(true);
  const [newPasswordInputVisibility, setNewPasswordInputVisibility] =
    useState(true);
  const [confirmPasswordInputVisibility, setConfirmPasswordInputVisibility] =
    useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const authCtx = useContext(AuthContext);

  function handleToggleNewPasswordInputVisibility() {
    setNewPasswordInputVisibility((prev) => !prev);
  }

  function handleToggleConfirmPasswordInputVisibility() {
    setConfirmPasswordInputVisibility((prev) => !prev);
  }

  function handleToggleCurrentPasswordInputVisibility() {
    setCurrentPasswordInputVisibility((prev) => !prev);
  }

  function handleChangeCurrentPassword(currentPassword) {
    setCurrentPassword(currentPassword);
  }

  function handleChangeNewPassword(newPassword) {
    setNewPassword(newPassword);
  }

  function handleChangeConfirmNewPassword(confirmNewPassword) {
    setConfirmNewPassword(confirmNewPassword);
  }

  async function handleSubmitChangePassword() {
    try {
      setIsLoading(true);
      //validate
      if (newPassword.trim() === "" || confirmNewPassword.trim() === "") {
        Alert.alert("Failed", "Please enter a new password");
        return;
      }

      if (currentPassword.trim() === "") {
        Alert.alert("Failed", "Please enter current password");
        return;
      }

      if (newPassword !== confirmNewPassword) {
        Alert.alert("Failed", "New password and confirm password do not match");
        return;
      }

      //call api
      const res = await changePassword(
        authCtx.token,
        currentPassword,
        newPassword
      );

      if (res.code !== 200) {
        console.log(res);
        Alert.alert("Failed", "Wrong current password!!");
        return;
      }

      Alert.alert(
        "Success",
        "Change password successfully, please login again"
      );
      authCtx.logout();
      navigation.navigate("Login");
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <ActivityIndicator size="large" color="#FFF" style={styles.root} />;
  }

  return (
    <ScrollView style={styles.fullHeight}>
      <KeyboardAvoidingView
        style={styles.fullHeight}
        behavior="position"
        contentContainerStyle={styles.root}
      >
        <InputField
          title={"Current password"}
          secureTextEntry={currentPasswordInputVisibility}
          icon={currentPasswordInputVisibility ? "eye" : "eye-off"}
          onPressIcon={handleToggleCurrentPasswordInputVisibility}
          value={currentPassword}
          onChangeText={handleChangeCurrentPassword}
        />

        <InputField
          title={"New password"}
          secureTextEntry={newPasswordInputVisibility}
          icon={newPasswordInputVisibility ? "eye" : "eye-off"}
          onPressIcon={handleToggleNewPasswordInputVisibility}
          value={newPassword}
          onChangeText={handleChangeNewPassword}
        />

        <InputField
          title={"Confirm password"}
          secureTextEntry={confirmPasswordInputVisibility}
          icon={confirmPasswordInputVisibility ? "eye" : "eye-off"}
          onPressIcon={handleToggleConfirmPasswordInputVisibility}
          value={confirmNewPassword}
          onChangeText={handleChangeConfirmNewPassword}
        />

        <Pressable
          onPress={handleSubmitChangePassword}
          style={({ pressed }) => [
            styles.button,
            pressed ? styles.pressed : null,
          ]}
        >
          <Text style={styles.buttonText}>CONFIRM</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  fullHeight: {
    flex: 1,
    backgroundColor: colors.darkgrey,
  },
  root: {
    flex: 1,
    backgroundColor: colors.darkgrey,
    paddingHorizontal: 30,
    justifyContent: "center",
  },
  button: {
    marginTop: 100,
    paddingVertical: 10,
    paddingHorizontal: 50,
    backgroundColor: "grey",
    borderRadius: 100,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.7,
  },
});
