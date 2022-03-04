import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const Logo = () => {
  return (
    <View style={styles.container}>
      <Image
        style={{ width: 40, height: 70 }}
        source={require("../images/logo.png")}
      />
      <Text style={styles.logoText}>Welcome to FarmDiscuss.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  logoText: {
    marginVertical: 15,
    fontSize: 19,
    fontWeight: "100",
    color: "white",
  },
});

export default Logo;
