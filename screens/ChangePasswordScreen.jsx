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

// RESPONSIBILITY BY: DIEP HOAI AN

/**
 * Represents the screen for changing the user's password.
 *
 * @component
 * @param {object} route - The route object containing the screen's route information.
 * @param {object} navigation - The navigation object used for navigating between screens.
 * @returns {JSX.Element} - The ChangePasswordScreen component.
 */
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

  /**
   * Toggles the visibility of the new password input.
   */
  function handleToggleNewPasswordInputVisibility() {
    setNewPasswordInputVisibility((prev) => !prev);
  }

  /**
   * Toggles the visibility of the confirm password input field.
   */
  function handleToggleConfirmPasswordInputVisibility() {
    setConfirmPasswordInputVisibility((prev) => !prev);
  }

  /**
   * Toggles the visibility of the current password input field.
   * This function is typically used for showing and hiding the password text.
   */
  function handleToggleCurrentPasswordInputVisibility() {
    setCurrentPasswordInputVisibility((prev) => !prev);
  }

  /**
   * Handles the change of the current password input field.
   * This function is typically used to update the state when the user types in the current password input field.
   *
   * @param {string} currentPassword - The current password entered by the user.
   */
  function handleChangeCurrentPassword(currentPassword) {
    setCurrentPassword(currentPassword);
  }

  /**
   * Handles the change of the new password input field.
   * This function is typically used to update the state when the user types in the new password input field.
   *
   * @param {string} newPassword - The new password entered by the user.
   */
  function handleChangeNewPassword(newPassword) {
    setNewPassword(newPassword);
  }

  /**
   * Handles the change of the confirm new password input field.
   * This function is typically used to update the state when the user types in the confirm new password input field.
   *
   * @param {string} confirmNewPassword - The confirmation of the new password entered by the user.
   */
  function handleChangeConfirmNewPassword(confirmNewPassword) {
    setConfirmNewPassword(confirmNewPassword);
  }

  /**
   * Validates the current password, new password, and confirm new password inputs.
   *
   * @returns {boolean} - Returns true if all inputs are valid, false otherwise.
   *
   * If the current password is empty, it shows an alert and returns false.
   * If the new password or confirm new password is empty, it shows an alert and returns false.
   * If the new password and confirm new password do not match, it shows an alert and returns false.
   */
  function validateInputs() {
    if (currentPassword.trim() === "") {
      Alert.alert("Failed", "Please enter current password");
      return false;
    }

    if (newPassword.trim() === "" || confirmNewPassword.trim() === "") {
      Alert.alert("Failed", "Please enter a new password");
      return false;
    }

    if (newPassword !== confirmNewPassword) {
      Alert.alert("Failed", "New password and confirm password do not match");
      return false;
    }

    return true;
  }

  /**
   * Handles the submission of the change password form.
   *
   * This function is asynchronous. It first sets the loading state to true.
   * Then, it validates the inputs by calling `validateInputs`. If the inputs are not valid, it returns early.
   *
   * If the inputs are valid, it calls the `changePassword` API with the current password and new password.
   * If the API response code is not 200, it logs the response, shows an alert, and returns early.
   *
   * If the API call is successful, it shows a success alert, logs the user out, and navigates to the Login screen.
   *
   * Regardless of the outcome, it finally sets the loading state to false.
   */
  async function handleSubmitChangePassword() {
    try {
      setIsLoading(true);

      if (!validateInputs()) {
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
