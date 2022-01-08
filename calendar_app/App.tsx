import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Router from "./Router/Router";
import Homescreen from "./Screen/Homescreen";
import UserScreen from "./Screen/UserScreen";
import { GlobalContext } from "./types/context";

export default function App() {
  const [title, setTitle] = useState("Home");
  const [username, setUsername] = useState("");
  const [icons, setIcons] = useState<Icon[]>([]);
  return (
    <GlobalContext.Provider
      value={{ title: title, setTitle, username, setUsername, icons, setIcons }}
    >
      <View style={styles.container}>
        <Router HomeScreen={Homescreen} LeftScreen={UserScreen} />
        <StatusBar style="auto" />
      </View>
    </GlobalContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
