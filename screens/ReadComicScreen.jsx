import {
  FlatList,
  Image,
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

const windowDimension = Dimensions.get("window");

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

  function handleGoBack() {
    navigation.goBack();
  }

  function handleShowChaptersList() {
    navigation.navigate("ChooseChapter", {
      comicId: comicId,
      chapterId: chapterId,
    });
  }

  function handleShowComments() {
    if (authCtx.token && authCtx.isAuthenticated)
      navigation.navigate("Comments", {
        chapterId: chapterId,
      });
    else Alert.alert("Opps...", "You need to login to see comments");
  }

  //get chatper list
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

  //get chapter images
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
