import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {Text, Button, View, StyleSheet, Pressable} from 'react-native';

export default function App(): JSX.Element {

  const on = (): void => {

  }

  const off = (): void => {
    
  }

  return (
    <View style={styles.container}>

      <Pressable style={styles.button} onPress={on}>
        <Text>On</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={off}>
        <Text>Off</Text>
      </Pressable>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E3440',
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  button: {
    backgroundColor: '#A2A3BB',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 4,
    elevation: 3,
  }
});
