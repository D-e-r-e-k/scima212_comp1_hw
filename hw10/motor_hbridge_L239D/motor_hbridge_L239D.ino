int DH2 = 9;
int DH7 = 8;
int DH15 = 7;
int DH10 = 6;
char rxChar =' ';

void setup() {
  Serial.begin(9600);
  Serial.flush();
  
  pinMode(DH2, OUTPUT);
  pinMode(DH7, OUTPUT);
  pinMode(DH15, OUTPUT);
  pinMode(DH10, OUTPUT);
  

}

//7 & 15 high : forward
//s for star t for terminate
void loop() {
  // put your main code here, to run repeatedly:
  //digitalWrite(DH7, HIGH);
  //digitalWrite(DH15, HIGH);
  //forward();
  if (Serial.available() >0){          
    rxChar = Serial.read();             
    Serial.flush();  
  } 
  if(rxChar == 'w') {
    forward();              
  } else if(rxChar == 'a') {
    turnleft();
  } else if(rxChar == 's') {
    backward();
  } else if(rxChar == 'd') {
    turnright();
  } else if(rxChar == 'k') {
    kill();
  }
}

void forward() {
    digitalWrite(DH2, LOW);
    digitalWrite(DH7, HIGH);
    digitalWrite(DH10, LOW);
    digitalWrite(DH15, HIGH); 
}

void kill() {
    digitalWrite(DH2, LOW);
    digitalWrite(DH7, LOW);
    digitalWrite(DH10, LOW);
    digitalWrite(DH15, LOW); 
}

void backward() {
    digitalWrite(DH2, HIGH);
    digitalWrite(DH7, LOW);
    digitalWrite(DH10, HIGH);
    digitalWrite(DH15, LOW); 
}
 
void turnleft() {
    digitalWrite(DH2, LOW);
    digitalWrite(DH7, HIGH);
    digitalWrite(DH10, HIGH);
    digitalWrite(DH15, LOW); 
}

void turnright() {
    digitalWrite(DH2, HIGH);
    digitalWrite(DH7, LOW);
    digitalWrite(DH10, LOW);
    digitalWrite(DH15, HIGH); 
}
