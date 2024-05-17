import {
  StyleSheet,
  Text,
  View,
  Platform,
  TextInput,
  Pressable,
} from "react-native";
import React from "react";
import SelectDropdown from "react-native-select-dropdown";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../variables/colors/colors";

const Dropdown = ({
  title,
  onSelect,
  showsVerticalScrollIndicator = false,
  gender,
  data,
}) => {
  return (
    <View style={styles.dropDownContainer}>
      <Text style={styles.title}>{title}</Text>

      <SelectDropdown
        data={data}
        onSelect={onSelect}
        renderButton={(selectedItem, isOpened) => {
          return (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={selectedItem || gender}
                editable={false}
              />
              <Icon
                name={isOpened ? "chevron-up" : "chevron-down"}
                color={"white"}
                size={24}
                style={styles.icon}
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
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        dropdownStyle={styles.dropDownMenuStyle}
      />
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.white,
    marginBottom: 10,
    letterSpacing: 1.8,
    marginTop: 40,
  },
  dropDownContainer: {},
  inputContainer: { flexDirection: "row", alignItems: "center" },
  input: {
    paddingVertical: Platform.OS === "android" ? 6 : 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    fontSize: 16,
    color: colors.white,
    borderColor: colors.white,
    borderRadius: 14,
    flex: 1,
  },
  icon: {
    position: "absolute",
    right: 0,
    padding: 12,
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
});
