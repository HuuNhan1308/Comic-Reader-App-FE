import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import { AuthContext } from "../store/AuthContext";
import { UserContext } from "../store/UserContext";
import colors from "../variables/colors/colors";
import IconTextButton from "../components/Profile/IconTextButton";
import { CLEAR_ALL } from "../store/UserReducer/constants";

// RESPONSIBILITY BY: DIEP HOAI AN

/**
 * Represents the profile screen of the application.
 *
 * @param {object} navigation - The navigation prop provided by React Navigation.
 * @returns {JSX.Element} The profile screen component.
 */
const ProfileScreen = ({ navigation }) => {
  const authCtx = useContext(AuthContext);
  const { userState, userDispatch } = useContext(UserContext);

  /**
   * Logs the user out.
   *
   * This function is typically used to log the user out when the logout button is pressed.
   * It calls the logout function from the auth context to remove the user's token.
   * It dispatches the CLEAR_ALL action to the user reducer to clear the user's information and bookmarks.
   * It uses the replace function from the navigation prop to replace the current screen with the Login screen.
   */
  function handleLogout() {
    authCtx.logout();
    userDispatch({ type: CLEAR_ALL });
    navigation.replace("Login");
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

  /**
   * Navigates to the ProfileDetail screen.
   *
   * This function is typically used to navigate to the ProfileDetail screen when the navigate to profile detail button is pressed.
   * It uses the navigate function from the navigation prop to navigate to the ProfileDetail screen.
   */
  function handleNavigateToProfileDetail() {
    navigation.navigate("ProfileDetail");
  }

  return (
    <View style={styles.root}>
      {/* User infor block */}
      <View style={styles.profileContainer}>
        {userState.id !== null ? (
          <>
            <Text style={styles.userName}>{userState.fullName}</Text>
            <Text style={styles.userEmail}>{userState.email}</Text>
            <IconTextButton
              title={"Profile & Security"}
              icon={<AntDesign name="user" size={24} color="black" />}
              rootStyle={styles.IconTextButtonRoot}
              onPress={handleNavigateToProfileDetail}
            />
          </>
        ) : (
          <>
            <Text style={styles.userName}>GUESS</Text>
            <IconTextButton
              title={"Login"}
              icon={<AntDesign name="user" size={24} color="black" />}
              rootStyle={styles.IconTextButtonRoot}
              onPress={handleNavigateToLogin}
            />
          </>
        )}
      </View>

      {/* Other controllers block */}
      <View style={styles.controllersContainer}>
        <IconTextButton
          title={"About us"}
          icon={
            <MaterialCommunityIcons
              name="account-group-outline"
              size={24}
              color="black"
            />
          }
          rootStyle={styles.IconTextButtonRoot}
          onPress={() => {
            console.log("Navigate to profile screen");
          }}
        />
        <IconTextButton
          title={"Others"}
          icon={
            <MaterialCommunityIcons
              name="information-variant"
              size={24}
              color="black"
            />
          }
          rootStyle={styles.IconTextButtonRoot}
          onPress={() => {
            console.log("Navigate to profile screen");
          }}
        />

        {userState.id !== null && (
          <IconTextButton
            title={"Logout"}
            icon={
              <Ionicons
                name="exit"
                size={24}
                color="black"
                style={{ transform: [{ translateX: 2.5 }] }}
              />
            }
            rootStyle={styles.IconTextButtonRoot}
            onPress={handleLogout}
          />
        )}
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#231f20",
    overflow: "hidden",
  },
  profileContainer: {
    paddingHorizontal: 24,
    backgroundColor: colors.red700,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    backgroundColor: "grey",
  },
  userInforContainer: { marginLeft: 8 },
  userName: {
    color: "#FFF",
    fontWeight: "500",
    fontSize: 24,
    paddingTop: 8,
  },
  userEmail: {
    color: "#B6B6B6",
    fontWeight: "500",
    fontSize: 14,
    fontStyle: "italic",
    paddingVertical: 4,
  },
  IconTextButtonRoot: {
    marginTop: 16,
  },
  controllersContainer: {
    paddingHorizontal: 24,
    marginTop: 20,
  },
  icon: {},
});
