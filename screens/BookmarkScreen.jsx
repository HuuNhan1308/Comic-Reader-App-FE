import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Animated,
  PanResponder,
  ActivityIndicator,
  FlatList,
  ScrollView,
  Platform,
  Dimensions,
} from "react-native";
import React, { useState, useRef, useContext, useEffect } from "react";
import InputField from "../components/Profile/InputField";
import useDebounce from "../hooks/useDebounce";
import colors from "../variables/colors/colors";
import ErrorMessage from "../components/ui/ErrorMessage";
import RowComic from "../components/Home/RowComic";
import { UserContext } from "../store/UserContext";
import { bookmarkComic } from "../services/BookmarkServices";
import { AuthContext } from "../store/AuthContext";
import { SET_BOOKMARKS } from "../store/UserReducer/constants";

// RESPONSIBILITY BY: HO HUU NHAN

/**
 * Animated row component for displaying a comic item in the bookmark screen.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.item - The comic item to display.
 * @param {Function} props.handleNavigateToComicDetail - The function to handle navigation to comic detail screen.
 * @param {Function} props.handleRemoveItem - The function to handle removing the comic item.
 * @returns {JSX.Element} The rendered component.
 */
const RowComicAnimated = ({
  item,
  handleNavigateToComicDetail,
  handleRemoveItem,
}) => {
  const pan = useRef(new Animated.ValueXY()).current;

  /**
   * PanResponder for handling touch gestures.
   *
   * @type {PanResponder}
   */
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: () => {
      //remove bookmark
      if (
        (Platform.OS === "android" &&
          Math.abs(pan.x._value) >= Dimensions.get("window").width / 2) ||
        (Platform.OS === "ios" && Math.abs(pan.x._value) >= 100)
      ) {
        // console.log("trigger");
        handleRemoveItem(item.comicId);
      }

      Animated.spring(pan, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: true,
      }).start();
    },
  });

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={{
        transform: [{ translateX: pan.x }],
      }}
    >
      <RowComic
        imageSrc={
          item.thumbnailUrl
            ? { uri: item.thumbnailUrl + "?time=" + new Date() }
            : require("../assets/book-icon.png")
        }
        comicName={item.name}
        comicChapter={`Chapter ${item.lastChapter?.chapterNumber}`}
        comicLastestUpdate={item.lastChapter?.createdAt}
        onPress={() => handleNavigateToComicDetail(item.comicId)}
      />
    </Animated.View>
  );
};

/**
 * Represents the screen that displays the bookmarks.
 *
 * @param {object} navigation - The navigation object provided by React Navigation.
 * @param {object} route - The route object provided by React Navigation.
 * @returns {JSX.Element} - The JSX element representing the BookmarkScreen component.
 */
const BookmarkScreen = ({ navigation, route }) => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 500);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("You dont have any bookmark");
  const { userState, userDispatch } = useContext(UserContext);
  const [bookmarks, setBookmarks] = useState([...userState.bookmarks]);
  const authCtx = useContext(AuthContext);

  /**
   * Navigates to the ComicDetail screen with the specified comicId.
   *
   * @param {string} comicId - The ID of the comic to navigate to.
   */
  function handleNavigateToComicDetail(comicId) {
    navigation.navigate("ComicDetail", { comicId });
  }

  /**
   * Handles the removal of an item from the list of bookmarks.
   *
   * @param {string} comicId - The ID of the comic to be removed.
   * @returns {Promise<void>} - A promise that resolves when the item is removed successfully.
   */
  async function handleRemoveItem(comicId) {
    //remove the item from the list
    try {
      userDispatch({
        type: SET_BOOKMARKS,
        payload: bookmarks.filter((bookmark) => bookmark.comicId !== comicId),
      });
      bookmarkComic(comicId, authCtx.token);
    } catch (e) {
      console.log("handle toggle bookmark error: ", e);
    }
  }

  /**
   * This useEffect hook is used to synchronize the local bookmarks state with the bookmarks in the user state.
   * It is triggered every time the bookmarks in the user state change.
   *
   * When the bookmarks in the user state change, it sets the local bookmarks state to the new bookmarks.
   * This is done by creating a new array that contains all the bookmarks from the user state.
   * This ensures that the local bookmarks state always reflects the current bookmarks in the user state.
   */
  useEffect(() => {
    setBookmarks([...userState.bookmarks]);
  }, [userState.bookmarks]);

  /**
   * This useEffect hook is used to filter the bookmarks based on the debounced search value.
   * It is triggered every time the debouncedValue changes.
   *
   * If the debouncedValue is an empty string, it sets the bookmarks state to the current bookmarks in the user state.
   * This is done to reset the bookmarks list when the search field is cleared.
   *
   * If the debouncedValue is not an empty string, it filters the bookmarks in the user state.
   * It includes only those bookmarks whose name includes the debouncedValue (case-insensitive).
   * The filtered list is then set to the bookmarks state.
   */
  useEffect(() => {
    if (debouncedValue === "") {
      setBookmarks([...userState.bookmarks]);
      return;
    }

    const filteredBookmarks = userState.bookmarks.filter((item) =>
      item.name.toLowerCase().includes(debouncedValue.toLowerCase())
    );
    setBookmarks(filteredBookmarks);
  }, [debouncedValue]);

  return (
    <ScrollView style={styles.root}>
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

        {/* FILTER */}
        {/* <Pressable
          onPress={handleNavigateToFilter}
          style={({ pressed }) => [
            styles.settingIcon,
            pressed ? styles.pressed : null,
          ]}
        >
          <Feather name="settings" size={30} color="black" />
        </Pressable> */}
      </View>

      {/* Render comic */}
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color={colors.darkgrey}
          style={styles.root}
        />
      ) : bookmarks.length > 0 ? (
        <FlatList
          data={bookmarks}
          keyExtractor={(item) => item.comicId}
          renderItem={({ item, index }) => (
            <RowComicAnimated
              item={item}
              handleNavigateToComicDetail={handleNavigateToComicDetail}
              handleRemoveItem={handleRemoveItem}
            />
          )}
          scrollEnabled={false}
          contentContainerStyle={{ marginVertical: 20 }}
        />
      ) : (
        <View style={{ marginTop: 30 }}>
          <ErrorMessage message={message} />
        </View>
      )}
    </ScrollView>
  );
};

export default BookmarkScreen;

const styles = StyleSheet.create({
  root: { paddingHorizontal: 20 },
  searchContainer: {
    flexDirection: "row",
    marginTop: 20,
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
});
