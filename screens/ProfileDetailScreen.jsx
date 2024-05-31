import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import colors from "../variables/colors/colors";
import RowText from "../components/Profile/RowText";
import { UserContext } from "../store/UserContext";
import { AntDesign } from "@expo/vector-icons";

/**
 * Renders the profile detail screen.
 *
 * @param {object} navigation - The navigation prop provided by React Navigation.
 * @returns {JSX.Element} The rendered profile detail screen.
 */
const ProfileDetailScreen = ({ navigation }) => {
  const { userState } = useContext(UserContext);

  /**
   * Navigates to the ChangePassword screen.
   *
   * This function is typically used to navigate to the ChangePassword screen when the change password button is pressed.
   * It uses the navigate function from the navigation prop to navigate to the ChangePassword screen.
   */
  function handleNavigateToChangePassword() {
    navigation.navigate("ChangePassword");
  }

  /**
   * Navigates to the ChangeProfile screen.
   *
   * This function is typically used to navigate to the ChangeProfile screen when the change profile button is pressed.
   * It uses the navigate function from the navigation prop to navigate to the ChangeProfile screen.
   */
  function handleNavigateToChangeProfile() {
    navigation.navigate("ChangeProfile");
  }

  return (
    <View style={styles.root}>
      <RowText title={"Full Name"} value={userState.fullName} />
      <RowText title={"Email"} value={userState.email} />
      <RowText title={"Date of birth"} value={userState.dateOfBirth} />
      <RowText title={"Gender"} value={userState.isMale ? "Male" : "Female"} />

      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.pressed : null,
        ]}
        android_ripple={{ color: "#555" }}
        onPress={handleNavigateToChangePassword}
      >
        <Text style={styles.buttonTitle}>Change password</Text>
        <AntDesign
          name="arrowright"
          size={24}
          color="black"
          style={styles.buttonIcon}
        />
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.button,
          { marginTop: 10 },
          pressed ? styles.pressed : null,
        ]}
        android_ripple={{ color: "#555" }}
        onPress={handleNavigateToChangeProfile}
      >
        <Text style={styles.buttonTitle}>Change profile</Text>
        <AntDesign
          name="arrowright"
          size={24}
          color="black"
          style={styles.buttonIcon}
        />
      </Pressable>
    </View>
  );
};

export default ProfileDetailScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.darkgrey,
  },
  button: {
    backgroundColor: colors.lightgrey,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
  },
  buttonTitle: { color: "#FFF" },
  buttonIcon: { color: "#FFF" },
  pressed: {
    opacity: 0.7,
  },
});
