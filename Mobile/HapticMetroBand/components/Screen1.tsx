import React, { ReactElement } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, TextInput } from "react-native";
import styles from "../Styles";
import colors from "../Colors";
import Button from "./Button";
import TimeSignature from "./TimeSignature";

export default function Screen1({ style, ...otherProps }: { style: any }) {
  const on = (): void => {
    console.log("on");
  };

  const off = (): void => {
    console.log("off");
  };

  return (
    <View>
      <Text style={style} {...otherProps}>
        Haptic MetroBand Control Panel
      </Text>
      <Button
        text="On"
        style={[styles.button]}
        onPress={on}
        innerTextColor={colors.primaryContrast}
      ></Button>

      <Button
        text="Off"
        style={styles.button}
        onPress={off}
        innerTextColor={colors.primaryContrast}
      ></Button>
      <Text style={style}>Time Signature:</Text>
      <TimeSignature />
      <TextInput placeholder="Tempo" style={styles.inputBox} />
    </View>
  );
}
