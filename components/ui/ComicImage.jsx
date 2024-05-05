import React, { useState, useEffect } from "react";
import { Image } from "react-native";

const ComicImage = ({ uri, width }) => {
  const [aspectRatio, setAspectRatio] = useState(1);

  useEffect(() => {
    Image.getSize(uri, (width, height) => {
      setAspectRatio(width / height);
    });
  }, [uri]);

  return (
    <Image
      source={{ uri }}
      style={{ width, aspectRatio }}
      //   style={{ height: 700 }}
      resizeMode="contain"
    />
  );
};

export default ComicImage;
