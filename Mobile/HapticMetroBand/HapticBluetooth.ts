import { NativeModules } from "react-native";
const { HapticBluetooth } = NativeModules;

interface HapticBluetoothInterface {
    isBluetoothEnabled(): Promise<boolean>;
    getPairedDevices(): Promise<object>;
    connectToExternalDevice(deviceMAC: string): Promise<boolean>
    isConnected(): Promise<boolean>;
    writeToRemote(data: string): void;
    disconnect(): void;
}

export default HapticBluetooth as HapticBluetoothInterface;