int led_pin = 13;
int button_pin = 4;
int switch_pin = 5;
int pot_pin = A1;

void setup() {
  // put your setup code here, to run once:
  pinMode(led_pin, OUTPUT);
  pinMode(button_pin, INPUT_PULLUP);
  pinMode(switch_pin, INPUT_PULLUP);
  pinMode(pot_pin, INPUT);
  Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
//  int button_stat = digitalRead(button_pin);
//  int switch_stat = digitalRead(switch_pin);
//  int pressed;
//  int released;
//  
//  if(switch_stat == LOW){
//    pressed = LOW; 
//    released = HIGH;
//  } else {
//    pressed = HIGH;
//    released = LOW;
//  }
//  
//  if(button_stat == LOW) {
//    //Serial.println("button_pressed");
//    digitalWrite(led_pin, pressed);
//  } else {
//    //Serial.println("not_pressed");
//    digitalWrite(led_pin, released);
//  }

  int ana_read = analogRead(pot_pin);
  Serial.print("0 1023 ");
  Serial.println(ana_read);
  
  
  if(ana_read >= 600) {
    digitalWrite(led_pin, HIGH);
  } else {
    digitalWrite(led_pin, LOW);
  }
}
