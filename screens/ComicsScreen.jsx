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
import React, { useEffect, useState } from "react";
import InputField from "../components/Profile/InputField";
import colors from "../variables/colors/colors";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import OutlineButton from "../components/ui/OutlineButton";
import Header from "../components/Home/Header";
import { getAllComics, searchComics } from "../services/ComicServices";
import RowComic from "../components/Home/RowComic";
import { FILTER_PROGRESS } from "../variables/filters/filter_progress";
import useDebounce from "../hooks/useDebounce";
import ErrorMessage from "../components/ui/ErrorMessage";

const ComicsScreen = ({ navigation, route }) => {
  const [activeFilter, setActiveFilter] = useState(FILTER_PROGRESS.ALL);
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 300);
  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function handleNavigateToChatScreen() {
    navigation.navigate("ChatGPT");
  }

  function handleNavigateToFilter() {
    navigation.navigate("Filter");
  }

  function handleNavigateToComicDetail(comicId) {
    navigation.navigate("ComicDetail", { comicId });
  }

  function handleSetActiveFilter(filter) {
    setActiveFilter(filter);
  }

  const filteredComics = comics.filter((comic) => {
    if (activeFilter === FILTER_PROGRESS.ALL) {
      return true;
    } else if (activeFilter === FILTER_PROGRESS.COMPLETE) {
      return comic.finished;
    } else if (activeFilter === FILTER_PROGRESS.IN_PROGRESS) {
      return !comic.finished;
    }
  });

  useEffect(() => {
    async function fetchAllComics() {
      try {
        setIsLoading(true);
        let comicsResponse;

        if (!debouncedValue.trim()) {
          comicsResponse = await getAllComics();
          setComics(comicsResponse.result);
        } else {
          // call api search by debounced value
          comicsResponse = await searchComics(debouncedValue);
          if (comicsResponse.code === 4002) {
            setErrorMessage(comicsResponse.message);
            setComics([]);
            return;
          }

          if (comicsResponse.code === 4004) {
            setErrorMessage(comicsResponse.message);
            setComics([]);
            return;
          }

          setComics(comicsResponse.result);
          setErrorMessage("");
        }
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAllComics();
  }, [debouncedValue]);

  useEffect(() => {
    if (filteredComics.length === 0 && !errorMessage) {
      setErrorMessage("Comic not found");
    }
  }, [filteredComics, errorMessage]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 20 }}
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
          onPress={handleNavigateToFilter}
          style={({ pressed }) => [
            styles.settingIcon,
            pressed ? styles.pressed : null,
          ]}
        >
          <Feather name="settings" size={30} color="black" />
        </Pressable>

        <Pressable
          onPress={handleNavigateToChatScreen}
          style={({ pressed }) => [
            styles.settingIcon,
            { marginLeft: 4 },
            pressed ? styles.pressed : null,
          ]}
        >
          <AntDesign name="wechat" size={30} color="#4A6358" />
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
        <Header title={"New comics"} />

        {/* Render comic */}
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color={colors.darkgrey}
            style={styles.root}
          />
        ) : filteredComics.length > 0 ? (
          <FlatList
            data={filteredComics}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <RowComic
                imageSrc={
                  item.thumbnailUrl
                    ? { uri: item.thumbnailUrl }
                    : require("../assets/book-icon.png")
                }
                comicName={item.name}
                comicChapter={`Chapter ${
                  item.lastChapter?.chapterNumber || "N/A"
                }`}
                comicLastestUpdate={item.lastChapter?.createdAt || "N/A"}
                genres={item.genres}
                onPress={() => handleNavigateToComicDetail(item.id)}
              />
            )}
            scrollEnabled={false}
            contentContainerStyle={styles.listComicsContainer}
          />
        ) : (
          <ErrorMessage message={errorMessage} />
        )}
      </View>
    </ScrollView>
  );
};

export default ComicsScreen;

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    marginTop: 100,
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
