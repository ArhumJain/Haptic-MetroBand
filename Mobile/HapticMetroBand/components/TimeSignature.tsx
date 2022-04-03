import React from "react";
import { TextInput, View } from "react-native";
import styles from "../styles";

export default function TimeSignature(): JSX.Element {
  return (
    <View>
      <TextInput
        style={styles.inputBox}
        defaultValue="4"
        placeholder="Beats per measure"
      />
      <View
        style={{
          borderBottomColor: "black",
          borderBottomWidth: 1,
        }}
      />
      <TextInput
        style={styles.inputBox}
        defaultValue="4"
        placeholder="Quarter Note Beats"
      />
    </View>
  );
}
