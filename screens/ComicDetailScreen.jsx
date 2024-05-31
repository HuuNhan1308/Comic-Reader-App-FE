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
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";

import colors from "../variables/colors/colors";
import {
  getComicChaptersById,
  getComicInformation,
  rateComic,
} from "../services/ComicServices";
import ChapterHeader from "../components/Comics/ChapterHeader";
import ComicInfor from "../components/Comics/ComicInfor";
import { FILTER_CHAPTER } from "../variables/filters/filter_chapter";
import { UserContext } from "../store/UserContext";
import { bookmarkComic, getMyBookmakrs } from "../services/BookmarkServices";
import { AuthContext } from "../store/AuthContext";
import { SET_BOOKMARKS } from "../store/UserReducer/constants";

/**
 * Represents the screen that displays the details of a comic.
 *
 * @component
 * @param {object} route - The route object containing the parameters passed to the screen.
 * @param {object} navigation - The navigation object used for navigating between screens.
 * @returns {JSX.Element} The JSX element representing the ComicDetailScreen.
 */
const ComicDetailScreen = ({ route, navigation }) => {
  const { comicId } = route.params;

  const [filterChapter, setFilterChapter] = useState(FILTER_CHAPTER.OLDEST);
  const [isLoading, setIsLoading] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [comic, setComic] = useState({
    id: 0,
    name: "",
    author: "",
    description: "",
    thumbnailUrl: "",
    view: 0,
    lastestChapter: 0,
    averageRatingScore: 0,
    userRatingScore: null ?? 0,
    genres: [],
    chapters: [],
    deleted: false,
    finished: false,
  });

  const { userState, userDispatch } = useContext(UserContext);
  const authCtx = useContext(AuthContext);

  /**
   * This useEffect hook is used to fetch the chapters of the comic when the component mounts.
   *
   * It defines an asynchronous function fetchChapters that fetches the chapters of the comic with the given comic ID.
   * It sets the loading state to true before fetching the chapters, and to false after the chapters have been fetched.
   * It sets the chapters state to the result of the fetch.
   *
   * It then calls the fetchChapters function with the comic ID.
   *
   * This hook has an empty dependency array, so it only runs once when the component mounts.
   */
  useEffect(() => {
    async function fetchComicChapters(comicId) {
      try {
        setIsLoading(true);

        const chaptersResponse = await getComicChaptersById(comicId);
        const comicResponse = await getComicInformation(
          comicId,
          authCtx.isAuthenticated && authCtx.token
        );

        setComic({
          ...comicResponse.result,
          chapters: chaptersResponse.result,
        });
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    }

    fetchComicChapters(comicId);
    setIsBookmarked(
      userState.bookmarks.some((bookmark) => bookmark.comicId === comicId)
    );
  }, []);

  /**
   * This useEffect hook is used to fetch the chapters of the comic when the component mounts.
   *
   * It defines an asynchronous function fetchChapters that fetches the chapters of the comic with the given comic ID.
   * It sets the loading state to true before fetching the chapters, and to false after the chapters have been fetched.
   * It sets the chapters state to the result of the fetch.
   *
   * It then calls the fetchChapters function with the comic ID.
   *
   * This hook has an empty dependency array, so it only runs once when the component mounts.
   */
  function handleGoBack() {
    navigation.goBack();
  }

  /**
   * This useEffect hook is used to fetch the chapters of the comic when the component mounts.
   *
   * It defines an asynchronous function fetchChapters that fetches the chapters of the comic with the given comic ID.
   * It sets the loading state to true before fetching the chapters, and to false after the chapters have been fetched.
   * It sets the chapters state to the result of the fetch.
   *
   * It then calls the fetchChapters function with the comic ID.
   *
   * This hook has an empty dependency array, so it only runs once when the component mounts.
   */
  function handleNavigateToReadComicScreen(chapterId) {
    navigation.navigate("ReadComic", {
      chapterId,
      comicId: comicId,
    });
  }

  /**
   * Filters the chapters based on the given filter type.
   *
   * @param {string} filterType - The type of filter to apply.
   *
   * This function is typically used to filter the chapters when a filter type is selected.
   * It checks the filter type and sorts the comic's chapters state accordingly.
   * If the filter type is "newest", it sorts the chapters in descending order of chapter number.
   * If the filter type is "oldest", it sorts the chapters in ascending order of chapter number.
   * It also sets the filterChapter state to the selected filter type.
   */
  function handleFilterChapter(filterType) {
    if (filterType === FILTER_CHAPTER.NEWEST) {
      setFilterChapter(FILTER_CHAPTER.NEWEST);
      setComic((prev) => {
        return {
          ...prev,
          chapters: prev.chapters.sort(
            (a, b) => b.chapterNumber - a.chapterNumber
          ),
        };
      });
    } else if (filterType === FILTER_CHAPTER.OLDEST) {
      setFilterChapter(FILTER_CHAPTER.OLDEST);
      setComic((prev) => {
        return {
          ...prev,
          chapters: prev.chapters.sort(
            (a, b) => a.chapterNumber - b.chapterNumber
          ),
        };
      });
    }
  }

  /**
   * Sets the rating points for the comic.
   *
   * @param {number} score - The score to set.
   *
   * This function is typically used to set the rating points for the comic when the user rates the comic.
   * It first checks if the user is authenticated. If the user is not authenticated, it shows an alert and returns early.
   * If the user is authenticated, it shows an alert asking the user to confirm their rating.
   * If the user confirms, it calls the `rateComic` API with the comic ID, the score, and the user's token.
   * It then sets the userRatingScore of the comic state to the score.
   */
  function handleSetRatingPoints(score) {
    async function handleSendRating() {
      try {
        await rateComic(comicId, score, authCtx.token);
        setComic({ ...comic, userRatingScore: score });
      } catch (e) {
        console.log("Error at rating score: ", e);
      }
    }

    function handleNavigateToLogin() {
      navigation.navigate("Login");
    }

    if (!authCtx.isAuthenticated) {
      Alert.alert("Failed", "You need to login to rate this comic", [
        { text: "Login", onPress: handleNavigateToLogin },
        { text: "Cancel", style: "cancel" },
      ]);
      return;
    }

    Alert.alert(
      "Rating",
      `Do you want to rate this comic with ${score} stars ?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: handleSendRating,
        },
      ]
    );
  }

  /**
   * Toggles the bookmark status of the comic.
   *
   * This function is asynchronous. It first checks if the user is authenticated. If the user is not authenticated, it shows an alert and returns early.
   * If the user is authenticated, it toggles the isBookmarked state and calls the `bookmarkComic` API with the comic ID and the user's token.
   * It then fetches the user's bookmarks and dispatches an action to the user context to update the user's bookmarks.
   */
  async function handleToggleBookmark() {
    try {
      if (userState.id === null) {
        Alert.alert("Failed", "You need to login to bookmark this comic");
        return;
      }

      setIsBookmarked(!isBookmarked);
      await bookmarkComic(comicId, authCtx.token);
      const myBookmarksResponse = await getMyBookmakrs(authCtx.token);
      userDispatch({
        type: SET_BOOKMARKS,
        payload: myBookmarksResponse.result,
      });
    } catch (e) {
      console.log("handle toggle bookmark error: ", e);
    }
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
          genres={comic.genres}
          isBookmarked={isBookmarked}
          averageRatingScore={comic.averageRatingScore}
          onPressIcon={handleToggleBookmark}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <AntDesign
              key={index}
              name={index < comic.userRatingScore ? "star" : "staro"}
              size={26}
              style={{ color: "yellow", padding: 6 }}
              color="yellow"
              onPress={() => handleSetRatingPoints(index + 1)}
            />
          ))}
        </View>

        <View style={styles.chapterContainer}>
          <ChapterHeader
            tilte={"Chapters"}
            buttons={[FILTER_CHAPTER.NEWEST, FILTER_CHAPTER.OLDEST]}
            activeButton={filterChapter}
            onPressButton={(filterType) => handleFilterChapter(filterType)}
          />

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
                  onPress={() => {
                    handleNavigateToReadComicScreen(item.id);
                  }}
                >
                  <Text style={styles.chapterItemText} numberOfLines={1}>
                    Chapter {item.chapterNumber}: {item.title}
                  </Text>
                </Pressable>
              </View>
            )}
            contentContainerStyle={{ paddingBottom: 30 }}
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
    backgroundColor: Platform.OS === "android" ? "#53535396" : undefined,
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
    fontSize: 16,
    paddingVertical: 4,
  },
});
