import {
  StyleSheet,
  Text,
  View,
  Platform,
  Pressable,
  TextInput,
  Button,
} from "react-native";
import React, { useState } from "react";

import colors from "../../variables/colors/colors";
import { formatDate } from "../../utils/DateUtil";
import DateTimePicker from "@react-native-community/datetimepicker";

const DatePicker = ({ title, value, onConfirm }) => {
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date(value));

  const showDatePicker = () => {
    setShow(true);
  };

  const hideDatePicker = () => {
    setShow(false);
  };

  const handleConfirmSelectedDate = () => {
    hideDatePicker();
    onConfirm(null, selectedDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title} on IOS</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={formatDate(value)}
          editable={false}
          onPressOut={showDatePicker}
        />
      </View>
      {show && (
        <>
          <DateTimePicker
            onChange={(event, selectedDate) => {
              const offset = selectedDate.getTimezoneOffset();
              const localDate = new Date(
                selectedDate.getTime() - offset * 60 * 1000
              );
              setSelectedDate(localDate);
            }}
            value={selectedDate}
            mode="date"
            display="spinner"
            textColor="white"
          />
          <View style={styles.pickerControllersContainer}>
            <Button title="Confirm" onPress={handleConfirmSelectedDate} />
            <Button title="Cancel" onPress={hideDatePicker} />
          </View>
        </>
      )}
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
  pickerControllersContainer: {
    justifyContent: "space-around",
    flexDirection: "row",
  },
  pressed: {
    opacity: 0.8,
  },
});
