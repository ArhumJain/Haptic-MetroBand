import React from "react";
import {
  DatePickerIOSBase,
  Pressable,
  TargetedEvent,
  Text,
  View,
} from "react-native";
import colors from "../Colors";
import styles from "../Styles";
import { useState } from "react";
import useInterval from "../UseInterval";
import Button from "./Button";
import HapticBluetooth from "../HapticBluetooth";
interface timeFace {
  milliseconds: string | number;
  seconds: string | number;
  minutes: string | number;
}
export default function Timer({
  style,
  bpm,
  quarterNoteValue,
  tempo,
  disabled,
  ...otherProps
}: {
  style: any;
  bpm: number;
  quarterNoteValue: number;
  tempo: number;
  disabled: boolean;
}) {
  const [count, setCount] = React.useState<number>(0);

  const normalizeCount = (count: number) => count % bpm;

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [startText, setStartText] = useState<string>("Start");
  const [prevTime, setPrevTime] = useState<number | null>(null);
  const [timeInMilliseconds, setTimeInMilliseconds] = useState(0);
  const [time, setTime] = useState<timeFace | null>(null);
  const [beatSeparation, setBeatSeparation] = useState<number>(
    (60 / tempo) * 1000
  );
  // let interval = 250;
  const [interval, setMetroInterval] = useState<number>(1000);
  const [BPM, setBPM] = useState<number>(60);
  const [tempoChangeEnabled, setTempoChangeEnabled] = useState<boolean>(true);
  const inRange = (target: number, margin: number, value: number) => {
    return target - margin <= value && value <= target + margin;
  };

  useInterval(
    () => {
      if (count % 4 == 0) {
        HapticBluetooth.writeToRemote("2");
        console.log("DAAAAAAAAAAAAAAAAAH");
      } else {
        HapticBluetooth.writeToRemote("1");
        console.log("DUH");
      }
      setTimeout(() => {
        HapticBluetooth.writeToRemote("0");
      }, 100);
      setCount(count + 1);
    },
    isRunning ? interval : null
  );

  const checkForBeat = () => {
    if (inRange(prevCountTime + beatSeparation, 100, timeInMilliseconds)) {
      setPrevCountTime(timeInMilliseconds);
      setCount(count + 1);
      return true;
    }
  };

  const handleTime = () => {
    setIsRunning(!isRunning);
    setTempoChangeEnabled(!tempoChangeEnabled);
    if (isRunning) setStartText("Start");
    else setStartText("Stop");
    setPrevTime(0);
  };

  const increase = (): void => {
    if (BPM < 240) {
      console.log("increase");
      setIsRunning(false);
      setMetroInterval(interval / 2);
      console.log(interval);
      setBPM(BPM * 2);
      setIsRunning(true);
    }
  };

  const decrease = (): void => {
    if (BPM > 60) {
      console.log("decrease");
      setIsRunning(false);
      setMetroInterval(interval * 2);
      console.log(interval);
      setBPM(BPM / 2);
      setIsRunning(true);
    }
  };

  const toTime = (time: number) => {
    let milliseconds = time % 1000,
      seconds = Math.floor((time / 1000) % 60),
      minutes = Math.floor(time / (1000 * 60));

    let minutesText = minutes < 10 ? "0" + minutes : minutes;
    let secondsText = seconds < 10 ? "0" + seconds : seconds;

    return {
      milliseconds,
      seconds: secondsText,
      minutes: minutesText,
    };
  };

  return (
    <View>
      <Button
        style={styles.button}
        text={startText}
        onPress={() => {
          handleTime();
          console.log("hi", isRunning);
        }}
        innerTextColor={colors.primaryContrast}
        isDisabled={!disabled}
      />
      <View style={styles.inline}>
        <Button
          style={styles.button}
          text="↑"
          onPress={increase}
          innerTextColor={colors.primaryContrast}
          isDisabled={tempoChangeEnabled}
        />

        <Button
          style={styles.button}
          text="↓"
          onPress={decrease}
          innerTextColor={colors.primaryContrast}
          isDisabled={tempoChangeEnabled}
        />
      </View>
      <Text style={[styles.screen, { alignSelf: "center", fontSize: 60 }]}>
        {BPM + " bpm"}
      </Text>
      {/* <Text style={style}>  
        {"Time: " +
          time?.minutes +
          ":" +
          time?.seconds +
          ":" +
          time?.milliseconds}
      </Text> */}
    </View>
  );
}
