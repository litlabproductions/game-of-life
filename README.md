## Conway's Game of Life
### a Cellular Automaton
#### Developed in 64-bit integer-space using C++ and Javascript
##### by David Guido<br>for Riot Games SE-B Interview

***

<br>

### Versions:

1. **C++**
   * Location: [main.cpp](main.cpp)
   * Description:
      * Reads the state of the simulation from standard input
      * Runs 10 iterations (generations) of the Game of Life
      * Prints the results to standard output in Life 1.06 format
      <br><br>
2. **Javascript**
   * Location: [p5.js Sketch](https://editor.p5js.org/davidmguido93/full/OZgcij1Ya)
   * Description:
      * Renders 1-30 Generations of the Game of Life to the screen by coloring a 11x11 cell grid 
      * Allows for user-defined: number of generations, simulation speed and choice of pattern
      * For each pattern, the grid is centered on the first (x, y) coordinate in the alive cell list
      * Provides the user with an option to "Log All Alive Cells" which will print the full list of alive cells to the console each generation. This is helpful to see how alive cells outside the scope of the grid are behaving
