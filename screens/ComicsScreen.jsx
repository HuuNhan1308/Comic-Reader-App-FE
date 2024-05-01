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
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import InputField from "../components/Profile/InputField";
import colors from "../variables/colors/colors";
import { Feather } from "@expo/vector-icons";
import OutlineButton from "../components/ui/OutlineButton";
import Header from "../components/Home/Header";
import { getAllComics } from "../services/ComicServices";
import RowComic from "../components/Home/RowComic";
import { FILTER_PROGRESS } from "../variables/filters/filter_progress";
import useDebounce from "../hooks/useDebounce";

const ComicsScreen = () => {
  const [activeFilter, setActiveFilter] = useState(FILTER_PROGRESS.ALL);
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 300);
  const [searchComics, setSearchComics] = useState([]);
  const [showComics, setShowComics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSetActiveFilter(filter) {
    setActiveFilter(filter);

    if (filter === FILTER_PROGRESS.ALL) {
      setShowComics(searchComics);
    } else if (filter === FILTER_PROGRESS.COMPLETE) {
      setShowComics(searchComics.filter((comic) => comic.finished));
    } else if (filter === FILTER_PROGRESS.IN_PROGRESS) {
      setShowComics(searchComics.filter((comic) => !comic.finished));
    }
  }

  useEffect(() => {
    async function fetchAllComics() {
      try {
        setIsLoading(true);
        let comicsResponse;

        if (!debouncedValue.trim()) {
          comicsResponse = await getAllComics();
          console.log(comicsResponse);
          setSearchComics(comicsResponse.result);
          setShowComics(comicsResponse.result);
        } else {
          // call api search by debounced value
          console.log("fetch api search comic and set to searchComics");
          comicsResponse = await getAllComics();
          setSearchComics(comicsResponse.result);
          setShowComics(comicsResponse.result);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAllComics();
  }, [debouncedValue]); // Wrap debouncedValue in an array

  if (isLoading) {
    return (
      <ActivityIndicator
        size="large"
        color={colors.darkgrey}
        style={styles.root}
      />
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "height" : "position"}
        style={{ flex: 1, paddingHorizontal: 30 }}
      >
        {/* Search */}
        <View style={styles.searchContainer}>
          <InputField
            value={searchValue}
            onChangeText={(e) => setSearchValue(e)}
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
            onPress={handleSetActiveFilter}
            icon={
              <Feather
                name="list"
                size={20}
                color="black"
                style={styles.filterProgressIcon}
              />
            }
            value={FILTER_PROGRESS.ALL}
            textStyle={styles.filterProgressText}
            isActive={activeFilter === FILTER_PROGRESS.ALL}
          />

          <OutlineButton
            title={"Completed"}
            onPress={handleSetActiveFilter}
            isActive={activeFilter === FILTER_PROGRESS.COMPLETE}
            value={FILTER_PROGRESS.COMPLETE}
          />

          <OutlineButton
            title={"In progress"}
            onPress={handleSetActiveFilter}
            value={FILTER_PROGRESS.IN_PROGRESS}
            isActive={activeFilter === FILTER_PROGRESS.IN_PROGRESS}
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
          {showComics.length > 0 ? (
            <FlatList
              data={showComics}
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
          ) : (
            <Text style={{ flex: 1, alignSelf: "center" }}>
              No comics found
            </Text>
          )}
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default ComicsScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
  },
  searchContainer: {
    flexDirection: "row",
    marginTop: Platform.OS === "android" ? 40 : 60,
  },
  searchInputRoot: { flex: 1, paddingHorizontal: 0, marginRight: 8 },
  searchInput: {
    backgroundColor: colors.grey100,
    borderRadius: 8,
    borderWidth: 0,
    color: colors.darkgrey,
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
  comicsContainer: { marginTop: 20, paddingBottom: 40 },
});
