import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

const Genre = ({ genreName }) => {
  return <Text style={styles.genre}>{genreName}</Text>;
};

const RowComic = ({
  imageSrc,
  comicName,
  comicChapter,
  comicLastestUpdate,
  genres = ["genre1", "genre2"],
  onPress,
  containerStyle,
  imageStyle,
  iconStyle,
  onPressIcon,
  onPressComic,
  title,
  chapter,
}) => {
  return (
    <View>
      <Pressable
        onPress={onPress}
        android_ripple={{ color: "#FFF" }}
        style={({ pressed }) => [styles.root, pressed ? styles.pressed : null]}
      >
        <Image source={imageSrc} resizeMode="cover" style={styles.comicImage} />

        <View style={styles.comicInforContainer}>
          <Text style={styles.comicName}>{comicName}</Text>

          {/* Chapter Container */}
          <View style={[styles.row, styles.chapterContainer]}>
            <Text style={styles.comicChapter}>{comicChapter}</Text>
            <Text style={styles.comicLastestUpdate}>{comicLastestUpdate}</Text>
          </View>

          {/* Genre Container */}
          <View style={[styles.row, styles.genreContainer]}>
            {genres.map((genre) => (
              <Genre genreName={genre} key={genre} />
            ))}
          </View>

          {/* Detail Container */}
          <View style={styles.row}></View>
        </View>
      </Pressable>
    </View>
  );
};

export default RowComic;

const styles = StyleSheet.create({
  root: { flexDirection: "row", marginVertical: 10 },
  comicImage: {
    width: 80,
    height: 90,
  },
  comicInforContainer: {
    marginLeft: 20,
    flex: 1,
  },
  comicName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
  },
  chapterContainer: {},
  comicChapter: { fontSize: 12 },
  comicLastestUpdate: { marginLeft: 20, fontSize: 12 },
  genreContainer: { marginHorizontal: -6, marginTop: 8 },
  genre: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    color: "#CCCCCC",
    borderRadius: 6,
    paddingVertical: 2,
    paddingHorizontal: 6,
    marginHorizontal: 6,
  },
  pressed: {
    opacity: 0.5,
  },
});
