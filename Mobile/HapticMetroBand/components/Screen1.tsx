import React, { ReactElement, useState } from "react";
import { Text, View, TextInput } from "react-native";
import styles from "../Styles";
import colors from "../Colors";
import Button from "./Button";
import TimeSignature from "./TimeSignature";
import HapticBluetooth from "../HapticBluetooth";
import Timer from "./Timer";
export default function Screen1({ style, ...otherProps }: { style: any }) {
  const [isPaired, setPaired] = useState("Not paired");

  const [isConnected, setConnected] = useState("Not connected");
  const [connectDisabled, setConnectDisabled] = useState(true);

  const [toggleStatus, setToggleStatus] = useState("Start");
  const [toggleDisabled, setToggleDisabled] = useState(true);

  const [bpm, setBpm] = useState(4);
  const [quarterNoteValue, setQuarterNoteValue] = useState(4);
  const [tempo, setTempo] = useState(60);

  // #region Change Handlers
  const handleBPMChange = (bpm: string) => {
    setBpm(parseInt(bpm));
  };

  const handleQuarterNoteValueChange = (qNV: string) => {
    setQuarterNoteValue(parseInt(qNV));
  };
  // #endregion

  // #region Bluetooth
  const toggle = (): void => {
    if (toggleStatus == "Start") {
      setToggleStatus("Off");
      HapticBluetooth.writeToRemote("1");
    } else {
      setToggleStatus("On");
      HapticBluetooth.writeToRemote("0");
    }
  };

  const checkPaired = async (): Promise<void> => {
    const pairedDevices: any = await HapticBluetooth.getPairedDevices();
    if (pairedDevices["HC-06"] !== undefined) {
      setPaired("Paired!");
      setConnectDisabled(false);
    }
    console.log(isPaired);
  };

  const connect = async (): Promise<void> => {
    console.log("Connecting!");
    const address: any = await HapticBluetooth.getPairedDevices();
    console.log(address["HC-06"]);
    const res: any = await HapticBluetooth.connectToExternalDevice(
      address["HC-06"]
    );

    const isConnected: boolean = await HapticBluetooth.isConnected();
    if (isConnected) {
      setConnected("Connected!");
      setConnectDisabled(true);
      setToggleDisabled(false);
    }

    console.log("Connected!");
  };
  // #endregion

  return (
    <View>
      <Text style={style} {...otherProps}>
        Haptic MetroBand Control Panel
      </Text>

      {/* <Button
        text={toggleStatus}
        style={[styles.button]}
        onPress={toggle}
        innerTextColor={colors.primaryContrast}
        isDisabled={toggleDisabled}
      ></Button> */}

      <Button
        text="Check Paired"
        style={styles.button}
        onPress={checkPaired}
        innerTextColor={colors.primaryContrast}
        isDisabled={false}
      ></Button>

      <Button
        text="Connect"
        style={styles.button}
        onPress={connect}
        innerTextColor={colors.primaryContrast}
        isDisabled={connectDisabled}
      ></Button>

      <Text style={style}>Time Signature:</Text>
      <TimeSignature
        parentBPMChange={handleBPMChange}
        parentQuarterNoteValueChange={handleQuarterNoteValueChange}
      />
      <TextInput
        placeholder="Tempo"
        style={styles.inputBox}
        keyboardType="numeric"
        onChangeText={(newTempo) => {
          setTempo(parseInt(newTempo));
        }}
      />

      <Text style={style}>{"Paired status (HC-06 found): " + isPaired}</Text>
      <Text style={style}>{"Connected status: " + isConnected}</Text>
      <Timer
        style={styles.button}
        bpm={bpm}
        quarterNoteValue={quarterNoteValue}
        tempo={tempo}
      />
    </View>
  );
}
