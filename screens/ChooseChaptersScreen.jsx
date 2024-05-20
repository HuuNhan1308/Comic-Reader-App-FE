import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Pressable,
  Platform,
} from "react-native";
import React from "react";
import colors from "../variables/colors/colors";
import { useEffect, useState } from "react";
import { getComicChaptersById } from "../services/ComicServices";
import ChapterHeader from "../components/Comics/ChapterHeader";
import { FILTER_CHAPTER } from "../variables/filters/filter_chapter";

const ChooseChaptersScreen = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [chapters, setChapters] = useState([]);
  const [filterChapter, setFilterChapter] = useState(FILTER_CHAPTER.OLDEST);

  const { comicId, chapterId } = route.params;

  function handleNavigateToReadComicScreen(chapterId) {
    navigation.navigate({
      name: "ReadComic",
      params: { chapterId },
      merge: true,
    });
  }

  function handleFilterChapter(filterType) {
    if (filterType === FILTER_CHAPTER.NEWEST) {
      setFilterChapter(FILTER_CHAPTER.NEWEST);
      setChapters((prev) => {
        return prev.sort((a, b) => b.chapterNumber - a.chapterNumber);
      });
    } else if (filterType === FILTER_CHAPTER.OLDEST) {
      setFilterChapter(FILTER_CHAPTER.OLDEST);
      setChapters((prev) => {
        return prev.sort((a, b) => a.chapterNumber - b.chapterNumber);
      });
    }
  }

  useEffect(() => {
    async function fetchChapters(comicId) {
      try {
        setIsLoading(true);
        const chaptersResponse = await getComicChaptersById(comicId);
        setChapters(chaptersResponse.result);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    }

    fetchChapters(comicId);
  }, []);

  return (
    <ScrollView style={styles.root} containerStyle={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="grey" style={{ flex: 1 }} />
      ) : (
        <>
          <ChapterHeader
            tilte={""}
            buttons={[FILTER_CHAPTER.NEWEST, FILTER_CHAPTER.OLDEST]}
            activeButton={filterChapter}
            onPressButton={(filterType) => handleFilterChapter(filterType)}
          />
          <FlatList
            data={chapters}
            keyExtractor={(item, index) => item.id}
            renderItem={({ item, index }) => (
              <Pressable
                onPress={() => handleNavigateToReadComicScreen(item.id)}
                style={({ pressed }) => [
                  styles.button,
                  chapterId === item.id ? styles.buttonActive : null,
                  pressed ? styles.pressed : null,
                ]}
              >
                <Text
                  style={[
                    styles.buttonText,
                    chapterId === item.id ? styles.buttonActiveText : null,
                  ]}
                >
                  Chapter {item.chapterNumber}
                </Text>
              </Pressable>
            )}
            numColumns={3}
            scrollEnabled={false}
            contentContainerStyle={styles.buttonContainer}
          />
        </>
      )}
    </ScrollView>
  );
};

export default ChooseChaptersScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.darkgrey,
    paddingHorizontal: 10,
  },
  container: { alignItems: "center" },
  buttonContainer: {
    alignItems: "center",
    marginTop: Platform.OS === "ios" ? 20 : 10,
  },
  button: {
    flex: undefined,
    backgroundColor: colors.lightgrey,
    borderRadius: 100,
    paddingVertical: 10,
    borderWidth: 0,
    paddingHorizontal: 18,
    marginHorizontal: 10,
    marginTop: 10,
  },
  buttonText: { color: colors.white, fontWeight: "600", fontSize: 12 },
  buttonActive: { backgroundColor: "#CF33259C" },
  buttonActiveText: { color: colors.white },
  pressed: {
    opacity: 0.8,
  },
});
