import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { getMyInformation } from "../services/UserServices";
import { AuthContext } from "../store/AuthContext";
import colors from "../variables/colors/colors";
import IconTextButton from "../components/Profile/IconTextButton";

const ProfileScreen = ({ route, navigation }) => {
  const authCtx = useContext(AuthContext);
  const [userInfor, setUserInfor] = useState({ fullName: "", email: "" });
  // navigaiton.setOptions({ headerStyle: { backgroundColor: "red" } });

  useEffect(() => {
    async function getMyInfo() {
      try {
        const res = await getMyInformation(authCtx.token);

        setUserInfor({
          ...userInfor,
          fullname: res.result.fullName,
          email: res.result.email,
        });
        console.log(res.result.fullName, res.result.email);
      } catch (e) {
        console.log(e);
      }
    }

    getMyInfo();
  }, [navigation]);

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: colors.red700,
      },
      headerTintColor: "white",
    });
  }, [navigation]);

  return (
    <View style={styles.root}>
      {/* User infor block */}
      <View style={styles.profileContainer}>
        <Text style={styles.userName}>{userInfor.fullname}</Text>
        <Text style={styles.userEmail}>{userInfor.email}</Text>

        <IconTextButton
          title={"Profile & Security"}
          icon={<AntDesign name="user" size={24} color="black" />}
          rootStyle={styles.IconTextButtonRoot}
          onPress={() => {
            console.log("Navigate to profile screen");
          }}
        />
      </View>

      {/* Other controllers block */}
      <View style={styles.controllersContainer}>
        <IconTextButton
          title={"About us"}
          icon={
            <MaterialCommunityIcons
              name="account-group-outline"
              size={24}
              color="black"
            />
          }
          rootStyle={styles.IconTextButtonRoot}
          onPress={() => {
            console.log("Navigate to profile screen");
          }}
        />
        <IconTextButton
          title={"Others"}
          icon={
            <MaterialCommunityIcons
              name="information-variant"
              size={24}
              color="black"
            />
          }
          rootStyle={styles.IconTextButtonRoot}
          onPress={() => {
            console.log("Navigate to profile screen");
          }}
        />
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#231f20",
    overflow: "hidden",
  },
  profileContainer: {
    paddingHorizontal: 24,
    backgroundColor: colors.red700,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    backgroundColor: "grey",
  },
  userInforContainer: { marginLeft: 8 },
  userName: {
    color: "#FFF",
    fontWeight: "500",
    fontSize: 24,
    paddingTop: 8,
  },
  userEmail: {
    color: "#B6B6B6",
    fontWeight: "500",
    fontSize: 14,
    fontStyle: "italic",
    paddingVertical: 4,
  },
  IconTextButtonRoot: {
    marginTop: 16,
  },
  controllersContainer: {
    paddingHorizontal: 24,
    marginTop: 20,
  },
});
