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

const CommentsScreen = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [commentInputValue, setCommentInputValue] = useState("");
  const [comments, setComments] = useState([]);
  const authCtx = useContext(AuthContext);
  const { userState } = useContext(UserContext);
  const { chapterId } = route.params;

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

  function handleChangeCommentInputValue(text) {
    setCommentInputValue(text);
  }

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
