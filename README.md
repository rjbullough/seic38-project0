# Connect 4

## The **least** enjoyable 2 player game since it's inception in 1974

## https://rjbullough.github.io/seic38-project0/

### Technologies used

This version of connect 4 uses javascript (and the JQuery plugin) to let 2 players alternatively place tokens on a 6 x 7 game board.

My approach behind the game logic was to -

1. Initialise an array of all possible token locations.
2. Call a function each time a player took a turn. This function was passed a 'column' number which correlates with an index inside each array item. Starting from the last array item (to simulate gravity) it would search for the first index that was a '0' - indicating that place hadn't been claimed.
3. Check if that move resulted in a win by checking the entire array for a match of 4 either vertically, horizontally or diagonally.

### Unsolved problems

I initially wanted to try and recursively search for a winning result but I couldn't get that to work.
