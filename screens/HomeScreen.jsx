import { ScrollView, StyleSheet, Image, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Home/Header";
import SquareComic from "../components/Home/SquareComic";
import { getAllComics } from "../services/comicServices";
import RectangleCategory from "../components/Home/RectangleCategory";

const DATA = [{ id: 1 }, { id: 2 }, { id: 3 }];
const RECOMMENED_DATA = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
];

const HomeScreen = () => {
  const [comics, setComics] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getAllComics();

      setComics(result.result);
    };

    fetchApi();
    console.log(comics);
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
          data={DATA}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <SquareComic
              imageSrc={
                comics.length > 0
                  ? {
                      uri: comics[3].thumbnailUrl + "?time=" + new Date(),
                    }
                  : require("../assets/book-icon.png")
              }
              containerStyle={styles.comicContainer}
              iconStyle={styles.comicBookmarkIcon}
              onPressIcon={() => console.log("pressicon")}
              onPressComic={() => console.log("presscomic")}
              title={comics[3].name}
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
          data={RECOMMENED_DATA}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <SquareComic
              imageSrc={
                comics.length > 0
                  ? { uri: comics[0].thumbnailUrl + "?time=" + new Date() }
                  : require("../assets/book-icon.png")
              }
              containerStyle={styles.comicContainer}
              iconStyle={styles.comicBookmarkIcon}
              onPressIcon={() => console.log("pressicon")}
              onPressComic={() => console.log("presscomic")}
              title={comics[0].name}
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
