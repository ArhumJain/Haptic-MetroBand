package com.hapticmetroband;


import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothSocket;
import android.os.Handler;
import android.util.Log;


import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.util.Set;
import java.util.UUID;

public class HapticBluetooth extends ReactContextBaseJavaModule {
    private enum ConnectionConstants {
        NONE,
        LISTEN,
        CONNECTING,
        CONNECTED;
        static int READ = 0;
        static int WRITE = 1;
    }

    private Handler handler;
    private BluetoothAdapter bluetoothAdapter;
    private ConnectThread connectThread;
    private ConnectedThread connectedThread;

    private ConnectionConstants state;


    HapticBluetooth(ReactApplicationContext context) {
        super(context);
        bluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
        state = ConnectionConstants.NONE;
        if (bluetoothAdapter == null) {
            Log.d("HapticBluetooth", "This device does not support bluetooth :(");
        }
    }

    @Override
    public String getName() {
        return "HapticBluetooth";
    }

    @ReactMethod
    public void isBluetoothEnabled(Promise promise) {
        boolean enabled = bluetoothAdapter.isEnabled();
        promise.resolve(enabled);
    }

    @ReactMethod
    public void getPairedDevices(Promise promise) {
        Set<BluetoothDevice> pairedDevices = bluetoothAdapter.getBondedDevices();
        WritableMap pairedDevicesReturn = new WritableNativeMap();
        if (pairedDevices.size() > 0) {
            for (BluetoothDevice device : pairedDevices) {
                pairedDevicesReturn.putString(device.getName(), device.getAddress());
            }
        }
        promise.resolve(pairedDevicesReturn);
    }

    @ReactMethod
    public void connectToExternalDevice(String mac, Promise promise) {
        Log.d("HapticBluetooth", mac);
        BluetoothDevice device = bluetoothAdapter.getRemoteDevice(mac);
        if (state == ConnectionConstants.CONNECTING) {
            if (connectThread != null) {
                connectThread.cancel();
                connectThread = null;
            }
        }

        if (connectedThread != null) {
            connectedThread.cancel();
            connectedThread = null;
        }

        connectThread = new ConnectThread(mac, promise);
        connectThread.start();
    }

    @ReactMethod
    public void isConnected(Promise promise) {
        if (state == ConnectionConstants.CONNECTED) {
            promise.resolve(true);
        } else {
            promise.resolve(false);
        }
    }

    @ReactMethod
    public void writeToRemote(String s) {
        if (state == ConnectionConstants.CONNECTED) {
            ConnectedThread r;
            synchronized (this) {
                if (state != ConnectionConstants.CONNECTED) Log.e("HapticBluetooth", "Not connected to a device");
                r = connectedThread;
            }
            r.write(s.getBytes(StandardCharsets.UTF_8));
        }
    }

    private void connected(BluetoothSocket socket, BluetoothDevice device, Promise promise) {
        if (connectThread != null) {
            connectThread.cancel();
            connectThread = null;
        }

        if (connectedThread != null) {
            connectedThread.cancel();
            connectedThread = null;
        }

        connectedThread = new ConnectedThread(socket, promise);
        connectedThread.start();
    }

    @ReactMethod
    private void disconnect(){
        if (connectedThread != null) {
            connectedThread.cancel();
            connectedThread = null;
        }
        if (connectThread != null) {
            connectThread.cancel();
            connectThread = null;
        }
    }
    private class ConnectThread extends Thread {
        private final BluetoothSocket socket;
        private final BluetoothDevice device;
        private final Promise connectedPromise;
        public ConnectThread(String mac, Promise promise) {
            connectedPromise = promise;
            device = bluetoothAdapter.getRemoteDevice(mac);
            BluetoothSocket tmp = null;

            try {
                tmp = device.createRfcommSocketToServiceRecord(UUID.fromString("00001101-0000-1000-8000-00805F9B34FB"));
            } catch (IOException e) {
                Log.e("HapticBluetooth", "Socket's create() method failed", e);
            }
            socket = tmp;
            state = ConnectionConstants.CONNECTING;
        }

        @Override
        public void run() {
            bluetoothAdapter.cancelDiscovery();
            setName("ConnectThread");

            try {
                socket.connect();
            } catch (IOException connectException) {
                try {
                    socket.close();
                } catch (IOException closeException) {
                    Log.e("HapticBluetooth", "Could not close the client socket", closeException);
                }
                return;
            }

            synchronized (HapticBluetooth.this) {
                connectThread = null;
            }

            connected(socket, device, connectedPromise);
        }

        public void cancel() {
            try {
                socket.close();
            } catch (IOException e) {
                Log.e("HapticBluetooth", "Could not close the client socket", e);
            }
        }
    }

    private class ConnectedThread extends Thread {
        private final BluetoothSocket socket;
        private final InputStream inStream;
        private final OutputStream outStream;
        private final Promise connectedPromise;
        private byte[] buffer;

        public ConnectedThread(BluetoothSocket socket, Promise promise) {
            connectedPromise = promise;
            InputStream tmpIn = null;
            OutputStream tmpOut = null;

            this.socket = socket;

            try {
                tmpIn = socket.getInputStream();
            } catch (IOException e) {
                Log.e("HapticBluetooth", "Error occurred when creating input stream", e);
                connectedPromise.resolve(false);
            }

            try {
                tmpOut = socket.getOutputStream();
            } catch (IOException e) {
                Log.e("HapticBluetooth", "Error occurred when creating output stream", e);
                connectedPromise.resolve(false);
            }

            inStream = tmpIn;
            outStream = tmpOut;
            state = ConnectionConstants.CONNECTED;
            connectedPromise.resolve(true);
        }

        @Override
        public void run() {
            buffer = new byte[1024];
            int bytes;
            while (state == ConnectionConstants.CONNECTED) {
                try {
                    bytes = inStream.read(buffer);
                } catch (IOException e) {
                    Log.e("HapticBluetooth", "disconnected", e);
                    break;
                }
            }
        }

        public void write(byte[] buffer) {
            try {
                outStream.write(buffer);
            } catch (IOException e) {
                Log.e("HapticBLuetooth", "Exception during write", e);
            }
        }

        public void cancel() {
            try {
                socket.close();
            } catch (IOException e) {
                Log.e("HapticBluetooth", "close() of connect socket failed", e);
            }
        }
    }
}
