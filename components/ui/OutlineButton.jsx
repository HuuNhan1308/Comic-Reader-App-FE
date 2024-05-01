import { StyleSheet, Text, Pressable } from "react-native";
import React from "react";
import colors from "../../variables/colors/colors";

const OutlineButton = ({ title, icon, isActive, onPress, textStyle }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.filterProgressButton,
        isActive ? styles.filterProgressButton__active : null,
        pressed ? styles.pressed : null,
      ]}
    >
      {icon ? icon : <></>}
      <Text style={textStyle}>{title}</Text>
    </Pressable>
  );
};

export default OutlineButton;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.5,
  },
  filterProgressButton: {
    flex: 1,
    marginHorizontal: 20,
    borderWidth: 2,
    borderColor: colors.grey100,
    borderRadius: 8,
    paddingVertical: 2,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  filterProgressButton__active: {
    backgroundColor: colors.grey100,
  },
  filterProgressText: {},
});
