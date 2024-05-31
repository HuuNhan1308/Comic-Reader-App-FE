import {
  StyleSheet,
  View,
  ScrollView,
  Pressable,
  FlatList,
  Platform,
  ActivityIndicator,
  Alert,
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
import { getComicsByGenres } from "../services/FilterServices";

/**
 * Represents the screen that displays a list of comics.
 *
 * @component
 * @param {object} navigation - The navigation object provided by React Navigation.
 * @param {object} route - The route object provided by React Navigation.
 * @returns {JSX.Element} - The JSX element representing the ComicsScreen.
 */
const ComicsScreen = ({ navigation, route }) => {
  const [activeFilter, setActiveFilter] = useState(FILTER_PROGRESS.ALL);
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 300);
  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * Navigates to the ChatBot screen.
   */
  function handleNavigateToChatScreen() {
    navigation.navigate("ChatBot");
  }

  /**
   * Navigates to the "Filter" screen.
   */
  function handleNavigateToFilter() {
    navigation.navigate("Filter");
  }

  /**
   * Navigates to the ComicDetail screen with the specified comicId.
   *
   * @param {number} comicId - The ID of the comic to navigate to.
   */
  function handleNavigateToComicDetail(comicId) {
    navigation.navigate("ComicDetail", { comicId });
  }

  /**
   * Sets the active filter.
   *
   * @param {string} filter - The filter to set as active.
   */
  function handleSetActiveFilter(filter) {
    setActiveFilter(filter);
  }

  /**
   * Filters the comics based on the active filter.
   *
   * @param {Array} comics - The array of comics to filter.
   * @param {string} activeFilter - The active filter value.
   * @returns {Array} - The filtered array of comics.
   */
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
    /**
     * Fetches comics based on the provided parameters.
     * If activeGenres is available, it calls the API to filter comics by genres.
     * If debouncedValue is provided, it calls the API to search comics by the debounced value.
     * If neither activeGenres nor debouncedValue is available, it calls the API to get all comics.
     */
    async function fetchComics() {
      try {
        setIsLoading(true);
        let comicsResponse;

        if (route.params?.activeGenres) {
          // genres filter available --> call api filter comics
          comicsResponse = await getComicsByGenres(route.params.activeGenres);
        } else if (debouncedValue.trim()) {
          // call api search by debounced value
          comicsResponse = await searchComics(debouncedValue);
          if (comicsResponse.code === 4002 || comicsResponse.code === 4004) {
            setErrorMessage(comicsResponse.message);
            setComics([]);
            return;
          }
        } else {
          // call api get all comics if search value empty
          comicsResponse = await getAllComics();
        }

        setComics(comicsResponse.result);
        setErrorMessage("");
      } catch (e) {
        console.log(e);
        Alert.alert("Error", "Unexpected error");
      } finally {
        setIsLoading(false);
      }
    }

    fetchComics();
  }, [debouncedValue, route.params?.activeGenres]);

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
        <Header
          title={route.params?.activeGenres ? "Filtered Comics" : "New Comics"}
          textButton={route.params?.activeGenres ? "Refresh" : ""}
          onPress={() => {
            // Clear the activeGenres parameter
            navigation.setParams({ activeGenres: null });
          }}
        />

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
