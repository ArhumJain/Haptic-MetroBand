import React from "react";
import { StyleSheet } from "react-native";
import colors from "./Colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.secondary,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",

    paddingVertical: 30,
    paddingHorizontal: 80,
    borderRadius: 15,
    elevation: 3,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  inline: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 15,
    marginVertical: 10,

  },
  screen: {
    color: colors.primary,
  },
  inputBox: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: colors.primaryContrast,
    marginVertical: 10,
  },
});
