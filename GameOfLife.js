/*
	Conway's Game of Life
	* A Cellular Automaton
	
	* Designed and Developed by David Guido
	  For Riot Games SE-B Interview
*/

// Width and height of each cell
let w, h;

// Left padding value, cell adjustment value, current gen, alive cell list
let leftIndent, buffer, generation, aliveCells;

// Upper/lower X range, Upper/lower Y range
let topXRange, topYRange, botXRange, botYRange;

// U.I. Elements
let dropDown, dropDownVal, genSlider, genSliderVal;
let speedSlider, speedSliderVal, logBox, startBtn; 

// Initial setup. Always called once when program starts.
function setup() 
{ 
  initializeUI();
  restartSketch();
}

// Initialize user interface. Called once from setup() when program starts.
function initializeUI()
{
  createCanvas(1200, 800);
  var cols = 22;   // Number of columns - 1
  var rows = 22;   // Number of rows - 1
  
  w = (width - 600) / cols;     // Calculate cell width and height based on
  h = (height - 200) / rows;    // canvas size and number of rows & columns
  
  // Generation slider initialization
  genSlider = createSlider(1, 30, 10, 1);
  genSlider.style('width', '160px');
  genSliderVal = genSlider.value();
  
  // Simulation speed slider initialization
  speedSlider = createSlider(1, 9, 5, 1);
  speedSlider.style('width', '160px');
  speedSliderVal = speedSlider.value();
  
  // Drop down initialization
  dropDown = createSelect();
  dropDown.option('Glider w/ Large (+) Coordinates');
  dropDown.option('Beacon w/ Large (-) Coordinates');
  dropDown.option('Glider (Prompt Sample Input)');
  dropDown.option('Beacon Oscillator');
  dropDown.option('Blinker');
  dropDown.option('Lightweight Spaceship');
  dropDown.option('Toad');
  dropDown.option('Pulsar');
  dropDownVal = dropDown.value();
  dropDown.changed(changeDropDownVal);  

  // "Log all alive cells" toggle initialization
  logBox = createCheckbox(' Log All Alive Cells', false);
  logBox.style('font-size', '14px');
  
  // Start simulation button initialization
  startBtn = createButton('Start Simulation');
  startBtn.mousePressed(restartSketch);
  startBtn.style('font-size', '20px');
  
}

// Reset various variables to prepare for a new animation. 
// Called everytime the start simulation button is pressed.
function restartSketch()
{  
  background ('white');
  
  generation = 0;                      // Reset current generation count to 0
  aliveCells = getStartingState();     // Set alive cells list to initial state, based on drop down value
  
  botXRange = aliveCells[0][0] - 11;   // Calculate our lower and upper (x,y) values
  botYRange = aliveCells[0][1] - 11;  
  topXRange = aliveCells[0][0] + 11;
  topYRange = aliveCells[0][1] + 11;

  // Value used for adjusting our (x,y) coords to the grid between (0,0) and (22,22)
  buffer = [11 - aliveCells[0][0], 11 - aliveCells[0][1]];   

  
  // Add padding equal to 3 x (num digits in upper x value)
  leftIndent = topYRange.toString().length * 3;
  
  colorAliveCells();   // Render initial alive cells
  generation++;        // Increment the current generation count to 1
  updateUI();          // Update user interface position
  
  // Call render animation for 1-30 generations at a pre-defined simulation speed based on sliders
  setTimeout(renderAnimation, 75 / speedSliderVal);
}

// Render one generation of the Game of Life to the grid.
function renderAnimation()
{
  drawGrid();                             // Draw grid
  aliveCells = gameOfLife(aliveCells);    // Get new generation of the Game of Life
  colorAliveCells();                      // Render current gen. alive cells

  generation++;                           // Increment the current generation
  
  // Call this function again for 0-29 more generations based on sliders
  if (generation < genSliderVal + 1)
    setTimeout(renderAnimation,  75 / speedSliderVal);
}

// Draw all text to the screen. Reposition U.I. based on left indent.
function updateUI()
{
  drawText();
  
  genSlider.position(845 + leftIndent, 268);
  speedSlider.position(845 + leftIndent, 333);
  startBtn.position(849 + leftIndent, 476);
  dropDown.position(815 + leftIndent, 400);
  logBox.position(855 + leftIndent, 440);
}

// Update slider text values if and only if the values have changed since last call.
// i.e. The slider was moved. Called up to 60x per second.
function draw() 
{
  // Update generations slider text value
  var genValue = genSlider.value();
    
  if (genValue != genSliderVal)   /// Only run if value has changed
  {
    genSliderVal = genValue;
    
    fill('white');
    strokeWeight(0);
    rect(1000 + leftIndent, 245, 20, 20);
  
    genSliderVal = genSlider.value();
  
    fill('black');
    textSize(15);
    text((genSliderVal), 1010 + leftIndent, 260);
    strokeWeight(1);
  }
  
  // Update simulation speed slider text value
  var speedVal = speedSlider.value();
    
  if (speedVal != speedSliderVal)   // Only run if value has changed
  {
    speedSliderVal = speedVal;
    
    fill('white');
    strokeWeight(0);
    rect(980 + leftIndent, 310, 20, 20);
  
    speedSliderVal = speedSlider.value();
  
    fill('black');
    textSize(15);
    text((speedSliderVal), 990 + leftIndent, 325);
    strokeWeight(1);
  }
}

// Draw (23x23) grid to the screen.
function drawGrid()
{
  fill('white');
  
  for (let x = 0; x < width-600; x += w)
    for (let y = 0; y < height-200; y += h)
        rect(x, y, w, h);
}

// Color all cells in the aliveCells list green. If the log toggle is checked, log all alive coordinates to the console.
function colorAliveCells()
{
  for (var p = 0; p < aliveCells.length; p++)
  {
    if (logBox.checked())
    {
      var msg = "[Generation " + generation + "]:  " + "(" + aliveCells[p][0] + ", " + aliveCells[p][1] + ")";
      console.log(msg);
    }
    if(aliveCells[p][0]  < topXRange +1 && aliveCells[p][1] < topYRange +1 && aliveCells[p][0] > botXRange && aliveCells[p][1] > botYRange)
      colorCell(aliveCells[p][0] + buffer[0],aliveCells[p][1] + buffer[1], 'green');       
  }
  if (logBox.checked())
    console.log('\n');
}

// Color a cell at position (x, y) with a color defined in 'color'.
function colorCell(x, y, color)
{
  fill(color);

  rect(x*w, y*h, w, h);  // Draw the cell
}

// Draw all text to the screen.
function drawText()
{
  drawLineNumbers();

  textAlign(CENTER);
  textSize(26);
  fill('black');
  text('Conway' + "'" + 's Game of Life', 925 + leftIndent, 125);
  
  textSize(18);
  textStyle(ITALIC);
  text('A Cellular Automaton', 925 + leftIndent, 158);
  //text('Riot Games SE-B Interview', 725, 150);
  
  textStyle(NORMAL);
  textSize(15);
  text('Number of Generations: ', 915 + leftIndent, 260);
  text('Simulation Speed: ', 918 + leftIndent, 325);
  text('Pattern: ', 925 + leftIndent, 391);
  
  text((genSliderVal), 1010 + leftIndent, 260);
  text((speedSliderVal), 990 + leftIndent, 325);
  
  textSize(13);
  text('Note: For each pattern, the grid is centered on\nthe first (x, y) coordinate in the alive cell list.\nSome cells might not fit on the grid!\n\nChoose "Log All Alive Cells" to print\nthe full list of alive cells to the console\n  each generation (Effects performance)', 925 + leftIndent, 575);
  
  textStyle(ITALIC);
  textSize(14);
  text('Designed and developed by David Guido\nfor Riot Games SE-B Interview', 925 + leftIndent, 745);
  textStyle(NORMAL);
}

// Draw all line numbers to the screen.
function drawLineNumbers()
{
    var padding = 10;
    textAlign(LEFT);
    textSize(12);
    fill('black');
  
    // Horizonal numbers (Col numbers)
    for (let i = botXRange, p = 0; i < topXRange + 1; i++, p++)
    {
      push();
      let angle1 = radians(90);
      translate(padding + (27.3*p), 646);
      rotate(angle1);
      text(i, 0, 0);
      pop();
    }
  
    // Vertical numbers (Row numbers)
    for (let i = botYRange, p = 0; i < topYRange + 1; i++, p++)
      text(i, 638, (27.3*p) + 20);
}

// Returns a list of coordinates based on the pattern drop down value.
function getStartingState()
{
  if (dropDownVal == 'Glider w/ Large (+) Coordinates')
    return [[2000000000000000,2000000000000001],[2000000000000001,2000000000000002],[2000000000000002,2000000000000000],[2000000000000002,2000000000000001],[2000000000000002,2000000000000002]];
  else if (dropDownVal == 'Beacon w/ Large (-) Coordinates')
    return [[-2000000000000000,-2000000000000000],[-2000000000000000,-1999999999999999],[-1999999999999999,-2000000000000000],[-1999999999999998,-1999999999999997],[-1999999999999997,-1999999999999997],[-1999999999999997,-1999999999999998]];
  else if (dropDownVal == 'Glider (Prompt Sample Input)')
      return [[0,1],[1,2],[2,0],[2,1],[2,2],[-2000000000000000,-2000000000000000],[-2000000000001,-2000000000001]];
  else if (dropDownVal == 'Beacon Oscillator')
    return [[1,1],[1,2],[2,1],[3,4],[4,4],[4,3]];
  else if (dropDownVal == 'Blinker')
    return [[3,2],[3,3],[3,4]];
  else if (dropDownVal == 'Lightweight Spaceship')
    return [[1,1],[2,1],[3,1],[4,1],[4,2],[4,3], [3,4],[0,4],[0,2]];
  else if (dropDownVal == 'Toad')
    return [[1,0],[2,0],[3,0],[0,1],[1,1],[2,1]];
  else if (dropDownVal == 'Pulsar')
    return [[1,2],[-6,-4],[-6,-3],[-6,-2],[-6,2],[-6,3],[-6,4],[-4,6],[-3,6],[-2,6],[-4,1],[-3,1],[-2,1],[-4,-1],[-3,-1],[-2,-1],[-4,-6],[-3,-6],[-2,-6],[-1,2],[-1,3],[-1,4],[-1,-2],[-1,-3],[-1,-4],[1,-4],[1,-3],[1,-2],[1,3],[1,4],[2,-6],[3,-6],[4,-6],[2,-1],[3,-1],[4,-1],[2,1],[3,1],[4,1],[2,6],[3,6],[4,6],[6,-4],[6,-3],[6,-2],[6,2],[6,3],[6,4]];
}

// Sets dropDownVal to the new pattern drop down value.
function changeDropDownVal()
{
  dropDownVal = dropDown.value();
}

/*
	Description: Calculates one iteration (generation) of Conway's Game of Life.
		 Params: Vector of vectors containing the current game state as alive coordinates.
		Returns: Vector of vectors containing the next game state as alive coordinates.
*/
function gameOfLife(aliveCoords)
{
  var nxtGenCoords = [];       // List to store the next generation of the Game of Life
  var checkedNeighbors = [];   // List of dead neighbors already considered for life this generation 
  
  for (let i = 0; i < aliveCoords.length; i++)   // Loop through the list of alive coordinates
  {
    
    // Store the current alive cells 9 adjacent neighbors in a neighbors list
    var neighbors = getNeighbors(aliveCoords[i]);
    
    var aliveSum = 0;   // Number of alive neighbors adjacent to the current alive cell
    
    for (let j = 0; j < neighbors.length; j++)   // Loop through the current alive cells 9 adjacent neighbors
	{
      var isAlive = false;          // Is the current neighbor being evaluated alive
      var checkedThisGen = false;   // Has the current neighbor already been considered for life this generation
      
      for (let q = 0; q < aliveCoords.length; q++)   // Loop through the alive coordinates list
      {
        // If the alive coordinates list contains the current neighbor
        if (neighbors[j][0] == aliveCoords[q][0] && neighbors[j][1] == aliveCoords[q][1])
        {
		  isAlive = true;   // Set the current neighbors state to alive
		  aliveSum++;       // Increment the number of alive neighbors adjacent to the current alive cell 
		  break;            // Step out of this for loop
		}
      }
      
      // Loop through the "checked this generation" list
	  for (let z = 0; z < checkedNeighbors.length; z++)
      {
        
        // If the "checked this generation" list contains the current neighbor
	    if (neighbors[j][0] == checkedNeighbors[z][0] && neighbors[j][1] == checkedNeighbors[z][1])
		{
	        checkedThisGen = true;    // The current neighbor has already been considered for life this generation
			break;                    // Step out of this for loop
		}
	  }
      
  	  // If the current neighbor cell being evaluated is dead and has not already been considered for life this generation
      if (!isAlive && !checkedThisGen)
	  {
        // Store the current neighbor cells 9 adjacent neighbors in a nested neighbors list
        var nestedNeighbors = getNeighbors(neighbors[j]);
        var neighborAliveSum = 0;   // Number of alive neighbors adjacent to the current neighbor cell
        
        
		// Loop through the current neighbors 9 adjacent nested neighbors
		for (let p = 0; p < nestedNeighbors.length; p++)
		{
			for (let k = 0; k < aliveCoords.length; k++)   // Loop through the alive coordinates list
			{
            	// If the alive coordinates list contains the current nested neighbor
				if (nestedNeighbors[p][0] == aliveCoords[k][0] && nestedNeighbors[p][1] == aliveCoords[k][1])
				{
					neighborAliveSum++;   // Increment the number of alive neighbors adjacent to the current neighbor 
					break;	              // Step out of this for loop
				}
			}
		}
		if (neighborAliveSum == 3)				// If the nested neighbor sum is exactly 3
			nxtGenCoords.push(neighbors[j]);    // Add it to the next generation list

		checkedNeighbors.push(neighbors[j]);    // Add the current neighbor to the "checked this generation" list
      }
    }
    
    // If the number of alive neighbors adjacent to the current alive cell is either 2 or 3
	if (aliveSum >= 2 && aliveSum <= 3)			        // i.e. Alive cell remains alive
		nxtGenCoords.push(aliveCoords[i]);              //  ==> Add it to the next generation list
  }
  
  return nxtGenCoords;   // Return the next state of The Game of Life as alive coordinates
}

/*
	Description: Helper function. Retrieves a cells adjacent neighbors.
		 Params: Vector containing two 64-bit integer coordinates.
		Returns: Vector of vectors containing 9 adjacent neighbor coordinates.
*/
function getNeighbors(coord)
{
  var neighbors = [];
  
  var x = coord[0];
  var y = coord[1];
  
  neighbors.push(insertPair(x - 1, y - 1));   // Top left neighbor
  neighbors.push(insertPair(x, y - 1));       // Top neighbor
  neighbors.push(insertPair(x + 1, y - 1));   // Top right neighbor

  neighbors.push(insertPair(x - 1, y));       // Left neighbor
  neighbors.push(insertPair(x + 1, y));       // Right neighbor

  neighbors.push(insertPair(x - 1, y + 1));   // Bottom left neighbor
  neighbors.push(insertPair(x, y + 1));       // Bottom neighbor
  neighbors.push(insertPair(x + 1, y + 1));   // Bottom right neighbor
  
  return neighbors;
}

/*
	Description: Helper function. Inserts two 64-bit integer coordinates into a vector.
		 Params: Two 64-bit integer coordinates.
		Returns: Vector containing two 64-bit integer coordinates.
*/
function insertPair(x, y)
{
  var tempCoordinate = [x, y];
  
  return tempCoordinate;
}
