import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useState } from "react";
import colors from "../../variables/colors/colors";
import { AntDesign } from "@expo/vector-icons";

const ComicInfor = ({
  name,
  author,
  view,
  genres,
  description,
  onPressIcon,
  isBookmarked,
  averageRatingScore,
}) => {
  const [showMore, setShowMore] = useState(false);

  function handleShowMore() {
    setShowMore((prev) => !prev);
  }

  return (
    <View style={styles.comicInforContainer}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={[styles.comicName, styles.title]}>{name}</Text>

        <AntDesign
          name="hearto"
          size={20}
          color="black"
          onPress={onPressIcon}
          suppressHighlighting={true}
          style={{
            padding: 6,
            backgroundColor: isBookmarked ? "#F0B357" : "white",
            borderRadius: 100,
          }}
        />
      </View>
      <Text style={styles.comicText}>Author: {author}</Text>
      <Text style={styles.comicText}>View: {view}</Text>
      <Text style={styles.comicText}>Ratings: {averageRatingScore}</Text>

      {/* Genre Container */}
      <View style={styles.genreContainer}>
        {/* Map genre and render */}
        {genres.map((genre) => (
          <Text style={styles.genre} key={genre.id}>
            {genre.name}
          </Text>
        ))}
      </View>

      <Text
        style={styles.comicText}
        numberOfLines={showMore ? 0 : 2}
        ellipsizeMode="tail"
      >
        Description: {description}
      </Text>

      {/* Show less or more  */}
      <View style={styles.comicSeeMoreButtonContainer}>
        <Pressable
          onPress={handleShowMore}
          style={({ pressed }) => [
            styles.comicSeeMoreButton,
            pressed ? styles.pressed : null,
          ]}
        >
          {!showMore ? (
            <Text style={styles.comicSeeMoreButtonText}>See more</Text>
          ) : (
            <Text style={styles.comicSeeMoreButtonText}>Show less</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default ComicInfor;

const styles = StyleSheet.create({
  title: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 30,
  },
  comicName: { maxWidth: "85%" },
  comicText: { color: colors.white, textAlign: "justify" },
  comicSeeMoreButtonContainer: {
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
  },
  comicSeeMoreButton: {
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  comicSeeMoreButtonText: {
    color: "#329FF8",
  },
  genreContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 6,
    marginHorizontal: -6,
  },
  genre: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    color: "#CCCCCC",
    borderRadius: 6,
    paddingVertical: 2,
    paddingHorizontal: 4,
    marginHorizontal: 6,
  },
});
