import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
  FlatList,
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

  if (isLoading) {
    return <ActivityIndicator size="large" color="black" style={{ flex: 1 }} />;
  }

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.root}>
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
        <ComicInfor
          name={comic.name}
          view={comic.view}
          author={comic.author}
          description={comic.description}
          genres={["Genre 1"]}
        />

        {/* Comic chapters */}
        <View style={styles.chapterContainer}>
          {/* Map chapter and render */}
          <ChapterHeader />

          <FlatList
            data={comic.chapters}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <>
                <View style={styles.chapterItem}>
                  <Pressable>
                    <Text style={styles.chapterItemText}>
                      Chapter: {item.chapterNumber}
                    </Text>
                    <Text style={styles.chapterItemText}>
                      Title: {item.title}
                    </Text>
                  </Pressable>
                </View>

                <View style={styles.chapterItem}>
                  <Pressable>
                    <Text style={styles.chapterItemText}>
                      Chapter: {item.chapterNumber}
                    </Text>
                    <Text style={styles.chapterItemText}>
                      Title: {item.title}
                    </Text>
                  </Pressable>
                </View>

                <View style={styles.chapterItem}>
                  <Pressable>
                    <Text style={styles.chapterItemText}>
                      Chapter: {item.chapterNumber}
                    </Text>
                    <Text style={styles.chapterItemText}>
                      Title: {item.title}
                    </Text>
                  </Pressable>
                </View>

                <View style={styles.chapterItem}>
                  <Pressable>
                    <Text style={styles.chapterItemText}>
                      Chapter: {item.chapterNumber}
                    </Text>
                    <Text style={styles.chapterItemText}>
                      Title: {item.title}
                    </Text>
                  </Pressable>
                </View>
              </>
            )}
            scrollEnabled={false}
            contentContainerStyle={styles.listComicsContainer}
          />
        </View>
      </View>

      {/* Map comic chapters and render */}
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
  chapterItem: {
    backgroundColor: "#707070",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginVertical: 6,
  },
  chapterItemText: {
    color: colors.white,
    fontWeight: "600",
  },
});
