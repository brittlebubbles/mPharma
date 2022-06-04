import { StyleSheet, Text, View } from "react-native";

import React from "react";

const Welcome = () => {
  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />

      <LinearGradient
        start={{ x: 0.0, y: 0.4 }}
        end={{ x: 0.5, y: 1.0 }}
        locations={[0, 1]}
        colors={["#2D97DA", "#2249D6"]}
        style={{ flex: 1 }}
      >
        {/* Top Section */}
        <View
          style={{
            flex: 2.5,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Image
            resizeMode="contain"
            style={{ width: "90%", height: "90%" }}
            source={require("../assets/images/mi1.jpg")}
          />
        </View>

        {/* Button and text section */}
        <View
          style={{ flex: 2, justifyContent: "center", paddingHorizontal: "5%" }}
        >
          <View
            style={{
              position: "relative",
              flexDirection: "column",
              backgroundColor: "rgba(255,255,255,0.3)",
              height: "70%",
              borderRadius: 15,
              paddingTop: 20,
              paddingHorizontal: "5%",
            }}
          >
            <Text
              style={{
                fontFamily: "Roboto-Black",
                fontSize: 25,
                color: "#fff",
                alignSelf: "center",
                textAlign: "center",
              }}
            >
              Buy Bitcoin and Trade Top Cryptocurrency
            </Text>

            <Text
              style={{
                fontSize: 15,
                fontFamily: "Roboto-Regular",
                alignSelf: "center",
                paddingTop: 20,
                color: "#fff",
                textAlign: "center",
              }}
            >
              you can trade and buy and sell crypto coins here very easily and
              reliably
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate("Home")}
              style={{
                position: "relative",
                width: "100%",
                backgroundColor: "#fff",
                height: 50,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 75,
              }}
            >
              <Text
                style={{
                  fontFamily: "Roboto-Bold",
                  fontSize: 15,
                  color: "#2D97DA",
                }}
              >
                Get Started
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({});
