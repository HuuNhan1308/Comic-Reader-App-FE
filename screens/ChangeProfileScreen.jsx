import {
  StyleSheet,
  Text,
  Pressable,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  View,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import colors from "../variables/colors/colors";
import InputField from "../components/Profile/InputField";
import { AuthContext } from "../store/AuthContext";
import Dropdown from "../components/Profile/Dropdown";
import DatePicker from "../components/Profile/DatePicker";
import { UserContext } from "../store/UserContext";
import { formatDate, reverseDate } from "../utils/DateUtil";
import { changeUserProfile } from "../services/UserServices";
import { SET_ALL } from "../store/UserReducer/constants";

const ChangeProfileScreen = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [gender, setGender] = useState("");
  const Genders = ["Male", "Female"];

  const authCtx = useContext(AuthContext);
  const { userState, userDispatch } = useContext(UserContext);

  useEffect(() => {
    setFullName(userState.fullName);
    setDateOfBirth(new Date(reverseDate(userState.dateOfBirth)));
    if (userState.isMale === true) setGender(Genders[0]);
    else setGender(Genders[1]);
  }, []);

  function handleSelectGender(item) {
    setGender(item);
  }

  function handleSelectDate(event, selectedDate) {
    setDateOfBirth(selectedDate);
  }

  async function handleSubmitChangeProfile() {
    try {
      setIsLoading(true);
      //validate
      if (fullName.trim() === "") {
        Alert.alert("Failed", "Please enter your full name");
        return;
      }

      //prepair data
      let isMale;
      if (gender === "Male") isMale = true;
      else isMale = false;

      const data = {
        fullName,
        dateOfBirth: formatDate(dateOfBirth),
        isMale,
      };

      //call api
      const res = await changeUserProfile(authCtx.token, data);

      //set user context and navigate
      userDispatch({
        type: SET_ALL,
        payload: data,
      });

      Alert.alert("Success", res.message);
      navigation.replace("Main", { screen: "Profile" });
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <ActivityIndicator size="large" color="#FFF" style={styles.root} />;
  }

  return (
    <ScrollView style={styles.fullHeight}>
      <KeyboardAvoidingView
        style={styles.fullHeight}
        behavior="position"
        contentContainerStyle={styles.root}
      >
        <View style={{ paddingHorizontal: 30 }}>
          <InputField
            title={"Full name"}
            value={fullName}
            onChangeText={(fullname) => {
              setFullName(fullname);
            }}
          />

          <DatePicker
            title={"Date of birth"}
            value={dateOfBirth}
            onConfirm={handleSelectDate}
          />

          <Dropdown
            title={"Gender"}
            data={Genders}
            onSelect={handleSelectGender}
            gender={gender}
          />
        </View>

        <Pressable
          onPress={handleSubmitChangeProfile}
          style={({ pressed }) => [
            styles.button,
            pressed ? styles.pressed : null,
          ]}
        >
          <Text style={styles.buttonText}>SAVE CHANGES</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default ChangeProfileScreen;

const styles = StyleSheet.create({
  fullHeight: {
    flex: 1,
    backgroundColor: colors.darkgrey,
  },
  root: {
    flex: 1,
    backgroundColor: colors.darkgrey,
    paddingHorizontal: 30,
    justifyContent: "center",
  },
  button: {
    marginTop: 100,
    paddingVertical: 10,
    paddingHorizontal: 50,
    backgroundColor: "grey",
    borderRadius: 100,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.7,
  },
});
