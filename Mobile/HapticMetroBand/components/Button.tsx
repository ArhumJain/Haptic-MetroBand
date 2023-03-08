import React from "react";
import { Pressable, Text } from "react-native";
import colors from "../Colors";
import styles from "../Styles";
export default function Button({
  style,
  text,
  innerTextColor,
  onPress,
  isDisabled,
  ...otherProps
}: {
  style: any;
  text: string;
  innerTextColor: string;
  onPress: any;
  isDisabled: boolean;
}) {
  return (
    <Pressable
      style={({ pressed }) => {
        return [
          { backgroundColor: pressed ? colors.primaryDark : (isDisabled ? colors.disabled : colors.primary) },
          style,
        ];
      }}
      onPress={onPress}
      disabled={isDisabled}
    >
      <Text style={{ color: innerTextColor, fontWeight: "bold", fontSize: 30 }}>
        {text}
      </Text>
    </Pressable>
  );
}
