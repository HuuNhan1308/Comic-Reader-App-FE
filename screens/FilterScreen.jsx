import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Platform,
  Pressable,
} from "react-native";
ChapterHeader;
import React, { useEffect, useState } from "react";
import ChapterHeader from "../components/Comics/ChapterHeader";
import colors from "../variables/colors/colors";
import { getAllGenres } from "../services/FilterServices";

const FilterScreen = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [genres, setGeneres] = useState([]);
  const [activeGenres, setActiveGenres] = useState([]);

  const { prevPage } = route.params;

  function handleToggleActiveGenres(id) {
    if (activeGenres.includes(id)) {
      setActiveGenres((prev) => prev.filter((item) => item !== id));
    } else {
      setActiveGenres([...activeGenres, id]);
    }
  }

  function handleApplyFilter() {
    navigation.navigate({
      name: prevPage,
      params: { activeGenres },
      merge: true,
    });
  }

  //Fetch the list of genres from the server
  useEffect(() => {
    async function fetchGenres() {
      try {
        setIsLoading(true);
        const response = await getAllGenres();
        setGeneres(response.result);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    }

    fetchGenres();
  }, []);

  return (
    <View style={styles.root}>
      {isLoading ? (
        <ActivityIndicator size="large" color="grey" style={{ flex: 1 }} />
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            data={genres}
            keyExtractor={(item, index) => item.id}
            renderItem={({ item, index }) => (
              <Pressable
                onPress={() => handleToggleActiveGenres(item.id)}
                style={({ pressed }) => [
                  styles.button,
                  pressed ? styles.pressed : null,
                  activeGenres.includes(item.id) ? styles.buttonActive : null,
                ]}
              >
                <Text
                  style={[
                    styles.buttonText,
                    activeGenres.includes(item.id)
                      ? styles.buttonActiveText
                      : null,
                  ]}
                >
                  {item.name}
                </Text>
              </Pressable>
            )}
            scrollEnabled={false}
            contentContainerStyle={styles.buttonContainer}
            numColumns={Platform.OS === "android" ? 3 : 3}
          />

          {/* Controller */}
          {activeGenres.length > 0 && (
            <View style={styles.controllerContainer}>
              <View style={styles.controllerButtonContainer}>
                <Pressable
                  android_ripple={{ color: "#FFF" }}
                  style={({ pressed }) => [pressed ? styles.pressed : null]}
                  onPress={() => setActiveGenres([])}
                >
                  <Text style={[styles.controllerButtonText]}>Cancel</Text>
                </Pressable>
              </View>

              <View style={[styles.controllerButtonContainer]}>
                <Pressable
                  android_ripple={{ color: "black" }}
                  style={({ pressed }) => [
                    { backgroundColor: colors.white },
                    pressed ? styles.pressed : null,
                  ]}
                  onPress={handleApplyFilter}
                >
                  <Text
                    style={[
                      styles.controllerButtonText,
                      {
                        color: colors.black,
                      },
                    ]}
                  >
                    Apply
                  </Text>
                </Pressable>
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#3B3B3B",
  },
  container: { alignItems: "center" },
  buttonContainer: {
    alignItems: "center",
    marginTop: Platform.OS === "ios" ? 20 : 10,
  },
  button: {
    flex: undefined,
    backgroundColor: colors.lightgrey,
    borderRadius: 100,
    paddingVertical: 10,
    borderWidth: 1,
    paddingHorizontal: 18,
    marginHorizontal: Platform.OS === "ios" ? 15 : 20,
    marginTop: 10,
  },
  buttonText: { color: colors.white, fontWeight: "600", fontSize: 14 },
  buttonActive: { backgroundColor: "#CF33259C" },
  buttonActiveText: { color: colors.white },
  pressed: {
    opacity: 0.8,
  },

  controllerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#231f20",
    paddingTop: Platform.OS === "android" ? 30 : 30,
    paddingBottom: Platform.OS === "android" ? 30 : 50,
    paddingHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  controllerButtonContainer: {
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 100,
  },
  controllerButtonText: {
    color: colors.white,
    paddingHorizontal: 40,
    paddingVertical: 10,
    fontSize: 24,
  },
});
