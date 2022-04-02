import React, { ReactElement } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet, Pressable } from "react-native";

const Button: any = (props: any) => {
  console.log(props.text);
  return (
    <Pressable
      style={({ pressed }) => {
        return [{ backgroundColor: pressed ? "blue" : "red" }, styles.button];
      }}
      onPress={props.onPress}
    >
      <Text>{props.text}</Text>
    </Pressable>
  );
};

export default function App(): JSX.Element {
  const on = (): void => {
    console.log("on");
  };

  const off = (): void => {
    console.log("off");
  };

  return (
    <View style={styles.container}>
      <Button text="On" style={[styles.button]} onPress={on}></Button>

      <Button text="Off" style={styles.button} onPress={off}></Button>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2E3440",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
    paddingHorizontal: 80,
    borderRadius: 15,
    elevation: 3,
  },
});
