# HeadOut

A Break Out inspired gesture control game.

## Summary

The goal of Head Out is simply breaking all the blocks, just like the original Break Out game. I explored the opportunity of facial recognition and give players control over the angle of the plate. The analog between head movement and plate control is very intuitive. However, the addition of changing angle change the whole dynamic of the game. Gesture control is naturally more subtle and less responsive than analog or keypad control and fits better with a slower-paced game.

The mechanism of Head Out is designed to push the concept of slower pace and subtle control. The game is not speeding up to give players more time to fine control the angle of the plate. There is one life instead of three to encourage players to be more careful. The scoring system is tuned to emphasize more on the strategic aspect of the game instead of pure reacting speed.

## Component Parts

index.html: Structure of the layout of the game
style.css:  Appearance of the page
headout.js: The main script
clmtrackr.js:   A facial recognition model I found by auduno
vector_support.js:  Some helper functions I wrote to do vector operations
Press_Start_2P: Font for ui

## Timeline

What did you do in each of the past four weeks?

- Week 1: Write Proposal, look for good facial recognition models.
- Week 2: Read documentations and run examples and tests.
- Week 3: Write my code and this README file.
- Week 4: Present!
 
## Challenges

Everything is challenging from the very beginning. Due to the implementation of the model, it's blocked by chrome for some security policies. I need some basic knowledge about browsers and servers to run my script to test it. I use p5 with the model that's not designed to work with p5, there are some conflicts that I need to take care of. The collision detection for a tilted plate and reflection angle need some time to figure out. Finally the biggest challenge is the tight time frame of the project. I spend every minute I could but can only manage to write a quick and dirty implementation of my idea.

## Completed Work

Play here:
https://d-e-r-e-k.github.io/scima212_comp1_hw/final/index.html

## References and links

The facial recognize model I used:
https://github.com/auduno/clmtrackr

Github Pages that I put my script on:
https://pages.github.com/

And P5 references:
https://p5js.org/reference/