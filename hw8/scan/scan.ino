int first = 3;
int second = 4;
int third = 5;
int forth = 6;
int d = 500;
void setup() {
  // put your setup code here, to run once:
  pinMode(first, OUTPUT);
  pinMode(second, OUTPUT);
  pinMode(third, OUTPUT);
  pinMode(forth, OUTPUT);

}

void loop() {
  digitalWrite(first, HIGH);
  delay(d);
  digitalWrite(first, LOW);    
  digitalWrite(second, HIGH);
  delay(d);
  digitalWrite(second, LOW);  
  digitalWrite(third, HIGH);
  delay(d);
  digitalWrite(third, LOW);  
  digitalWrite(forth, HIGH);
  delay(d);
  digitalWrite(forth, LOW);  
 
}
