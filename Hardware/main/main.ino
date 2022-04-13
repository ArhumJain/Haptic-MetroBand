#define MOTOR 3 // Is a PWM pin so we can adjust intensity of vib motor

void setup() {
  // put your setup code here, to run once:
  pinMode(MOTOR, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly
  if (Serial.available()) {
    int val = Serial.read();
    if (val == '2') {
      analogWrite(MOTOR, 255);
      Serial.write("2 received");
    }
    else if (val == '1') {
      analogWrite(MOTOR, 75);
      Serial.write("1 received");
    }
    else if (val == '0') {
      analogWrite(MOTOR, 0);  
      Serial.write("0 received");
    }
  }
}
