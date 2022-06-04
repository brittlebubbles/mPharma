import { StyleSheet, Text, View } from "react-native";

import AppNavigator from "./navigation";
import AppStack from "./navigation/AppStack";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <>
      <AppNavigator />
      {/* <StatusBar style="auto" /> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
