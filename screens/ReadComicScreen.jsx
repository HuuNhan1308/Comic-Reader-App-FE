import {
  FlatList,
  Image,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { getComicIMGs } from "../services/ComicServices";

const ReadComicScreen = ({ route, navigation }) => {
  const { comicId, chapterNumber } = route.params;

  const [isLoading, setIsLoading] = useState(false);
  const [comicIMGs, setComicIMGs] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Chapter ${chapterNumber}`,
    });
    async function fetchComicChapterIMGs() {
      try {
        setIsLoading(true);
        const res = await getComicIMGs(comicId, chapterNumber);
        setComicIMGs(res.result);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    }

    fetchComicChapterIMGs();
  }, []);

  if (isLoading) {
    return <ActivityIndicator size="large" color="grey" style={{ flex: 1 }} />;
  }

  return (
    <View>
      <FlatList
        data={comicIMGs}
        keyExtractor={(item, index) => index}
        renderItem={({ item, index }) => (
          <Image source={{ uri: item }} style={styles.comicIMG} />
        )}
      />
    </View>
  );
};

export default ReadComicScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  comicIMG: {
    height: 600,
    resizeMode: "contain",
  },
});
