import React, { ReactElement } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Screen1 from "./components/Screen1";
import styles from "./Styles";

export default function App(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView>
        <Screen1 style={styles.screen} />
      </ScrollView>
    </SafeAreaView>
  );
}
