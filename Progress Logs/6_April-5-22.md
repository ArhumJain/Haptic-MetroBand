### Entry 6: 04/5/2022

- Base HapticBluetooth native module created
  - Android complete
  - iOS? TBD. depending on access to Apple device
  - Current Functionality includes:
    - Ability to connect to remote BT device
    - Write data to remote BT device 
    - Helper functions such as `getPairedDevices` and `isConnected`, etc.
  - Future functionality depending on necessity
    - Read incoming data from remote BT device
    - Sending data stream
  - Eventual but Necessary TODO:
    - Visual pop ups on bottom of screen for common errors such as: Device not found, Unable to connect, etc.
    - Intents to ask user to enable Bluetooth in case of BT being disabled
    - Handling no BT support
- Addition of small UI elements and usage of states for quality of life improvements (Disabled buttons, status displays)


*Refer to https://developer.android.com/guide/topics/connectivity/bluetooth for help and debugging*
