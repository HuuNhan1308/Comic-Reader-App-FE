import { Platform, StyleSheet, TextInput, View } from "react-native";

import React from "react";
import colors from "../variables/colors/colors";

const IconInput = ({
  onChange,
  value,
  placeholder,
  icon,
  secureTextEntry = false,
  inputStyle = null,
}) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.iconContainer}>{icon ?? <></>}</View>
      <TextInput
        style={[styles.input, inputStyle]}
        value={value}
        onChange={onChange}
        placeholder={placeholder ?? ""}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default IconInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: Platform.OS === "android" ? 20 : 30,
    flexDirection: "row",
    width: "80%",
    alignItems: "center",
  },
  iconContainer: {
    borderRadius: 100,
    backgroundColor: colors.purple500,
    padding: 6,
    marginRight: 10,
  },
  input: {
    paddingVertical: Platform.OS === "android" ? 6 : 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    fontSize: 16,
    borderRadius: 100,
    flex: 1,
    maxWidth: "100%",
  },
});
