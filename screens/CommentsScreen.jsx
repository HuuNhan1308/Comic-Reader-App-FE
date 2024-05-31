import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Button,
  TextInput,
  Pressable,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import colors from "../variables/colors/colors";
import {
  getChapterComments,
  postChapterComment,
} from "../services/ChapterServices";
import { AuthContext } from "../store/AuthContext";
import Comment from "../components/Comments/Comment";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { UserContext } from "../store/UserContext";
import { formatDate } from "../utils/DateUtil";

// RESPONSIBILITY BY: HO HUU NHAN

/**
 * Represents the screen component for displaying and posting comments.
 *
 * @component
 * @param {object} route - The route object containing the parameters passed to the screen.
 * @returns {JSX.Element} The CommentsScreen component.
 */
const CommentsScreen = ({ route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [commentInputValue, setCommentInputValue] = useState("");
  const [comments, setComments] = useState([]);
  const authCtx = useContext(AuthContext);
  const { userState } = useContext(UserContext);
  const { chapterId } = route.params;

  /**
   * This useEffect hook is used to fetch the comments of the chapter when the component mounts.
   *
   * It defines an asynchronous function fetchChapterComments that fetches the comments of the chapter with the given chapter ID.
   * It sets the loading state to true before fetching the comments, and to false after the comments have been fetched.
   * It sets the comments state to the result of the fetch.
   *
   * It then calls the fetchChapterComments function.
   *
   * This hook has an empty dependency array, so it only runs once when the component mounts.
   */
  useEffect(() => {
    async function fetchChapterComments() {
      try {
        setIsLoading(true);
        const chapterCommentsResponse = await getChapterComments(
          chapterId,
          authCtx.token
        );
        setComments(chapterCommentsResponse.result);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    }

    fetchChapterComments();
  }, []);

  /**
   * Handles the change of the comment input value.
   *
   * @param {string} text - The text entered by the user.
   *
   * This function is typically used to update the commentInputValue state when the user types in the comment input field.
   */
  function handleChangeCommentInputValue(text) {
    setCommentInputValue(text);
  }

  /**
   * Handles the posting of a comment.
   *
   * This function is asynchronous. It first checks if the commentInputValue state is empty, and returns early if it is.
   * It then sets the loading state to true and calls the `postChapterComment` API with the chapter ID, the comment input value, and the user's token.
   *
   * It then updates the comments state with the new comment.
   * The new comment includes the user's full name, the comment input value, and the current date.
   * If the comments state is not null and has a length greater than 0, it adds the new comment to the beginning of the comments array.
   * Otherwise, it sets the comments state to an array with the new comment.
   *
   * It then resets the commentInputValue state to an empty string.
   *
   * If the response code from the API is 4002, it shows an alert with the response message.
   *
   * If an error occurs during the process, it logs the error.
   *
   * Regardless of the outcome, it finally sets the loading state to false.
   */
  async function handlePostComment() {
    if (commentInputValue.trim() === "") return;

    try {
      setIsLoading(true);
      const postCommentResponse = await postChapterComment(
        chapterId,
        commentInputValue,
        authCtx.token
      );

      setComments((prev) => {
        const newComment = {
          fullName: userState.fullName,
          content: commentInputValue,
          createdAt: formatDate(new Date()),
        };

        return prev && prev.length > 0 ? [newComment, ...prev] : [newComment];
      });
      setCommentInputValue("");

      if (postCommentResponse.code === 4002) {
        Alert.alert("Error", postCommentResponse.message);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View
      style={{
        backgroundColor: colors.darkgrey,
        paddingHorizontal: 16,
        flex: 1,
      }}
    >
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="grey"
          style={{ flex: 1, justifyContent: "center" }}
        />
      ) : (
        <>
          <FlatList
            data={comments}
            keyExtractor={(item, index) => index}
            renderItem={({ item, index }) => (
              <Comment
                comment={item.content}
                owner={item.fullName}
                createAt={item.createdAt}
              />
            )}
            showsVerticalScrollIndicator={false}
            scrollEnabled={true}
            style={{ flex: 1 }}
          />

          <KeyboardAvoidingView
            behavior="position"
            contentContainerStyle={styles.inputContainer}
            keyboardVerticalOffset={100}
          >
            <TextInput
              placeholder="Your comment"
              placeholderTextColor={colors.white}
              style={styles.input}
              value={commentInputValue}
              onChangeText={handleChangeCommentInputValue}
            />
            <Pressable
              style={({ pressed }) => [pressed ? styles.pressed : null]}
              onPress={handlePostComment}
            >
              <MaterialCommunityIcons
                name="send"
                size={30}
                color="black"
                style={styles.inputIcon}
              />
            </Pressable>
          </KeyboardAvoidingView>
        </>
      )}
    </View>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: -4,
    paddingBottom: Platform.OS === "android" ? 10 : 30,
    paddingTop: 10,
    backgroundColor: colors.darkgrey,
  },
  input: {
    backgroundColor: "#525252",
    color: colors.white,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: Platform.OS === "android" ? 6 : 16,
    paddingHorizontal: 10,
    flex: 1,
  },
  inputIcon: { padding: 4, color: "#525252" },
  pressed: {
    opacity: 0.8,
  },
});
