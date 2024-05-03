import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import COLOR from "../constants/color";

const CheckBox = ({ onChange, checked }) => {
  return (
    <Pressable
      style={[styles.checkboxBase, checked && styles.checkboxChecked]}
      onPress={onChange}
    >
      {checked && <Ionicons name="checkmark" size={24} color="white" />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 2,
    borderColor: COLOR.PRIMARY,
    backgroundColor: "transparent",
  },
  checkboxChecked: {
    backgroundColor: COLOR.PRIMARY,
  },
});

export default CheckBox;
