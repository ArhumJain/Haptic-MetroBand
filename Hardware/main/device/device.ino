#include <SPI.h>
#include <nRF24L01.h>
#include <RF24.h>

#define MOTOR 3 // Is a PWM pin so we can adjust intensity of vib motor

unsigned long currTime;
unsigned long prevTime = 0;
int currPower = 0;
int prevPower = 0;
const int testLength = 60;
int count = 0;

char powerReceived[32] = "";

RF24 radio(7, 8); // CE, CSN
const byte address[6] = "00001";

void setup() {
  // put your setup code here, to run once:
  pinMode(MOTOR, OUTPUT);
  Serial.begin(9600);
  radio.begin();
  radio.openReadingPipe(0, address);
  radio.setPALevel(RF24_PA_MAX);
  radio.startListening();
}

void loop() {
  if (radio.available()) {
    radio.read(&powerReceived, sizeof(powerReceived));
  }
//  Serial.println(radio.available());
  if (currPower != 0 && prevPower == 0) {
    currTime = millis();
    Serial.println(currTime - prevTime);
    prevTime = currTime;
  }
  if (powerReceived[0] == '2') {
    prevPower = currPower;
    currPower = 2;
    // Serial.write("2 received\n");
    analogWrite(MOTOR, 255);
//    currTime = millis();
//    Serial.println(currTime - prevTime);
//    prevTime = currTime;
  }

  else if (powerReceived[0] == '1') {
    prevPower = currPower;
    currPower = 1;
    // Serial.write1 received\n");
    analogWrite(MOTOR, 75);
//    currTime = millis();
//    Serial.println(currTime - prevTime);
//    prevTime = currTime;
  }
  
  else if (powerReceived[0] == '0') {
    // Serial.write("0 received\n");
    prevPower = currPower;
    currPower = 0;
    analogWrite(MOTOR, 0);  
  }
}
