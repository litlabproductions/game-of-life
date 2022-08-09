## Conway's Game of Life
### a Cellular Automaton
#### Developed in 64-bit integer-space using C++ and Javascript
##### by David Guido<br>for Riot Games SE-B Interview

***

### Approach:
 * Because of size restrictions, use a vector of coordinate pairs (x,y) representing live cells. . 
 * Only consider cells for life next generation if they are:
   1. Currently alive
   2. Adjacent to an alive cell
 
<br>

### Versions:

1. **C++**
   * Location: [main.cpp](main.cpp)
   * Description:
      * Reads the state of the simulation from standard input
      * Runs 10 iterations (generations) of the Game of Life
      * Prints the results to standard output in Life 1.06 formatg
    * Notes:
      * Allows for the full range of 64-bit integer values to be used as coordinates<br>i.e. Between **-9,223,372,036,854,775,808** *and* **9,223,372,036,854,775,807** <br>
      
2. **Javascript**
   * Location: [p5.js Sketch](https://editor.p5js.org/davidmguido93/full/OZgcij1Ya)
   * Description:
      * Renders 1-30 Generations of the Game of Life to the screen by coloring a 11x11 cell grid 
      * Allows for user-defined: number of generations, simulation speed and choice of pattern
      * For each pattern, the grid is centered on the first (x, y) coordinate in the alive cell list
      * Provides the user with an option to "Log All Alive Cells" which will print the full list of alive cells to the console each generation. This is helpful to see how alive cells outside the scope of the grid are behaving
    * Notes:
      * Since javascript doesnt fully support 64-bit integers, coordinates with (x,y) values between -2,000,000,000,000,001 and 2,000,000,000,000,002 were used
      * This p5.js project is meant to act as a visual, showing how the gameOFLife() function handles small and very large (positive and negative) coordinate inputs similarly

<br><br>

#### Note: The following functions are shared by both versions. Since these functions share the same pseudocode, differences are in syntax only.
```cpp
vector<vector<int>> gameOfLife(vector<vector<int>> aliveCoords)
```

```cpp
vector<vector<int>> getNeighbors(vector<int> coord)
```
 
```cpp
vector<int> insertPair(int x, int y)
```
