import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ErrorMessage = ({ message }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ flex: 1, alignSelf: "center" }}>{message}</Text>
    </View>
  );
};

export default ErrorMessage;

const styles = StyleSheet.create({});
