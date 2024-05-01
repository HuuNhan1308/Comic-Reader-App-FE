import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import colors from "../variables/colors/colors";
import { getComicChapterById } from "../services/ComicServices";
import ChapterHeader from "../components/Comics/ChapterHeader";

const ComicDetailScreen = ({ route, navigation }) => {
  const { comicId } = route.params;

  const [isLoading, setIsLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [comic, setComic] = useState({
    id: 0,
    name: "",
    author: "",
    description: "",
    thumbnailUrl: "",
    view: 0,
    lastestChapter: 0,
    chapters: [],
    deleted: false,
    finished: false,
  });

  useEffect(() => {
    async function fetchComicChapters(comicId) {
      try {
        setIsLoading(true);
        const ComicChapterResponse = await getComicChapterById(comicId);
        setComic(ComicChapterResponse.result);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    }

    fetchComicChapters(comicId);
  }, []);

  function handleGoBack() {
    navigation.goBack();
  }

  function handleShowMore() {
    setShowMore((prev) => !prev);
  }

  if (isLoading) {
    return <ActivityIndicator size="large" color="black" style={{ flex: 1 }} />;
  }

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <SafeAreaView style={styles.root}>
        <AntDesign
          name="arrowleft"
          size={24}
          color="black"
          style={styles.backIcon}
          onPress={handleGoBack}
        />
        {/* Background image */}
        <Image
          source={
            comic.thumbnailUrl
              ? { uri: comic.thumbnailUrl }
              : require("../assets/book-icon.png")
          }
          style={styles.comicThumpnail}
        />

        {/* Show infor block */}
        <View style={styles.comicContainer}>
          {/* Comic Information  */}
          <View style={styles.comicInforContainer}>
            <Text style={[styles.comicName, styles.title]}>{comic.name}</Text>
            <Text style={styles.comicText}>Author: {comic.author}</Text>
            <Text style={styles.comicText}>View: {comic.view}</Text>
            {/* Genre Container */}
            <View style={styles.genreContainer}>
              {/* Map genre and render */}
              <Text style={styles.genre}>Map genre and render</Text>
            </View>
            <Text
              style={styles.comicText}
              numberOfLines={showMore ? 0 : 2}
              ellipsizeMode="tail"
            >
              Description: {comic.description}
            </Text>

            {/* Show less or more  */}
            <View style={styles.comicSeeMoreButtonContainer}>
              <Pressable
                onPress={handleShowMore}
                style={({ pressed }) => [
                  styles.comicSeeMoreButton,
                  pressed ? styles.pressed : null,
                ]}
              >
                {!showMore ? (
                  <Text style={styles.comicSeeMoreButtonText}>See more</Text>
                ) : (
                  <Text style={styles.comicSeeMoreButtonText}>Show less</Text>
                )}
              </Pressable>
            </View>
          </View>

          {/* Comic chapters */}
          <View style={styles.ChapterContainer}>
            <ChapterHeader />

            {/* Map chapter and render */}
          </View>
        </View>

        {/* Map comic chapters and render */}
      </SafeAreaView>
    </ScrollView>
  );
};

export default ComicDetailScreen;

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.darkgrey },
  title: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 30,
  },
  backIcon: {
    position: "absolute",
    left: 20,
    top: 20,
    padding: 8,
    zIndex: 100,
  },
  comicThumpnail: {
    width: "100%",
    height: "25%",
    objectFit: "fill",
    opacity: 0.6,
    backgroundColor: "black",
  },
  comicContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.lightgrey,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  comicName: {},
  comicText: { color: colors.white, textAlign: "justify" },
  comicSeeMoreButtonContainer: {
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
  },
  comicSeeMoreButton: {
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  comicSeeMoreButtonText: {
    color: "#329FF8",
  },
  genreContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 6,
    marginHorizontal: -6,
  },
  genre: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    color: "#CCCCCC",
    borderRadius: 6,
    paddingVertical: 2,
    paddingHorizontal: 4,
    marginHorizontal: 6,
  },
  pressed: {
    opacity: 0.7,
  },
});
