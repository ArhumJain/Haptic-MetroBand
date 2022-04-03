import React from "react";
import { Pressable, Text } from "react-native";
import colors from "../colors";
import styles from "../styles";
export default function Button({
  style,
  text,
  innerTextColor,
  onPress,
  ...otherProps
}: {
  style: any;
  text: string;
  innerTextColor: string;
  onPress: any;
}) {
  return (
    <Pressable
      style={({ pressed }) => {
        return [
          { backgroundColor: pressed ? colors.primaryDark : colors.primary },
          styles.button,
        ];
      }}
      onPress={onPress}
    >
      <Text style={{ color: innerTextColor, fontWeight: "bold", fontSize: 30 }}>
        {text}
      </Text>
    </Pressable>
  );
}
