import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import colors from "../variables/colors/colors";
import RowText from "../components/Profile/RowText";
import { UserContext } from "../store/UserContext";
import { AntDesign } from "@expo/vector-icons";

const ProfileDetailScreen = ({ route, navigation }) => {
  const { userState } = useContext(UserContext);

  function navigateToChangePassword() {
    navigation.navigate("ChangePassword");
  }

  return (
    <View style={styles.root}>
      <RowText title={"Full Name"} value={userState.fullname} />
      <RowText title={"Email"} value={userState.email} />
      <RowText title={"Date of birth"} value={userState.dateOfBirth} />
      <RowText title={"Gender"} value={userState.isMale ? "Male" : "Female"} />

      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.pressed : null,
        ]}
        android_ripple={{ color: "#555" }}
        onPress={navigateToChangePassword}
      >
        <Text style={styles.buttonTitle}>Change password</Text>
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
