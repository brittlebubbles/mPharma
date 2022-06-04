import AppStack from "../navigation/AppStack";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StatusBar } from "expo-status-bar";

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <AppStack />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
