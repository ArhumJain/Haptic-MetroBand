#include <SPI.h>
#include <nRF24L01.h>
#include <RF24.h>

#define MOTOR 3 // Is a PWM pin so we can adjust intensity of vib motor

unsigned long time;
unsigned long intervalAverage = 0;
unsigned long prevTime = 0;
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
  radio.setPALevel(RF24_PA_MIN);
  radio.startListening();
}

void loop() {
  radio.read(&powerReceived, sizeof(powerReceived));
  // Serial.println(powerReceived);

  if (powerReceived[0] == '2') {
    Serial.write("2 received\n");
    analogWrite(MOTOR, 255);
    if (prevTime == 0) {
      prevTime = time;
      count++;
    }
    else {
      intervalAverage += time - prevTime;        
      Serial.println(time-prevTime);           
      prevTime = time;
      count++;
    }
  }

  else if (powerReceived[0] == '1') {
    Serial.write("1 received\n");
    analogWrite(MOTOR, 75);
    intervalAverage += time - prevTime;
    Serial.println(time-prevTime);     
    prevTime = time;
    count++;
  }
  
  else if (powerReceived[0] == '0') {
    Serial.write("0 received\n");
    analogWrite(MOTOR, 0);  
  }
}