import {
  StyleSheet,
  Text,
  View,
  Platform,
  Pressable,
  TextInput,
} from "react-native";
import React from "react";

import colors from "../../variables/colors/colors";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { formatDate } from "../../utils/DateUtil";

const DatePicker = ({ title, value, onConfirm }) => {
  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: new Date(value),
      onChange: onConfirm,
      mode: "date",
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <Pressable
        style={({ pressed }) => [
          styles.inputContainer,
          pressed ? styles.pressed : null,
        ]}
        onPress={showDatePicker}
      >
        <TextInput
          style={styles.input}
          value={formatDate(value)}
          editable={false}
        />
      </Pressable>
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  container: { paddingHorizontal: 30 },
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
  pressed: {
    opacity: 0.8,
  },
});
