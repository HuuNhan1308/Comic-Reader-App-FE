import {
  ScrollView,
  StyleSheet,
  Image,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Home/Header";
import SquareComic from "../components/Home/SquareComic";
import { getAllComics } from "../services/ComicServices";
import RectangleCategory from "../components/Home/RectangleCategory";
import RowComic from "../components/Home/RowComic";
import { UserContext } from "../store/UserContext";

const HomeScreen = ({ navigation, route }) => {
  const [comics, setComics] = useState([]);
  const [newComics, setNewComics] = useState([]);
  const [recommendedComics, setRecommendedComics] = useState([]);
  const [hotComics, setHotComics] = useState([]);
  const { userState } = useContext(UserContext);

  function handleNavigateToComicDetail(comicId) {
    navigation.navigate("ComicDetail", { comicId });
  }

  function handleNavigateToComics() {
    navigation.navigate("Comics");
  }

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getAllComics();

      setComics(result.result);
      setNewComics(result.result.slice(0, 3));
      setRecommendedComics(result.result.slice(0, 6));
      setHotComics(result.result.slice(0, 8));
    };

    fetchApi();
  }, [userState.bookmarks]);

  return (
    <ScrollView
      style={[styles.screen]}
      contentContainerStyle={[styles.rootContainer]}
    >
      {/* Top Image Header */}
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/book-icon.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* New Comics block */}
      <View>
        <Header
          title={"New comics"}
          textButton={"See all"}
          onPress={handleNavigateToComics}
        />

        {/* Render comic */}
        {newComics.length ? (
          <FlatList
            data={newComics}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <SquareComic
                imageSrc={
                  comics.length > 0
                    ? {
                        uri: item.thumbnailUrl + "?time=" + new Date(),
                      }
                    : require("../assets/book-icon.png")
                }
                containerStyle={styles.comicContainer}
                onPressIcon={() => console.log("pressicon")}
                onPressComic={() => handleNavigateToComicDetail(item.id)}
                title={item.name ? item.name : "fallback"}
                chapter={`Chapter ${item.lastChapter?.chapterNumber}`}
                isBookmarked={userState.bookmarks.some(
                  (bookmark) => bookmark.comicId === item.id
                )}
              />
            )}
            numColumns={3}
            scrollEnabled={false}
            contentContainerStyle={styles.listComicsContainer}
          />
        ) : (
          <ActivityIndicator size="large" color="grey" />
        )}
      </View>

      {/* Recommended Comics block */}
      <View>
        <Header
          title={"Recommended"}
          textButton={"See all"}
          onPress={handleNavigateToComics}
        />

        {/* Render comic */}
        {recommendedComics.length ? (
          <FlatList
            data={recommendedComics}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <SquareComic
                imageSrc={
                  comics.length > 0
                    ? { uri: item.thumbnailUrl + "?time=" + new Date() }
                    : require("../assets/book-icon.png")
                }
                containerStyle={styles.comicContainer}
                onPressIcon={() => console.log("pressicon")}
                onPressComic={() => handleNavigateToComicDetail(item.id)}
                title={item.name ? item.name : "fallbacks"}
                chapter={`Chapter ${item.lastChapter?.chapterNumber}`}
                isBookmarked={userState.bookmarks.some(
                  (bookmark) => bookmark.comicId === item.id
                )}
              />
            )}
            numColumns={3}
            scrollEnabled={false}
            contentContainerStyle={styles.listComicsContainer}
          />
        ) : (
          <ActivityIndicator size="large" color="grey" />
        )}
      </View>

      {/* Category block */}
      <View>
        <Header
          title={"Categories"}
          textButton={"See all"}
          onPress={handleNavigateToComics}
        />

        {/* Categories */}
        <View style={styles.categoriesListContainer}>
          <RectangleCategory
            category={"Action"}
            imageSrc={require("../assets/RectangleCategory-4.jpg")}
            containerStyle={styles.categoryContainer}
            linearColors={[
              "rgba(0,212,255,0.8)",
              "rgba(9,121,108,0.7)",
              "rgba(255,255,255,0)",
            ]}
            onPress={() => navigation.navigate("Comics", { activeGenres: [1] })}
          />
          <RectangleCategory
            category={"Adventure"}
            imageSrc={require("../assets/RectangleCategory-1.jpg")}
            containerStyle={styles.categoryContainer}
            linearColors={[
              "rgba(255,0,0,0.6)",
              "rgba(148,57,175,0.7)",
              "rgba(255,255,255,0)",
            ]}
            onPress={() => navigation.navigate("Comics", { activeGenres: [2] })}
          />
          <RectangleCategory
            category={"Comedy"}
            imageSrc={require("../assets/RectangleCategory-3.jpg")}
            containerStyle={styles.categoryContainer}
            linearColors={[
              "rgba(0,255,46,0.7)",
              "rgba(57,175,128,0.7)",
              "rgba(255,255,255,0)",
            ]}
            onPress={() => navigation.navigate("Comics", { activeGenres: [3] })}
          />
          <RectangleCategory
            category={"Drama"}
            imageSrc={require("../assets/RectangleCategory-2.jpg")}
            containerStyle={styles.categoryContainer}
            linearColors={[
              "rgba(89,0,255,0.8)",
              "rgba(120,57,175,0.7)",
              "rgba(255,255,255,0)",
            ]}
            onPress={() => navigation.navigate("Comics", { activeGenres: [4] })}
          />
        </View>
      </View>

      {/* Recommended Comics block */}
      <View>
        <Header
          title={"Hot ranking"}
          textButton={"See all"}
          onPress={handleNavigateToComics}
        />

        {/* Render Row comic */}
        {comics.length >= 0 ? (
          <FlatList
            data={hotComics}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <RowComic
                imageSrc={{ uri: item.thumbnailUrl }}
                comicName={item.name}
                comicChapter={`Chapter ${item.lastChapter?.chapterNumber}`}
                genres={item.genres}
                comicLastestUpdate={
                  item.lastChapter ? item.lastChapter.createdAt : "N/A"
                }
                onPress={() => handleNavigateToComicDetail(item.id)}
              />
            )}
            scrollEnabled={false}
            contentContainerStyle={styles.listComicsContainer}
          />
        ) : (
          <ActivityIndicator size="large" color="grey" />
        )}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 20,
  },
  rootContainer: { paddingBottom: 100 },
  imageContainer: {
    alignItems: "baseline",
    justifyContent: "center",
    width: 80,
    height: 80,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  listComicsContainer: {
    marginHorizontal: -4,
  },
  comicContainer: {
    paddingHorizontal: 4,
    marginBottom: 10,
  },
  comicBookmarkIcon: {
    backgroundColor: "white",
    borderRadius: 10000,
  },
  categoriesListContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: -20,
  },
  categoryContainer: {
    paddingHorizontal: 20,
    marginBottom: 18,
  },
});
