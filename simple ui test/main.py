from PyQt5.QtWidgets import QMainWindow, QApplication, QLabel, QPushButton
from PyQt5 import uic
import serial
import sys



class UI(QMainWindow):
    def __init__(self):
        super(UI, self).__init__()

        #Load ui
        uic.loadUi("./main.ui", self)
        self.show()

        self.onButton = self.findChild(QPushButton, "onButton")
        self.offButton = self.findChild(QPushButton, "offButton")

        self.onButton.clicked.connect(self.on)
        self.offButton.clicked.connect(self.off)

        self.ser = serial.Serial('COM8', baudrate = 9600, timeout=1)
        print("Connected!")
    def on(self):
        self.ser.write(b'1')
    def off(self):
        self.ser.write(b'0')
if __name__ == "__main__":
    app = QApplication(sys.argv)
    UIWindow = UI()
    app.exec_()

