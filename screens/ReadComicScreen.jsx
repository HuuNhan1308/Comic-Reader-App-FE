import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ReadComicScreen = ({ route, navigation }) => {
  const { comicId, chapterNumber } = route.params;

  navigation.setOptions({ title: `Chapter ${chapterNumber}` });

  console.log(comicId, chapterNumber);

  return (
    <View>
      <Text>ReadComicScreen</Text>
    </View>
  );
};

export default ReadComicScreen;

const styles = StyleSheet.create({});
