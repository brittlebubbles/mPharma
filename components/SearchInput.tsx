import { StyleSheet, Text, TextInput, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import React from "react";

const SearchInput = ({ placeholder }: any) => {
  return (
    <View style={styles.container}>
      <Ionicons name="md-search-outline" size={24} color="black" />
      <TextInput style={styles.input} placeholder={placeholder} />
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 45,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    paddingLeft: 15,
  },
  input: {
    width: "100%",
    height: "100%",
  },
});
