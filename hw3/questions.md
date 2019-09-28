# Answering questions for hw3 
1. What code draws the blades of grass?  
**line(x, height-10, x+random(-10, 10), height-10-random(h));**
2. What code makes the "lawnmower" come by? How often does it come by?  
**if (random(100) > 99.9)**
3. What's the point of the h variable?  
**Make sure that grass could grow higher as time goes on.**
4. What does the -10 do in the second and fourth arguments of the line function, height-10-random(h) ? Why is it there?  
**"height - 10"is the y coordinate of top of earth. "- 10" describe the height of the earth is 10;**