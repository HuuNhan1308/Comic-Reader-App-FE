import {
  ScrollView,
  StyleSheet,
  Image,
  View,
  FlatList,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Home/Header";
import SquareComic from "../components/Home/SquareComic";
import { getAllComics } from "../services/comicServices";
import RectangleCategory from "../components/Home/RectangleCategory";
import RowComic from "../components/Home/RowComic";

const HomeScreen = () => {
  const [comics, setComics] = useState([]);
  const [newComics, setNewComics] = useState([]);
  const [recommendedComics, setRecommendedComics] = useState([]);
  const [hotComics, setHotComics] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getAllComics();

      setComics(result.result);
      setNewComics(result.result.slice(0, 3));
      setRecommendedComics(result.result.slice(0, 6));
      setHotComics(result.result.slice(0, 8));
    };

    fetchApi();
  }, []);

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
          onPress={() => {
            console.log("see all");
          }}
        />

        {/* Render comic */}
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
              iconStyle={styles.comicBookmarkIcon}
              onPressIcon={() => console.log("pressicon")}
              onPressComic={() => console.log("presscomic")}
              title={item.name ? item.name : "fallback"}
              chapter={`Chapter ${item.id}`}
            />
          )}
          numColumns={3}
          scrollEnabled={false}
          contentContainerStyle={styles.listComicsContainer}
        />
      </View>

      {/* Recommended Comics block */}
      <View>
        <Header
          title={"Recommended"}
          textButton={"See all"}
          onPress={() => {
            console.log("see all");
          }}
        />

        {/* Render comic */}
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
              iconStyle={styles.comicBookmarkIcon}
              onPressIcon={() => console.log("pressicon")}
              onPressComic={() => console.log("presscomic")}
              title={item.name ? item.name : "fallbacks"}
              chapter={`Chapter ${item.id}`}
            />
          )}
          numColumns={3}
          scrollEnabled={false}
          contentContainerStyle={styles.listComicsContainer}
        />
      </View>

      {/* Category block */}
      <View>
        <Header
          title={"Categories"}
          textButton={"See all"}
          onPress={() => {
            console.log("see all");
          }}
        />

        {/* Categories */}
        <View style={styles.categoriesListContainer}>
          <RectangleCategory
            category={"Romance"}
            imageSrc={require("../assets/test1.jpg")}
            containerStyle={styles.categoryContainer}
          />
          <RectangleCategory
            category={"Romance"}
            imageSrc={require("../assets/test1.jpg")}
            containerStyle={styles.categoryContainer}
          />
          <RectangleCategory
            category={"Romance"}
            imageSrc={require("../assets/test1.jpg")}
            containerStyle={styles.categoryContainer}
          />
          <RectangleCategory
            category={"Romance"}
            imageSrc={require("../assets/test1.jpg")}
            containerStyle={styles.categoryContainer}
          />
        </View>
      </View>

      {/* Recommended Comics block */}
      <View>
        <Header
          title={"Hot ranking"}
          textButton={"See all"}
          onPress={() => {
            console.log("see all");
          }}
        />

        {/* Render Row comic */}
        <FlatList
          data={hotComics}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <RowComic
              imageSrc={{ uri: item.thumbnailUrl }}
              comicName={item.name}
              comicChapter={`Chapter ${item.id}`}
              comicLastestUpdate={"1 day ago"}
              onPress={() => console.log("presscomic")}
            />
          )}
          scrollEnabled={false}
          contentContainerStyle={styles.listComicsContainer}
        />
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
