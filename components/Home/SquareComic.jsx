import {
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
  Text,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const SquareComic = ({
  imageSrc,
  containerStyle,
  imageStyle,
  iconStyle,
  onPressIcon,
  onPressComic,
  title,
  chapter,
}) => {
  return (
    <View style={[styles.comicContainer, containerStyle ?? null]}>
      <Pressable
        onPress={onPressComic}
        android_ripple={{ color: "#FFF" }}
        style={({ pressed }) => [pressed ? styles.pressed : null]}
      >
        <ImageBackground
          source={imageSrc}
          resizeMode="contain"
          style={[styles.comicImageBackground, imageStyle ?? null]}
        >
          <View style={[styles.comicBookmarkIcon, iconStyle ?? null]}>
            <AntDesign
              name="hearto"
              size={16}
              color="black"
              onPress={onPressIcon}
              style={({ pressed }) => [pressed ? styles.bgNone : null]}
              suppressHighlighting={true}
            />
          </View>
        </ImageBackground>

        <View style={styles.contentContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.chapter}>{chapter}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default SquareComic;

const styles = StyleSheet.create({
  comicContainer: {
    width: "33.33%",
  },
  comicImageBackground: {
    height: 120,
    backgroundColor: "#d9d9d9",
  },
  comicBookmarkIcon: {
    position: "absolute",
    top: 4,
    right: 4,
    padding: 4,
  },
  contentContainer: {
    alignItems: "center",
    paddingBottom: 10,
    marginBottom: 8,
  },
  pressed: {
    opacity: 0.5,
  },
  bgNone: {
    backgroundColor: "transparent",
  },
});
