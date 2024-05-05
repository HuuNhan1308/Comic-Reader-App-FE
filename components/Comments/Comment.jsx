import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../../variables/colors/colors";

const Comment = ({ owner, comment, createAt }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.ownerText}>{owner}</Text>
      <Text style={styles.commentText}>{comment}</Text>
      <Text style={styles.createAtText}>{createAt}</Text>
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#525252",
    borderWidth: 1,
    marginTop: 20,
    borderRadius: 10,
    padding: 10,
  },
  ownerText: { color: colors.white, fontWeight: "600" },
  commentText: { color: "#B1B1B1" },
  createAtText: { color: "#969696", textAlign: "right" },
});
