package com.hapticmetroband;

import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothSocket;
import android.util.Log;

import java.io.IOException;
import java.util.UUID;

public class ConnectThread extends Thread {
    private final BluetoothSocket socket;
    private final BluetoothDevice device;

    public ConnectThread(BluetoothDevice device, UUID DEVICE_UUID) {
        BluetoothSocket tmp = null;
        this.device = device;

        try {
            tmp = device.createRfcommSocketToServiceRecord(DEVICE_UUID);
        } catch (IOException e) {
            Log.e("ConnectThread", "Socket's create() method failed", e);
        }
        this.socket = tmp;
    }

    public void run() {
        try {
            socket.connect();
        } catch (IOException connectException) {
            try {
                socket.close();
            } catch (IOException closeException) {
                Log.e("ConnectThread", "Could not close the client socket", closeException);
            }
            return;
            }
    }

    public void cancel() {
        try {
            this.socket.close();
        } catch (IOException e) {
            Log.e("ConnectThread", "Could not close the client socket", e);
        }
    }
}
