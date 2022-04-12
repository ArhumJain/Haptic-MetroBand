import React from "react";
import { Pressable, TargetedEvent, Text, View } from "react-native";
import colors from "../Colors";
import styles from "../Styles";
import { useState } from "react";
import useInterval from "../use_interval";
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
  ...otherProps
}: {
  style: any;
  bpm: number;
  quarterNoteValue: number;
  tempo: number;
}) {
  const [count, setCount] = React.useState<number>(0);

  const normalizeCount = (count: number) => count % bpm;

  const [isRunning, setIsRunning] = useState(false);
  const [prevTime, setPrevTime] = useState<number | null>(null);
  const [timeInMilliseconds, setTimeInMilliseconds] = useState(0);
  const [time, setTime] = useState<timeFace | null>(null);
  const [prevCountTime, setPrevCountTime] = useState<number>(0);
  const [beatSeparation, setBeatSeparation] = useState<number>(
    (60 / tempo) * 1000
  );
  let interval = 1;

  const inrange = (target: number, margin: number, value: number) => {
    return target - margin <= value && value <= target + margin;
  };

  useInterval(
    () => {
      // Every 1/3 of a real second, increment the count
      let prev = prevTime ? prevTime : Date.now();
      let diffTime = Date.now() - prev;
      let newMilliTime = timeInMilliseconds + diffTime;
      let newTime: timeFace = toTime(newMilliTime);
      setPrevTime(Date.now());
      setTimeInMilliseconds(newMilliTime);
      setTime(newTime);
      if (checkForBeat()) {
        // send Beat
        try {
          HapticBluetooth.writeToRemote("1");
        } catch (e) {
          console.log("beat");
        }
        setTimeout(() => {
          try {
            HapticBluetooth.writeToRemote("0");
          } catch (e) {
            console.log("beat end");
          }
        }, 190);
        console.log("Beat", count);
      }
      setCount(normalizeCount(count));
    },
    isRunning ? interval : null
  );

  const checkForBeat = () => {
    if (inrange(prevCountTime + beatSeparation, 100, timeInMilliseconds)) {
      setPrevCountTime(timeInMilliseconds);
      setCount(count + 1);
      return true;
    }
  };
  const handleTime = () => {
    setIsRunning(!isRunning);
    setPrevTime(0);
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
        text="Hi"
        onPress={() => {
          handleTime();
          console.log("hi", isRunning);
        }}
        innerTextColor={colors.primaryContrast}
        isDisabled={false}
      />
      <Text style={style}>
        {"Time: " +
          time?.minutes +
          ":" +
          time?.seconds +
          ":" +
          time?.milliseconds}
      </Text>
    </View>
  );
}
