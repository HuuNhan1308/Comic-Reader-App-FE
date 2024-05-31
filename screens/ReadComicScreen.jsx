import {
  FlatList,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Platform,
  Alert,
  Dimensions,
} from "react-native";
import React, { useState, useLayoutEffect, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import { getComicChaptersById } from "../services/ComicServices";
import { getComicChapter } from "../services/ChapterServices";
import colors from "../variables/colors/colors";
import IconButton from "../components/ui/IconButton";
import ComicImage from "../components/ui/ComicImage";
import { AuthContext } from "../store/AuthContext";

// RESPONSIBILITY BY: HO HUU NHAN

const windowDimension = Dimensions.get("window");

/**
 * Represents the screen for reading a comic.
 *
 * @component
 * @param {object} route - The route object containing the parameters passed to the screen.
 * @param {object} navigation - The navigation object used for navigating between screens.
 * @returns {JSX.Element} The ReadComicScreen component.
 */
const ReadComicScreen = ({ route, navigation }) => {
  const { comicId, chapterId } = route.params;

  const [isLoading, setIsLoading] = useState(false);
  const [chapter, setChapter] = useState({
    title: "",
    chapterNumber: "",
    createdAt: "",
    imageUrls: [],
  });
  const [comicChapters, setComicChapters] = useState([]);
  const authCtx = useContext(AuthContext);

  /**
   * Handles the change of the chapter.
   *
   * @param {string} type - The type of change, either "prev" for the previous chapter or "next" for the next chapter.
   *
   * This function is typically used to change the chapter when the previous or next button is pressed.
   * It first finds the index of the current chapter in the comicChapters array.
   * It then sets the isLoading state to true.
   *
   * If the type is "prev", it gets the ID of the previous chapter and sets it as the chapterId parameter of the navigation if it exists.
   * If the type is "next", it gets the ID of the next chapter and sets it as the chapterId parameter of the navigation if it exists.
   *
   * If an error occurs during the process, it shows an alert with a message depending on the type.
   *
   * Regardless of the outcome, it finally sets the isLoading state to false.
   */
  function handleChangeChapter(type) {
    // get index of chapterId in the chapters array
    const chapterIndex = comicChapters.findIndex(
      (chapter) => chapter.id === chapterId
    );

    setIsLoading(true);
    try {
      switch (type) {
        case "prev":
          const prevChapterId = comicChapters[chapterIndex - 1].id;
          if (prevChapterId) {
            navigation.setParams({ chapterId: prevChapterId });
          }
          break;
        case "next":
          const nextChapterId = comicChapters[chapterIndex + 1].id;
          if (nextChapterId) {
            navigation.setParams({ chapterId: nextChapterId });
          }
          break;
        default:
          break;
      }
    } catch (e) {
      switch (type) {
        case "prev":
          Alert.alert("Opps...", "You are at the first chapter");
          break;
        case "next":
          Alert.alert("Opps...", "You are at the last chapter");
          break;
        default:
          console.log(e);
          break;
      }
    }

    setIsLoading(false);
  }

  /**
   * Navigates to the previous screen.
   *
   * This function is typically used to navigate to the previous screen when the go back button is pressed.
   * It uses the goBack function from the navigation prop to navigate to the previous screen.
   */
  function handleGoBack() {
    navigation.goBack();
  }

  /**
   * Navigates to the ChooseChapter screen.
   *
   * This function is typically used to navigate to the ChooseChapter screen when the show chapters list button is pressed.
   * It uses the navigate function from the navigation prop to navigate to the ChooseChapter screen.
   * It passes the comicId and chapterId as parameters to the ChooseChapter screen.
   */
  function handleShowChaptersList() {
    navigation.navigate("ChooseChapter", {
      comicId: comicId,
      chapterId: chapterId,
    });
  }

  /**
   * Navigates to the Comments screen or shows an alert if the user is not logged in.
   *
   * This function is typically used to navigate to the Comments screen when the show comments button is pressed.
   * If the user is logged in, it uses the navigate function from the navigation prop to navigate to the Comments screen.
   * It passes the chapterId as a parameter to the Comments screen.
   * If the user is not logged in, it shows an alert with a message.
   */
  function handleShowComments() {
    if (authCtx.token && authCtx.isAuthenticated)
      navigation.navigate("Comments", {
        chapterId: chapterId,
      });
    else Alert.alert("Opps...", "You need to login to see comments");
  }

  /**
   * This useLayoutEffect hook is used to fetch the comic chapters when the component mounts.
   *
   * It defines an asynchronous function fetchComicChapter that fetches the comic chapters from the server using the comicId and sets the comicChapters state to the result.
   * If an error occurs during the fetch, it logs the error.
   *
   * It then calls the fetchComicChapter function.
   *
   * This hook has an empty dependency array, so it only runs once when the component mounts.
   */
  useLayoutEffect(() => {
    async function fetchComicChapter() {
      try {
        const res = await getComicChaptersById(comicId);
        setComicChapters(res.result);
      } catch (e) {
        console.log(e);
      }
    }

    fetchComicChapter();
  }, []);

  /**
   * This useLayoutEffect hook is used to fetch the chapter images when the chapterId changes.
   *
   * It defines an asynchronous function fetchComicChapterIMGs that fetches the chapter images from the server using the chapterId and sets the chapter state to the result.
   * It sets the isLoading state to true before fetching the images, and to false after the images have been fetched.
   * If an error occurs during the fetch, it logs the error.
   *
   * It then calls the fetchComicChapterIMGs function.
   *
   * This hook has a dependency array with the chapterId, so it runs whenever the chapterId changes.
   */
  useLayoutEffect(() => {
    async function fetchComicChapterIMGs() {
      try {
        setIsLoading(true);
        const res = await getComicChapter(route.params?.chapterId);
        setChapter(res.result);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    }

    fetchComicChapterIMGs();
  }, [route.params?.chapterId]);

  return (
    <>
      <StatusBar hidden />
      <View style={{ flex: 1 }}>
        {/* Header */}
        <AntDesign
          name="arrowleft"
          size={24}
          color="white"
          style={styles.backIcon}
          onPress={handleGoBack}
        />

        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.header}>
            Chapter {chapter.chapterNumber}: {chapter.title}
          </Text>
        </View>

        {/* Read comic */}
        {isLoading ? (
          <ActivityIndicator size="large" color="grey" style={{ flex: 1 }} />
        ) : (
          <FlatList
            data={chapter.imageUrls}
            keyExtractor={(item, index) => index}
            renderItem={({ item, index }) => (
              <ComicImage uri={item} width={windowDimension.width} />
            )}
            contentContainerStyle={{
              paddingBottom: 100,
            }}
          />
        )}

        {/*  */}
        <View style={styles.bottomControllersBar}>
          <IconButton
            icon={
              <AntDesign
                name="leftcircleo"
                style={styles.bottomControllersIcon}
              />
            }
            onPress={() => handleChangeChapter("prev")}
          />

          <IconButton
            icon={<Entypo name="list" style={styles.bottomControllersIcon} />}
            onPress={handleShowChaptersList}
          />

          <IconButton
            icon={
              <FontAwesome
                name="commenting-o"
                style={styles.bottomControllersIcon}
              />
            }
            onPress={handleShowComments}
          />

          <IconButton
            icon={
              <AntDesign
                name="rightcircleo"
                style={styles.bottomControllersIcon}
              />
            }
            onPress={async () => handleChangeChapter("next")}
          />
        </View>
      </View>
    </>
  );
};

export default ReadComicScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  headerContainer: { backgroundColor: colors.darkgrey },
  header: {
    fontSize: 20,
    textAlign: "center",
    color: colors.white,
    paddingTop: Platform.OS === "android" ? 30 : 50,
    paddingBottom: Platform.OS === "android" ? 15 : 15,
    paddingHorizontal: 60,
  },
  backIcon: {
    position: "absolute",
    left: 14,
    top: Platform.OS === "ios" ? 50 : 25,
    padding: 8,
    zIndex: 100,
    backgroundColor: Platform.OS === "android" ? "#53535396" : undefined,
    borderRadius: 100,
  },
  bottomControllersBar: {
    backgroundColor: colors.darkgrey,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: Platform.OS === "android" ? 10 : 20,
    paddingBottom: Platform.OS === "android" ? 10 : 30,
    paddingHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: -20,
  },
  bottomControllersIcon: {
    color: colors.white,
    fontSize: 30,
    paddingHorizontal: 20,
  },
  pressed: {
    opacity: 0.8,
  },
});
