import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

const Header = ({ title, textButton, onPress }) => {
  function notImplemeted() {
    console.error("method onPress is not implemented");
  }

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.header}>{title}</Text>
      {textButton && (
        <Pressable onPress={onPress ?? notImplemeted}>
          <Text>{textButton}</Text>
        </Pressable>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  header: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
