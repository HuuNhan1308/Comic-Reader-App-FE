import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useState } from "react";
import { FILTER_CHAPTER } from "../../variables/filters/filter_chapter";
import colors from "../../variables/colors/colors";

const ChapterHeader = () => {
  const [filterChapter, setFilterChapter] = useState(FILTER_CHAPTER.NEWEST);

  return (
    <View style={styles.root}>
      <Text style={[styles.title]}>Chapters</Text>

      {/* Filter container */}
      <View style={styles.chapterFilterContainer}>
        <Pressable
          onPress={() => setFilterChapter(FILTER_CHAPTER.NEWEST)}
          style={({ pressed }) => [pressed ? styles.pressed : null]}
        >
          <Text
            style={[
              styles.chapterFilterText,
              filterChapter === FILTER_CHAPTER.NEWEST &&
                styles.chapterFilterText__active,
            ]}
          >
            {FILTER_CHAPTER.NEWEST}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setFilterChapter(FILTER_CHAPTER.OLDEST)}
          style={({ pressed }) => [pressed ? styles.pressed : null]}
        >
          <Text
            style={[
              styles.chapterFilterText,
              filterChapter === FILTER_CHAPTER.OLDEST &&
                styles.chapterFilterText__active,
            ]}
          >
            {FILTER_CHAPTER.OLDEST}
          </Text>
        </Pressable>
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
