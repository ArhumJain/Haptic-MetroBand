import React from "react";
import { TextInput, View } from "react-native";
import styles from "../Styles";

export default function TimeSignature(props: {
  parentBPMChange: (text: string) => void;
  parentQuarterNoteValueChange: (text: string) => void;
}): JSX.Element {
  return (
    <View>
      <TextInput
        style={styles.inputBox}
        defaultValue="4"
        placeholder="Beats per measure"
        keyboardType="numeric"
        onChangeText={props.parentBPMChange}
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
        keyboardType="numeric"
        onChangeText={props.parentQuarterNoteValueChange}
      />
    </View>
  );
}
