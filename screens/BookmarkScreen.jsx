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
} from "react-native";
import React, { useState, useRef, useContext, useEffect } from "react";
import InputField from "../components/Profile/InputField";
import useDebounce from "../hooks/useDebounce";
import { Feather } from "@expo/vector-icons";
import colors from "../variables/colors/colors";
import ErrorMessage from "../components/ui/ErrorMessage";
import RowComic from "../components/Home/RowComic";
import { UserContext } from "../store/UserContext";
import { bookmarkComic } from "../services/BookmarkServices";
import { AuthContext } from "../store/AuthContext";
import { SET_BOOKMARKS } from "../store/UserReducer/constants";

const RowComicAnimated = ({
  item,
  handleNavigateToComicDetail,
  handleRemoveItem,
}) => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: () => {
      //remove bookmark
      if (Math.abs(pan.x._value) > 200) {
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

const BookmarkScreen = ({ navigation, route }) => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 500);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("You dont have any bookmark");
  const { userState, userDispatch } = useContext(UserContext);
  const [bookmarks, setBookmarks] = useState([...userState.bookmarks]);
  const authCtx = useContext(AuthContext);

  function handleNavigateToComicDetail(comicId) {
    navigation.navigate("ComicDetail", { comicId });
  }

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

  useEffect(() => {
    setBookmarks([...userState.bookmarks]);
  }, [userState.bookmarks]);

  //Search handle
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
