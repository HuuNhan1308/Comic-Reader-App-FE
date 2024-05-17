import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../../variables/colors/colors";

const ChatBox = ({ owner, text, isQuestion }) => {
  return (
    <View
      style={[
        styles.container,
        isQuestion ? styles.rightAlign : styles.leftAlign,
      ]}
    >
      <Text
        style={[
          styles.ownerText,
          isQuestion ? styles.rightAlign : styles.leftAlign,
        ]}
      >
        {owner}
      </Text>
      <Text
        style={[
          styles.commentText,
          isQuestion ? styles.rightAlign : styles.leftAlign,
        ]}
      >
        {text}
      </Text>
    </View>
  );
};

export default ChatBox;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#525252",
    borderWidth: 1,
    marginTop: 20,
    borderRadius: 10,
    padding: 10,
    minWidth: "50%",
  },
  rightAlign: {
    alignSelf: "flex-end",
    backgroundColor: "#5A7F8D",
  },
  leftAlign: {
    alignSelf: "flex-start",
    backgroundColor: "#4E422B",
  },
  ownerText: { color: colors.white, fontWeight: "600" },
  commentText: { color: "#B1B1B1" },
  createAtText: { color: "#969696", textAlign: "right" },
});
