import React, { ReactElement } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet, Pressable, SafeAreaView } from "react-native";
import Screen1 from "./components/Screen1";
import Button from "./components/Button";
import colors from "./colors";
import styles from "./styles";

export default function App(): JSX.Element {
  return (
    <View>
      <StatusBar style="auto" />
      <SafeAreaView style={styles.container}>
        <Screen1 style={styles.screen} />
      </SafeAreaView>
    </View>
  );
}
