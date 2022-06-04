import { StyleSheet, Text, View } from "react-native";

import { AntDesign } from "@expo/vector-icons";
import React from "react";

const AddButton = ({ antIconName, size, color, style, onPress }: any) => {
  return (
    <AntDesign
      name={antIconName}
      size={size || 50}
      color={color || "#FFF"}
      style={[styles.icon, { ...style }]}
      onPress={onPress}
    />
  );
};

export default AddButton;

const styles = StyleSheet.create({
  icon: {
    backgroundColor: "#FF5100",
    borderRadius: 50,
    elevation: 2,
  },
});
