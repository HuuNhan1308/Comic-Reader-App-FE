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

const Genders = ["Male", "Female"];
/**
 * Represents the screen for changing the user's profile.
 *
 * @param {object} navigation - The navigation object provided by React Navigation.
 * @param {object} route - The route object provided by React Navigation.
 * @returns {JSX.Element} The ChangeProfileScreen component.
 */
const ChangeProfileScreen = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [gender, setGender] = useState("");

  const authCtx = useContext(AuthContext);
  const { userState, userDispatch } = useContext(UserContext);

  /**
   * This useEffect hook is used to initialize the form fields with the current user's data.
   * It is triggered once when the component mounts.
   *
   * It sets the fullName state to the user's current full name,
   * the dateOfBirth state to the user's current date of birth (after reversing the date format),
   * and the gender state to the user's current gender.
   */
  useEffect(() => {
    setFullName(userState.fullName);
    setDateOfBirth(new Date(reverseDate(userState.dateOfBirth)));
    if (userState.isMale === true) setGender(Genders[0]);
    else setGender(Genders[1]);
  }, []);

  /**
   * Handles the selection of a gender.
   *
   * @param {string} item - The selected gender.
   *
   * This function is typically used to update the gender state when the user selects a gender.
   */
  function handleSelectGender(item) {
    setGender(item);
  }

  /**
   * Handles the selection of a date.
   *
   * @param {Event} event - The event object.
   * @param {Date} selectedDate - The selected date.
   *
   * This function is typically used to update the dateOfBirth state when the user selects a date.
   */
  function handleSelectDate(event, selectedDate) {
    setDateOfBirth(selectedDate);
  }

  /**
   * Handles the change of the full name input field.
   *
   * @param {string} value - The full name entered by the user.
   *
   * This function is typically used to update the fullName state when the user types in the full name input field.
   */
  function handleChangeFullName(value) {
    setFullName(value);
  }

  /**
   * Handles the submission of the change profile form.
   *
   * This function is asynchronous. It first sets the loading state to true.
   * Then, it validates the full name input. If the full name is empty, it shows an alert and returns early.
   *
   * If the full name is valid, it prepares the data to be sent to the API.
   * It sets `isMale` to true if the gender is "Male", and false otherwise.
   * It then creates a `data` object with the full name, the formatted date of birth, and the `isMale` value.
   *
   * It then calls the `changeUserProfile` API with the user's token and the prepared data.
   *
   * If the API call is successful, it dispatches an action to the user context to update the user's data.
   * It shows a success alert with the message from the API response.
   * It then navigates to the Profile screen in the Main stack.
   *
   * If an error occurs during the process, it logs the error.
   *
   * Regardless of the outcome, it finally sets the loading state to false.
   */
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
            onChangeText={handleChangeFullName}
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
