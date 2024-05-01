import { StyleSheet, Text, View, TextInput, Platform } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

import colors from "../../variables/colors/colors";

const InputField = ({
  title,
  icon,
  secureTextEntry = false,
  onPressIcon,
  value,
  onChangeText,
  rootStyle,
  inputContainerStyle,
  inputStyle,
  iconStyle,
  placeholder = "",
}) => {
  return (
    <View style={[styles.inputFieldContainer, rootStyle]}>
      {title && <Text style={styles.title}>{title}</Text>}

      <View style={[styles.inputContainer, inputContainerStyle]}>
        <TextInput
          style={[styles.input, inputStyle]}
          secureTextEntry={secureTextEntry}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
        />

        {icon && (
          <Feather
            name={icon}
            size={24}
            color="white"
            style={[styles.icon, iconStyle]}
            onPress={onPressIcon}
          />
        )}
      </View>
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  inputFieldContainer: { paddingHorizontal: 30 },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.white,
    marginBottom: 10,
    letterSpacing: 1.8,
    marginTop: 40,
  },
  inputContainer: { flexDirection: "row", alignItems: "center" },
  input: {
    paddingVertical: Platform.OS === "android" ? 6 : 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    fontSize: 16,
    color: colors.white,
    borderColor: colors.white,
    borderRadius: 14,
    flex: 1,
  },
  icon: {
    position: "absolute",
    right: 0,
    padding: 12,
  },
});
