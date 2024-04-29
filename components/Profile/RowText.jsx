import { StyleSheet, Text, View } from "react-native";
import colors from "../../variables/colors/colors";

const RowText = ({ title, value }) => {
  return (
    <View style={styles.inforContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

export default RowText;

const styles = StyleSheet.create({
  inforContainer: {
    backgroundColor: colors.lightgrey,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { color: "#FFF" },
  value: { color: "#FFF" },
});
