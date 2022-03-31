import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import BleManager from 'react-native-ble-manager';

export default function App() {
  const clicky = () => {
    // BleManager.s
  }

  BleManager.start({ showAlert: false }).then(() => {
  // Success code
    console.log("Module initialized");
  }).catch(() => {
    console.log("ded")
  });
  console.log("hi");
  return (
    <View style={styles.container}>
      
      <Text>Open up App.tsx to start working on your app!</Text>
      <Button title="Hi click me plz ill give u moneys" onPress={clicky} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
