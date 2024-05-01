import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
  FlatList,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import colors from "../variables/colors/colors";
import { getComicChapterById } from "../services/ComicServices";
import ChapterHeader from "../components/Comics/ChapterHeader";
import ComicInfor from "../components/Comics/ComicInfor";

const ComicDetailScreen = ({ route, navigation }) => {
  const { comicId } = route.params;

  const [isLoading, setIsLoading] = useState(false);
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

  function handleNavigateToReadComicScreen(chapterNumber) {
    navigation.navigate("ReadComicScreen", { comicId, chapterNumber: 1 });
  }

  if (isLoading) {
    return <ActivityIndicator size="large" color="black" style={{ flex: 1 }} />;
  }

  return (
    <ScrollView
      style={{ backgroundColor: colors.lightgrey }}
      contentContainerStyle={{ backgroundColor: colors.darkgrey }}
    >
      <AntDesign
        name="arrowleft"
        size={24}
        color="white"
        style={styles.backIcon}
        onPress={handleGoBack}
      />

      {/* Background image */}
      <View>
        <Image
          source={
            comic.thumbnailUrl
              ? { uri: comic.thumbnailUrl }
              : require("../assets/book-icon.png")
          }
          style={styles.comicThumpnail}
        />
      </View>

      {/* Show infor block */}
      <View style={styles.comicContainer}>
        <ComicInfor
          name={comic.name}
          view={comic.view}
          author={comic.author}
          description={comic.description}
          genres={["Genre 1"]}
        />

        <View style={styles.chapterContainer}>
          <ChapterHeader />

          <FlatList
            data={comic.chapters}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item, index }) => (
              <View style={styles.chapterItemContainer}>
                <Pressable
                  style={({ pressed }) => [
                    styles.chapterItem,
                    pressed ? styles.pressed : null,
                  ]}
                  android_ripple={{ color: "#8D8D8D" }}
                  onPress={() => handleNavigateToReadComicScreen()}
                >
                  <Text style={styles.chapterItemText}>
                    Chapter: {item.chapterNumber}
                  </Text>
                  <Text style={styles.chapterItemText}>
                    Title: {item.title}
                  </Text>
                </Pressable>
              </View>
            )}
            contentContainerStyle={styles.listComicsContainer}
          />
        </View>
      </View>
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
    top: Platform.OS === "ios" ? 50 : 20,
    padding: 8,
    zIndex: 100,
  },
  comicThumpnail: {
    width: "100%",
    height: 250,
    objectFit: "fill",
    opacity: 0.6,
    backgroundColor: "black",
  },
  comicContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.lightgrey,
    flex: 1,
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
  chapterItemContainer: {
    marginVertical: 6,
    borderRadius: 10,
    overflow: "hidden",
  },
  chapterItem: {
    backgroundColor: "#707070",
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  chapterItemText: {
    color: colors.white,
    fontWeight: "600",
  },
});
