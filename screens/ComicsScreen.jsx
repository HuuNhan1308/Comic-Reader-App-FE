import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
  Pressable,
  FlatList,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import InputField from "../components/Profile/InputField";
import colors from "../variables/colors/colors";
import { Feather } from "@expo/vector-icons";
import OutlineButton from "../components/ui/OutlineButton";
import Header from "../components/Home/Header";
import { getAllComics } from "../services/ComicServices";
import RowComic from "../components/Home/RowComic";

const ComicsScreen = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchComics, setSearchComics] = useState([]);

  useEffect(() => {
    async function fetchAllComics(query) {
      try {
        const comicsResponse = await getAllComics();
        setSearchComics(comicsResponse.result);
      } catch (e) {
        console.log(e);
      }
    }

    fetchAllComics();
  }, []);

  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView behavior="position">
        <SafeAreaView style={styles.container}>
          {/* Search */}
          <View style={styles.searchContainer}>
            <InputField
              value={searchValue}
              onChangeText={(e) => console.log(e)}
              placeholder="Search here..."
              icon={"search"}
              rootStyle={styles.searchInputRoot}
              inputStyle={styles.searchInput}
              iconStyle={{ color: "#0f090b" }}
            />

            <Pressable
              onPress={() => {
                console.log("Navigate to filter screen");
              }}
              style={({ pressed }) => [
                styles.settingIcon,
                pressed ? styles.pressed : null,
              ]}
            >
              <Feather name="settings" size={30} color="black" />
            </Pressable>
          </View>

          {/* Filter by progress */}
          <View style={styles.filterProgressContainer}>
            <OutlineButton
              title={"All"}
              onPress={() => {
                console.log("set filter");
              }}
              icon={
                <Feather
                  name="list"
                  size={20}
                  color="black"
                  style={styles.filterProgressIcon}
                />
              }
              textStyle={styles.filterProgressText}
            />

            <OutlineButton
              title={"Completed"}
              onPress={() => {
                console.log("set filter");
              }}
              isActive={true}
            />

            <OutlineButton
              title={"In progress"}
              onPress={() => {
                console.log("set filter");
              }}
            />
          </View>

          {/* Result of comics */}
          <View style={styles.comicsContainer}>
            <Header
              title={"New comics"}
              onPress={() => {
                console.log("see all");
              }}
            />

            {/* Render comic */}
            <FlatList
              data={searchComics}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => (
                <RowComic
                  imageSrc={{ uri: item.thumbnailUrl }}
                  comicName={item.name}
                  comicChapter={`Chapter ${item.lastestChapter.chapterNumber}`}
                  comicLastestUpdate={"1 day ago"}
                  onPress={() => console.log("presscomic")}
                />
              )}
              scrollEnabled={false}
              contentContainerStyle={styles.listComicsContainer}
            />
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default ComicsScreen;

const styles = StyleSheet.create({
  screen: { flex: 1, paddingHorizontal: Platform.OS === "ios" && 20 },
  container: {
    flex: 1,
    marginTop: 40,
    paddingHorizontal: 30,
  },
  searchContainer: { flexDirection: "row" },
  searchInputRoot: { flex: 1, paddingHorizontal: 0, marginRight: 8 },
  searchInput: {
    backgroundColor: colors.grey100,
    borderRadius: 8,
    borderWidth: 0,
  },
  settingIcon: {
    borderWidth: 2,
    padding: 3,
    borderColor: colors.grey100,
    borderRadius: 8,
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.5,
  },
  filterProgressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginHorizontal: -20,
  },
  filterProgressIcon: { position: "absolute", left: 10 },
  filterProgressText: { marginLeft: 12 },
  comicsContainer: { marginTop: 20 },
});
