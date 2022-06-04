import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "../components/SearchInput";

const Products = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text
            style={{
              fontSize: 30,
              color: "#FF5100",
              fontWeight: "500",
            }}
          >
            mPharma
          </Text>
          <Ionicons name="md-notifications-outline" size={30} color="black" />
        </View>
        <View>
          <SearchInput placeholder="Search..." />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Products;

const styles = StyleSheet.create({
  safeArea: {
    height: "100%",
    paddingTop: "5%",
    flex: 1,
    backgroundColor: "#E9EEEF",
  },
  scrollView: {
    height: "100%",
    backgroundColor: "#fff",
  },
  container: {
    paddingHorizontal: "5%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    alignItems: "center",
    marginBottom: "5%",
    // backgroundColor: "#3ff",
  },
});
