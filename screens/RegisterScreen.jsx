import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import IconInput from "../components/IconInput";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../variables/colors/colors";
import DatePicker from "../components/Profile/DatePicker";
import SelectDropdown from "react-native-select-dropdown";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { formatDate } from "../utils/DateUtil";
import { register } from "../services/LoginServices";

const RegisterScreen = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [registerObj, setRegisterObj] = useState({
    username: "",
    password: "",
    email: "",
    fullName: "",
    dateOfBirth: new Date(),
    isMale: false,
  });
  const Genders = ["Male", "Female"];

  function handleChangeRegisterObj(event, type) {
    switch (type) {
      case "username":
        setRegisterObj({ ...registerObj, username: event });
        break;
      case "password":
        setRegisterObj({ ...registerObj, password: event });
        break;
      case "email":
        setRegisterObj({ ...registerObj, email: event });
        break;
      case "fullName":
        setRegisterObj({ ...registerObj, fullName: event });
        break;
      case "dateOfBirth":
        setRegisterObj({ ...registerObj, dateOfBirth: event });
        break;
      case "isMale":
        setRegisterObj({
          ...registerObj,
          isMale: event === Genders[0] ? true : false,
        });
        break;
      default:
    }
  }

  async function handleSubmitRegisterForm() {
    const data = {
      ...registerObj,
      dateOfBirth: formatDate(registerObj.dateOfBirth),
    };

    try {
      setIsLoading(true);
      const registerResponse = await register(data);

      //if login failed --> show alert
      if (registerResponse.code !== 200) {
        Alert.alert("Failed", registerResponse.message);
        return;
      }

      //if login success ---> show alert
      Alert.alert("Success", registerResponse.message);
      navigation.replace("Login");
    } catch (e) {
      console.log("Error at Register Screen: ", e);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <ActivityIndicator size="large" color="black" style={{ flex: 1 }} />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView style={styles.rootContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/book-icon.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>CREATE NEW ACCOUNT</Text>
          <View style={styles.registerTextContainer}>
            <Text style={styles.description}>Already registered? </Text>
            <Text
              style={[styles.description, { fontWeight: "bold" }]}
              onPress={() => {
                navigation.navigate("Login");
              }}
              suppressHighlighting={false}
            >
              Login
            </Text>
          </View>
        </View>

        <View>
          <IconInput
            value={registerObj.username}
            onChangeText={(e) => handleChangeRegisterObj(e, "username")}
            placeholder={"Username"}
            icon={<AntDesign name="user" size={24} color="black" />}
            inputStyle={styles.inputStyle}
          />

          <IconInput
            value={registerObj.email}
            onChangeText={(e) => handleChangeRegisterObj(e, "email")}
            placeholder={"Email"}
            icon={<Entypo name="email" size={24} color="black" />}
            inputStyle={styles.inputStyle}
          />

          <IconInput
            value={registerObj.password}
            onChangeText={(e) => handleChangeRegisterObj(e, "password")}
            placeholder={"Password"}
            icon={<AntDesign name="key" size={24} color="black" />}
            secureTextEntry={true}
            inputStyle={styles.inputStyle}
          />

          <IconInput
            value={registerObj.fullName}
            onChangeText={(e) => handleChangeRegisterObj(e, "fullName")}
            placeholder={"Full name"}
            icon={<Ionicons name="information" size={24} color="black" />}
            inputStyle={styles.inputStyle}
          />

          <IconInput
            icon={<Fontisto name="date" size={24} color="black" />}
            customInput={
              <DatePicker
                value={registerObj.dateOfBirth}
                onConfirm={(e, selectedDate) =>
                  handleChangeRegisterObj(selectedDate, "dateOfBirth")
                }
                inputStyle={styles.datePickerInput}
              />
            }
          />

          <IconInput
            value={registerObj.isMale}
            icon={
              <FontAwesome
                name="transgender"
                size={24}
                color="black"
                style={{ paddingHorizontal: 2 }}
              />
            }
            customInput={
              <SelectDropdown
                data={Genders}
                onSelect={(e) => handleChangeRegisterObj(e, "isMale")}
                renderButton={(selectedItem, isOpened) => {
                  return (
                    <View style={styles.dropDownInputContainer}>
                      <TextInput
                        style={styles.dropDownInput}
                        value={selectedItem || "Choose gender"}
                        editable={false}
                      />
                      <Icon
                        name={isOpened ? "chevron-up" : "chevron-down"}
                        color={"black"}
                        size={24}
                        style={styles.dropDownIcon}
                      />
                    </View>
                  );
                }}
                renderItem={(item, index, isSelected) => {
                  return (
                    <View
                      style={{
                        ...styles.dropDownItem,
                        ...(isSelected && { backgroundColor: "#D2D9DF" }),
                      }}
                    >
                      <Text style={styles.dropDownItemText}>{item}</Text>
                    </View>
                  );
                }}
                showsVerticalScrollIndicator={false}
                dropdownStyle={styles.dropDownMenuStyle}
              />
            }
          />
        </View>

        <View>
          <Pressable
            onPress={handleSubmitRegisterForm}
            style={({ pressed }) => [
              styles.button,
              pressed ? styles.buttonPressed : null,
            ]}
          >
            <Text style={styles.buttonText}>Register</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  rootContainer: { flex: 1, paddingHorizontal: 30 },
  imageContainer: {
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 150,
    height: 150,
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.purple800,
    textAlign: "center",
  },
  description: {
    fontSize: 20,
    color: colors.purple900,
    fontWeight: "400",
  },
  button: {
    marginTop: 30,
    marginBottom: 80,
    paddingVertical: 10,
    paddingHorizontal: 50,
    backgroundColor: "#BCA2D2",
    borderRadius: 100,
    width: Platform.OS === "android" ? 180 : 200,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
  },
  buttonPressed: {
    opacity: 0.7,
  },
  registerTextContainer: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },
  registerText: {
    color: "#877099",
    fontWeight: "600",
    paddingVertical: 4,
  },

  //dropdown
  dropDownContainer: { paddingHorizontal: 30 },
  dropDownInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 1000,
    flex: 1,
  },
  dropDownInput: {
    paddingVertical: Platform.OS === "android" ? 6 : 12,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "black",
    borderColor: colors.white,
    borderRadius: 14,
    flex: 1,
  },
  dropDownIcon: {
    paddingHorizontal: 10,
  },
  dropDownButtonContainer: {
    paddingVertical: Platform.OS === "android" ? 8 : 14,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dropDownButtonText: { fontSize: 16, color: colors.white },
  dropDownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
    paddingVertical: 12,
  },
  dropDownItem: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  dropDownItemText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "black",
  },
  iconContainer: {
    borderRadius: 100,
    backgroundColor: colors.purple500,
    padding: 6,
    marginRight: 10,
  },

  //Date picker
  datePickerInput: {
    paddingVertical: Platform.OS === "android" ? 6 : 12,
    borderWidth: 1,
    fontSize: 16,
    color: "black",
    borderColor: colors.black,
    borderRadius: 10000,
    flex: 1,
  },
});
