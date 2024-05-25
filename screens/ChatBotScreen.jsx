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
import { Feather } from "@expo/vector-icons";

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

const ChatBoxScreen = ({ navigation }) => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [currentAI, setCurrentAI] = useState(AIs[0]);
  const [isLoading, setIsLoading] = useState(false);
  const { userState } = useContext(UserContext);
  const authCtx = useContext(AuthContext);
  const flatListRef = useRef(null);

  function handleChangeQuestion(e) {
    setQuestion(e);
  }

  function handleChangeCurrentAI() {
    setCurrentAI((prevAI) => {
      const currentIndex = AIs.indexOf(prevAI);
      const nextIndex = (currentIndex + 1) % AIs.length;
      return AIs[nextIndex];
    });
  }

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

      //Vương Đình Quý là ai?
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

  //scroll flat list down when keyboard up
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
