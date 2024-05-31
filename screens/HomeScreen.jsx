import {
  ScrollView,
  StyleSheet,
  Image,
  View,
  FlatList,
  ActivityIndicator,
  Text,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Home/Header";
import SquareComic from "../components/Home/SquareComic";
import {
  get3MostViewComics,
  get6LastComics,
  getAllComics,
} from "../services/ComicServices";
import RectangleCategory from "../components/Home/RectangleCategory";
import RowComic from "../components/Home/RowComic";
import { UserContext } from "../store/UserContext";

/**
 * Represents the home screen of the Comic Reader app.
 *
 * @component
 * @param {object} navigation - The navigation object provided by React Navigation.
 * @returns {JSX.Element} The rendered home screen component.
 */
const HomeScreen = ({ navigation }) => {
  const [comics, setComics] = useState({
    isLoading: true,
    message: "",
    data: [],
  });
  const [newComics, setNewComics] = useState({
    isLoading: true,
    message: "",
    data: [],
  });
  const [recommendedComics, setRecommendedComics] = useState({
    isLoading: true,
    message: "",
    data: [],
  });
  const { userState } = useContext(UserContext);

  /**
   * Navigates to the ComicDetail screen with the given comic ID.
   *
   * @param {string} comicId - The ID of the comic to view.
   *
   * This function is typically used to navigate to the ComicDetail screen when a comic is selected.
   * It uses the navigate function from the navigation prop to navigate to the ComicDetail screen.
   * It passes the comic ID as a parameter to the ComicDetail screen.
   */
  function handleNavigateToComicDetail(comicId) {
    navigation.navigate("ComicDetail", { comicId });
  }

  /**
   * Navigates to the Comics screen.
   *
   * This function is typically used to navigate to the Comics screen when the view all comics button is pressed.
   * It uses the navigate function from the navigation prop to navigate to the Comics screen.
   */
  function handleNavigateToComics() {
    navigation.navigate("Comics");
  }

  /**
   * This useEffect hook is used to fetch the comics, recommended comics, and new comics when the component mounts or the user's bookmarks change.
   *
   * It defines an asynchronous function fetchData that fetches data from the server using the given fetch function, sets the data using the given set data function, and handles errors with the given error message.
   * It sets the loading state to true before fetching the data, and to false after the data has been fetched.
   * It sets the data state to the result of the fetch.
   * If an error occurs during the fetch, it sets the data state to an empty array, the loading state to false, and the message state to the error message.
   *
   * It then calls the fetchData function with the getAllComics function, the setComics function, and an error message.
   * It also calls the fetchData function with the get3MostViewComics function, the setRecommendedComics function, and an error message.
   * It also calls the fetchData function with the get6LastComics function, the setNewComics function, and an error message.
   *
   * This hook has a dependency array with the userState.bookmarks, so it runs whenever the user's bookmarks change.
   */
  useEffect(() => {
    const fetchData = async (fetchFunction, setData, errorMessage) => {
      try {
        const response = await fetchFunction();
        if (response && response.result) {
          setData((prev) => ({
            ...prev,
            data: response.result,
            isLoading: false,
          }));
        }
      } catch (e) {
        setData({
          data: [],
          isLoading: false,
          message: errorMessage,
        });
      }
    };

    fetchData(getAllComics, setComics, "Unexpected error when load all comics");
    fetchData(
      get3MostViewComics,
      setRecommendedComics,
      "Unexpected error when load recommended comics"
    );
    fetchData(
      get6LastComics,
      setNewComics,
      "Unexpected error when load new comics"
    );
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
        {!newComics.isLoading ? (
          newComics.data.length > 0 ? (
            <FlatList
              data={newComics.data}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <SquareComic
                  imageSrc={
                    item.thumbnailUrl
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
            <Text style={{ textAlign: "center", marginVertical: 10 }}>
              {newComics.message || "Comic not found"}
            </Text>
          )
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
        {!recommendedComics.isLoading ? (
          recommendedComics.data.length > 0 ? (
            <FlatList
              data={recommendedComics.data}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => (
                <SquareComic
                  imageSrc={
                    item.thumbnailUrl
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
            <Text style={{ textAlign: "center", marginVertical: 10 }}>
              {recommendedComics.message || "Comic not found"}
            </Text>
          )
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
        {!comics.isLoading ? (
          comics.data.length > 0 ? (
            <FlatList
              data={comics.data}
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
            <Text style={{ textAlign: "center", marginVertical: 10 }}>
              {comics.message || "Comic not found"}
            </Text>
          )
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
