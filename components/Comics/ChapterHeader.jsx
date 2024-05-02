import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useState } from "react";
import { FILTER_CHAPTER } from "../../variables/filters/filter_chapter";
import colors from "../../variables/colors/colors";

const ChapterHeader = ({ tilte, activeButton, buttons, onPressButton }) => {
  return (
    <View style={styles.root}>
      <Text style={[styles.title]}>{tilte}</Text>

      {/* Filter container */}
      <View style={styles.chapterFilterContainer}>
        {buttons.map((button) => (
          <Pressable
            key={button}
            onPress={() => onPressButton(button)}
            style={({ pressed }) => [pressed ? styles.pressed : null]}
          >
            <Text
              style={[
                styles.chapterFilterText,
                activeButton === button && styles.chapterFilterText__active,
              ]}
            >
              {button}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default ChapterHeader;

const styles = StyleSheet.create({
  title: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 30,
  },
  root: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  chapterFilterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  chapterFilterText: { color: colors.white, marginHorizontal: 6 },
  chapterFilterText__active: { color: "#db5300" },
});
