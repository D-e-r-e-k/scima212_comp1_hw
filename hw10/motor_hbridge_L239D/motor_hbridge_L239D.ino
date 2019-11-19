#include <IRremote.h>

int RECV_PIN = 2;
IRrecv irrecv(RECV_PIN);
decode_results results;
int control;

int DH2 = 9;
int DH7 = 8;
int DH15 = 7;
int DH10 = 6;
int f = 100;
char rxChar =' ';

void setup() {
  Serial.begin(9600);

  Serial.println("Startup");
  irrecv.enableIRIn();
  
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

  if (irrecv.decode(&results)) {
    Serial.println(results.value);
    //14482 28677 : up arrow
    //20058 -24579 : enter
    //19891 7758 : down arrow
    //-3365 8684 : left
    //-31984 5549 : right


    control = results.value;
    Serial.print("control: ");
    Serial.println(control);

    switch(control) {
      case 14482:
      case 28677:
        forward();
        delay(f);
        kill();
        break;
      case 20058:
      case -24579:
        kill();
        break;
      case 19891:
      case 7758:
        backward();
        delay(f);
        kill();
        break;
      case -3365:
      case 8684:
        turnleft();
        delay(f);
        kill();
        break;
      case -31984:
      case 5549:
        turnright();
        delay(f);
        kill();
        break; 
    }

    irrecv.resume();
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
