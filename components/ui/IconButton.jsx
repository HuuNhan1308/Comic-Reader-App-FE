import { StyleSheet, Pressable } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "../../variables/colors/colors";

const IconButton = ({ icon, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [pressed ? styles.pressed : null]}
      onPress={onPress}
    >
      {icon}
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  bottomControllersIcon: {
    color: colors.white,
    paddingHorizontal: 20,
    fontSize: 30,
  },
  pressed: {
    opacity: 0.8,
  },
});
