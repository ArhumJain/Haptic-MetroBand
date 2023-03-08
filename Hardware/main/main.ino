#define MOTOR 3 // Is a PWM pin so we can adjust intensity of vib motor

unsigned long time;
unsigned long intervalAverage = 0;
unsigned long prevTime = 0;
const int testLength = 60;
int count = 0;
int powerReceived;

void setup() {
  // put your setup code here, to run once:
  pinMode(MOTOR, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly
  time = millis();
  if (Serial.available()) {
    powerReceived = Serial.read();
    if (powerReceived == '2') {
      analogWrite(MOTOR, 255);
      // Serial.write("2 received\n");
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

    else if (powerReceived == '1') {
      analogWrite(MOTOR, 75);
      // Serial.write("1 received\n");
      intervalAverage += time - prevTime;
      Serial.println(time-prevTime);     
      prevTime = time;
      count++;
    }
    
    else if (powerReceived == '0') {
      analogWrite(MOTOR, 0);  
      // Serial.write("0 received");
    }
  }
}
