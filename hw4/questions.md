# Answering questions from hw4
## Part 1:
1. How many lines are drawn each frame? In other words, how often does the for loop run?  
**All the lines are drawn onece per every frame. So 38 lines in total.**  
2. What do the first, second, and third appearances of the number 10 do in the code?  
**The first "10" is the x coordinate of the starting point, it's 10px from the left boundary. The secound "10" is found in "width-10" which evaluates to 390. That's the upper bound limit of x coordinates of the lines, which could not be reached. It explained why there're only 38 lines. The third "10" is the increament for x coordinate of the lines. It defines the gap between adjacent lines.**
## Part 2:
1. How many times does the loop body run each frame, once the x and y arrays are full?  
**5 times.**
2. What are two ways of increasing the spacing between rings?  
**Increase increament of i on line 15, or decrease frame rate.**
3. How can you make the ellipse trail longer?  
**Increase array size of x and y at line 21 and 22 pespectively.**