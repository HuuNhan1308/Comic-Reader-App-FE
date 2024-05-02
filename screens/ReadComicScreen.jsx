import {
  FlatList,
  Image,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Platform,
} from "react-native";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { getComicIMGs } from "../services/ComicServices";
import { AntDesign } from "@expo/vector-icons";
import colors from "../variables/colors/colors";

const ReadComicScreen = ({ route, navigation }) => {
  const { comicId, chapterNumber, chapterId, chapterTitle } = route.params;

  const [isLoading, setIsLoading] = useState(false);
  const [comicIMGs, setComicIMGs] = useState([]);

  function handleGoBack() {
    navigation.goBack();
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Chapter ${chapterNumber}: ${chapterTitle}`,
    });
    async function fetchComicChapterIMGs() {
      try {
        setIsLoading(true);
        const res = await getComicIMGs(chapterId);
        setComicIMGs(res.result);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    }

    fetchComicChapterIMGs();
  }, []);

  if (isLoading) {
    return <ActivityIndicator size="large" color="grey" style={{ flex: 1 }} />;
  }

  return (
    <View>
      {/* Header */}
      <AntDesign
        name="arrowleft"
        size={24}
        color="white"
        style={styles.backIcon}
        onPress={handleGoBack}
      />

      {/* Header */}
      <View style={{ backgroundColor: colors.darkgrey }}>
        <Text
          style={{
            fontSize: 20,
            textAlign: "center",
            color: colors.white,
            paddingTop: 30,
            paddingBottom: 15,
            paddingHorizontal: 60,
          }}
        >
          Chapter {chapterNumber}: {chapterTitle}
        </Text>
      </View>

      <FlatList
        data={comicIMGs}
        keyExtractor={(item, index) => index}
        renderItem={({ item, index }) => (
          <Image source={{ uri: item }} style={styles.comicIMG} />
        )}
      />

      {/*  */}
    </View>
  );
};

export default ReadComicScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  comicIMG: {
    height: 600,
    resizeMode: "contain",
  },
  backIcon: {
    position: "absolute",
    left: 14,
    top: Platform.OS === "ios" ? 50 : 25,
    padding: 8,
    zIndex: 100,
    backgroundColor: "#53535396",
    borderRadius: 100,
  },
});
