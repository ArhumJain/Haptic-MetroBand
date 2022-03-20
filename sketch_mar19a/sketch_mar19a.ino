serivoid setup() {
  // put your setup code here, to run once:
  pinMode(4, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly
  if (Serial.available()) {
    int val = Serial.read();
    if (val == '1') {
      digitalWrite(4, HIGH);
      Serial.write("1 received");
    }
    else if (val == '0') {
      digitalWrite(4, LOW);  
      Serial.write("0 received");
    }
  }
}
