import { StyleSheet, Text, View, Pressable } from "react-native";

import React from "react";

const IconTextButton = ({ icon, title, rootStyle, titleStyle, onPress }) => {
  return (
    <View style={[styles.root, rootStyle]}>
      <Pressable
        style={({ pressed }) => [[styles.container, pressed && styles.pressed]]}
        android_ripple={{ color: "#616161" }}
        onPress={onPress}
      >
        <View style={styles.iconContainer}>{icon ?? <></>}</View>
        <Text style={[styles.title, titleStyle]}>{title}</Text>
      </Pressable>
    </View>
  );
};

export default IconTextButton;

const styles = StyleSheet.create({
  root: { overflow: "hidden", borderRadius: 10, backgroundColor: "#3b3b3b" },
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  pressed: {
    opacity: 0.8,
  },
  iconContainer: {
    borderRadius: 100,
    backgroundColor: "#bfbfbf",
    padding: 6,
    marginRight: 10,
  },
  title: {
    color: "#d9d9d9",
    fontSize: 20,
    letterSpacing: 1.5,
  },
});
