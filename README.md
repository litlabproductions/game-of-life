# Conway's Game of Life
### a Cellular Automaton
#### Developed in 64-bit integer-space using C++ and Javascript<br><br>
##### by David Guido<br>for Riot Games SE-B Interview

***

## Table of contents
- [Rules](#rules)
- [Approach](#approach)
- [Versions](#versions)
  - [Cpp](#cpp)
  - [Javascript](#javascript)

***

## Rules
* If an *alive* cell had less than **2** or more than **3** alive neighbors (in any of the 8 surrounding cells), it becomes *dead*
* If a *dead* cell had exactly 3 alive neighbors, it becomes *alive*

***

## Approach
 * Because of size restrictions, use a vector of coordinate pairs (x,y) representing live cells
 * Only consider cells for life next generation if they are:
   1. Currently alive
   2. Adjacent to an alive cell
 
***

## Versions

### Cpp
   * Location: This Repository
   * Link: [GameOfLife.cpp](GameOfLife.cpp)
   * Description:
      * Reads the state of the simulation from standard input
      * Runs 10 iterations (generations) of the Game of Life
      * Prints the results to standard output in Life 1.06 format
    * Notes:
      * Allows for the full range of 64-bit integer values to be used as coordinates<br>i.e. Between **-9,223,372,036,854,775,808** *and* **9,223,372,036,854,775,807** 
      <br><br><img src="https://user-images.githubusercontent.com/34845402/183555785-e2631a78-786f-4224-8c97-dd1acfebb8ad.png" data-canonical-src="https://user-images.githubusercontent.com/34845402/183555785-e2631a78-786f-4224-8c97-dd1acfebb8ad.png" height="400" />&nbsp;&nbsp;<img src="https://user-images.githubusercontent.com/34845402/183555788-31f3ef4b-f9ce-4941-8c1a-5b37043b9af0.png" data-canonical-src="https://user-images.githubusercontent.com/34845402/183555788-31f3ef4b-f9ce-4941-8c1a-5b37043b9af0.png" height="400" />
      * A Blinker Oscillator with coordinate values very close to the minimum value allowed in 64 bit integer space
<br>

      
### Javascript
   * Location: p5.js
   * Link: 
      * Editor: [https://editor.p5js.org/davidmguido93/sketches/quXf_y6lt](https://editor.p5js.org/davidmguido93/sketches/quXf_y6lt)
      * Fullscreen: [https://editor.p5js.org/davidmguido93/full/OZgcij1Ya](https://editor.p5js.org/davidmguido93/full/quXf_y6lt)
   * Description:
      * Renders 1-30 Generations of the Game of Life to the screen
      * Each generation, alive cells within the 23x23 cell grid are colored green
      * Allows for user-defined: Number of generations, simulation speed and pattern
      * For each pattern, the grid is centered on the first (x, y) coordinate in the alive cell list
      * Provides the user with an option to "Log All Alive Cells" which prints the full list of alive cells to the console each generation. This is helpful to see how alive cells outside the scope of the grid are behaving 
   * Notes:
      * Since javascript doesnt fully support 64-bit integers, coordinates with (x,y) values between **-2,000,000,000,000,011** *and* **2,000,000,000,000,012** were used
      * This p5.js project is meant to act as a visual, showing examples of how the gameOfLife() function handles small and very large (positive and negative) coordinate inputs similarly through a variety of different patterns <br><br>
![output03](https://user-images.githubusercontent.com/34845402/183557671-d4749f28-8754-4f25-b978-d2b5102e82fa.gif)

<br>

#### Note: The following functions are shared by both versions. Since these functions share the same pseudocode, differences are in syntax only.
```cpp
// Calculates one iteration (generation) of Conway's Game of Life
vector<vector<int>> gameOfLife(vector<vector<int>> aliveCoords);
```

```cpp
// Helper function. Retrieves a cells adjacent neighbors.
vector<vector<int>> getNeighbors(vector<int> coord);
```
 
```cpp
// Helper function. Inserts two 64-bit integer coordinates into a vector.
vector<int> insertPair(int x, int y);
```

<br>

***

<br>

<br/>
Thanks for reading!<br><br>For more information on Conway's Game of Life visit:<br>

[The Game of Life Wiki](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)

<br/><br/>
