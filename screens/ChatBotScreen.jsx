import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Platform,
  FlatList,
  Keyboard,
  ActivityIndicator,
  Button,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import React, { useContext, useEffect, useRef, useState } from "react";
import colors from "../variables/colors/colors";
import ChatBox from "../components/Comments/ChatBox";
import { UserContext } from "../store/UserContext";
import { AI_LM_Asking, gptFindComic } from "../services/ChatBotServices";
import { AuthContext } from "../store/AuthContext";

const COMIC_AI = "COMIC_AI";
const LM_AI = "LM_AI";

const AIs = [
  { name: "Comic AI", value: COMIC_AI },
  { name: "LM AI", value: LM_AI },
];

/**
 * Represents the chat box screen component.
 *
 * @component
 * @param {object} navigation - The navigation object provided by React Navigation.
 * @returns {JSX.Element} The chat box screen component.
 */
const ChatBoxScreen = ({ navigation }) => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [currentAI, setCurrentAI] = useState(AIs[0]);
  const [isLoading, setIsLoading] = useState(false);
  const { userState } = useContext(UserContext);
  const authCtx = useContext(AuthContext);
  const flatListRef = useRef(null);

  /**
   * Handles the change of the question input field.
   *
   * @param {string} e - The question entered by the user.
   *
   * This function is typically used to update the question state when the user types in the question input field.
   */
  function handleChangeQuestion(e) {
    setQuestion(e);
  }

  /**
   * Handles the change of the current AI.
   *
   * This function is typically used to update the currentAI state when the user wants to switch to the next AI.
   *
   * It first finds the index of the current AI in the AIs array.
   * Then, it calculates the index of the next AI by adding 1 to the current index and finding the remainder when divided by the length of the AIs array.
   * This ensures that the next index is always within the bounds of the AIs array, and wraps around to 0 when it reaches the end of the array.
   * Finally, it sets the currentAI state to the AI at the next index.
   */
  function handleChangeCurrentAI() {
    setCurrentAI((prevAI) => {
      const currentIndex = AIs.indexOf(prevAI);
      const nextIndex = (currentIndex + 1) % AIs.length;
      return AIs[nextIndex];
    });
  }

  /**
   * Handles the sending of a message.
   *
   * This function is asynchronous. It first checks if the question state is empty, and returns early if it is.
   * Then, it checks if the user is authenticated. If the user is not authenticated, it shows an alert and returns early.
   *
   * If the user is authenticated, it sets the loading state to true.
   * It then checks the value of the currentAI state.
   * If the current AI is the comic AI, it calls the `gptFindComic` API with the user's token and the question.
   * If the current AI is the LM AI, it calls the `AI_LM_Asking` API with the user's token and the question.
   *
   * It then checks the response from the API.
   * If the response is not null and the response code is not 200, it sets the message to a default error message.
   * Otherwise, it sets the message to the result from the API response.
   *
   * It then updates the messages state with the question and the message.
   * The sender of the question is the user's full name if it exists, or "Guest" if it does not.
   * The sender of the message is the name of the current AI.
   *
   * It then resets the question state to an empty string and dismisses the keyboard.
   *
   * If an error occurs during the process, it logs the error.
   *
   * Regardless of the outcome, it finally sets the loading state to false.
   */
  async function handleSendMessage() {
    if (question === "") return;
    //call api to get asnwer and assign to answer constant
    if (!authCtx.isAuthenticated) {
      Alert.alert(
        "Failed",
        "You must be authenticated before using this function"
      );
      return;
    }

    try {
      setIsLoading(true);
      let AIResponse;

      if (currentAI.value == COMIC_AI) {
        console.log("Ask comic AI");
        AIResponse = await gptFindComic(authCtx.token, question);
      } else if (currentAI.value == LM_AI) {
        console.log("Ask LM AI");
        AIResponse = await AI_LM_Asking(authCtx.token, question);
      }

      const message =
        AIResponse && AIResponse.code !== 200
          ? "Cannot answer now... please try again"
          : AIResponse.result;

      setMessages((prev) => [
        ...prev,
        { message: question, sender: userState.fullName || "Guest" },
        { message, sender: currentAI.name },
      ]);

      setQuestion("");
      Keyboard.dismiss();
    } catch (e) {
      console.log("Error: " + e);
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * This useEffect hook is used to add a listener for the "keyboardDidShow" event when the component mounts.
   *
   * When the keyboard is shown, it scrolls the FlatList referenced by flatListRef to the end.
   * This is typically used to keep the latest messages in view when the user is typing a message.
   *
   * The listener is removed when the component unmounts to prevent memory leaks.
   *
   * This hook has an empty dependency array, so it only runs once when the component mounts and once when it unmounts.
   */
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        if (flatListRef.current) {
          flatListRef.current.scrollToEnd({ animated: true });
        }
      }
    );

    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  /**
   * Handles the change of the current AI.
   *
   * This function is typically used to update the currentAI state when the user wants to switch to the next AI.
   *
   * It first finds the index of the current AI in the AIs array.
   * Then, it calculates the index of the next AI by adding 1 to the current index and finding the remainder when divided by the length of the AIs array.
   * This ensures that the next index is always within the bounds of the AIs array, and wraps around to 0 when it reaches the end of the array.
   * Finally, it sets the currentAI state to the AI at the next index.
   */
  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        Platform.OS === "android" ? (
          <Pressable
            onPress={handleChangeCurrentAI}
            android_ripple={{ color: colors.lightgrey }}
          >
            <Text
              style={{ fontSize: 16, color: colors.white, fontWeight: "700" }}
            >
              {currentAI.name}
            </Text>
          </Pressable>
        ) : (
          <Button
            style={{ fontSize: 16, color: colors.white, fontWeight: "700" }}
            onPress={handleChangeCurrentAI}
            title={currentAI.name}
          />
        ),
    });
  }, [navigation, currentAI]);

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 14,
        backgroundColor: colors.darkgrey,
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        // contentContainerStyle={styles.inputContainer}
        keyboardVerticalOffset={70}
      >
        <View style={{ flex: 1 }}>
          {messages.length > 0 ? (
            <FlatList
              ref={flatListRef}
              data={messages}
              keyExtractor={(item, index) => index}
              renderItem={({ item, index }) => (
                <ChatBox
                  owner={item.sender}
                  text={item.message}
                  isQuestion={
                    item.sender === userState.fullName ||
                    item.sender === "Guest"
                  }
                />
              )}
              showsVerticalScrollIndicator={false}
              scrollEnabled={!isLoading}
              style={{ flex: 1 }}
            />
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: colors.grey100,
                  fontSize: 20,
                  textAlign: "center",
                }}
              >
                Ask me something about comic, I can give you some suggestions...
              </Text>
            </View>
          )}

          {isLoading && <ActivityIndicator size="large" color="grey" />}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Your question"
            placeholderTextColor={colors.white}
            style={styles.input}
            value={question}
            onChangeText={handleChangeQuestion}
            editable={!isLoading}
          />
          <Pressable
            style={({ pressed }) => [pressed ? styles.pressed : null]}
            onPress={handleSendMessage}
          >
            <MaterialCommunityIcons
              name="send"
              size={30}
              color="black"
              style={styles.inputIcon}
            />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatBoxScreen;

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
