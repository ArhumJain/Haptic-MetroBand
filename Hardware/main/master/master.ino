#include <SPI.h>
#include <nRF24L01.h>
#include <RF24.h>

RF24 radio(7, 8); // CE, CSN

const byte address[6] = "00001";
const char powerSignals[3] = {'0', '1', '2'};
int data;

bool running = true;
int counter = 0;
int tempo;

unsigned long previousMillis = 0;
unsigned long previousSeparationMillis = 0;

int interval = 250;
void setup() {
  Serial.begin(9600);
  radio.begin();
  radio.openWritingPipe(address);
  radio.setPALevel(RF24_PA_MIN);
  radio.stopListening();
}

void loop() {
  // if (Serial.available()) {
  //   data = Serial.read();
  //   if (data == 0) {
  //     running = false;
  //     radio.write(&powerSignals, sizeof(char));
  //   } else {
  //     running = true;
  //     interval = data;
  //   }
  // }
//  Serial.println(radio.available());
  if (running) {
    // When beat happens
    if (millis() - previousMillis >= interval) {
      previousSeparationMillis = millis();
      if (counter != 3) {
        radio.write(powerSignals+1, sizeof(char));
//        Serial.println("writing 1");
        counter++;
      } else {
        radio.write(powerSignals+2, sizeof(char));
//        Serial.println("writing 2");
        counter = 0;
      }
      previousMillis = millis();
    }
    if (millis() - previousSeparationMillis >= 100) {
      radio.write(powerSignals, sizeof(char));
//      Serial.println("writing 0");
    }
  }
}
