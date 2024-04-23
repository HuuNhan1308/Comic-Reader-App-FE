import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const RectangleCategory = ({
  category,
  onPress,
  containerStyle,
  imageStyle,
  imageSrc,
}) => {
  return (
    <View style={[styles.categoryContainer, containerStyle ?? null]}>
      <Pressable
        onPress={onPress}
        android_ripple={{ color: "#FFF" }}
        style={({ pressed }) => [pressed ? styles.pressed : null]}
      >
        <ImageBackground
          source={imageSrc}
          resizeMode="cover"
          style={[styles.categoryImageBackground, imageStyle ?? null]}
        >
          <LinearGradient
            colors={[
              "rgba(0,212,255,0.7)",
              "rgba(9,121,108,0.5)",
              "rgba(255,255,255,0)",
            ]}
            locations={[0.1, 0.4, 0.9]}
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={{ flex: 1 }}
          >
            <Text style={styles.category}>{category}</Text>
          </LinearGradient>
        </ImageBackground>
      </Pressable>
    </View>
  );
};

export default RectangleCategory;

const styles = StyleSheet.create({
  categoryContainer: {
    width: "50%",
  },
  categoryImageBackground: {
    height: 60,
    backgroundColor: "#d9d9d9",
    opacity: 1,
  },
  pressed: {
    opacity: 0.5,
  },
  category: { position: "absolute" },
});
