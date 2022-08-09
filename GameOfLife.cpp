#include <iostream>
#include <vector>
using namespace std;

/*
	Conway's Game of Life (64-bit integer-space using C++)
	* A Cellular Automaton
	
	* Developed by David Guido
	  For Riot Games SE-B Interview

	* Description: Reads the state of the simulation from standard input, runs 10 iterations (generations) 
	               of the Game of Life, and prints the results to standard output in Life 1.06 format.
*/

// Function Declarations
void userInput(vector<vector<signed long long>>& coords);
void testInput(vector<vector<signed long long>>& coords);
void printCoordinates(vector<vector<signed long long>> coords);
vector<vector<signed long long>> gameOfLife(vector<vector<signed long long>> aliveCoords);
vector<signed long long> insertPair(signed long long x, signed long long y);
vector<vector<signed long long>> getNeighbors(vector<signed long long> coord);

// Description: Driver function. Calls 10 iterations of the Game of Life and prints the results to standard output.
int main()
{
	vector<vector<signed long long>> aliveCoords;   // List to store the original input of alive coordinates
	userInput(aliveCoords);					    // Read the state of the simulation from standard input, store in aliveCoords
	//testInput(aliveCoords);							// Retrieve the alive coordinates (Used for testing purposes only)

	vector<vector<signed long long>> nxtGenCoords = gameOfLife(aliveCoords);   // Call the first iteration of the Game of Life 
	printCoordinates(nxtGenCoords);											   // Print the results
	
	for (int i = 0; i < 9; i++)   
	{
		nxtGenCoords = gameOfLife(nxtGenCoords);   // Call 9 more iterations of the Game of Life on the current game state
		printCoordinates(nxtGenCoords);            // Print the results
	}

	return 0;
}

/*
	Description: Calculates one iteration (generation) of Conway's Game of Life.
		 Params: Vector of vectors containing the current game state as alive coordinates.
		Returns: Vector of vectors containing the next game state as alive coordinates.
*/
vector<vector<signed long long>> gameOfLife(vector<vector<signed long long>> aliveCoords)
{
	vector<vector<signed long long>> nxtGenCoords;       // List to store the next generation of the Game of Life
	vector<vector<signed long long>> checkedNeighbors;   // List of dead neighbors already considered for life this generation 
 
	for (int i = 0; i < aliveCoords.size(); i++)   // Loop through the list of alive coordinates
	{
		// Store the current alive cells 9 adjacent neighbors in a neighbors list
		vector<vector<signed long long>> neighbors = getNeighbors(aliveCoords[i]);

		int aliveSum = 0;   // Number of alive neighbors adjacent to the current alive cell

		for (int j = 0; j < neighbors.size(); j++)   // Loop through the current alive cells 9 adjacent neighbors
		{
			bool isAlive = false;          // Is the current neighbor being evaluated alive
			bool checkedThisGen = false;   // Has the current neighbor already been considered for life this generation

			for (int q = 0; q < aliveCoords.size(); q++)   // Loop through the alive coordinates list
			{
				// If the alive coordinates list contains the current neighbor
				if (neighbors[j][0] == aliveCoords[q][0] && neighbors[j][1] == aliveCoords[q][1])
				{
					isAlive = true;   // Set the current neighbors state to alive
					aliveSum++;		  // Increment the number of alive neighbors adjacent to the current alive cell 
					break;			  // Step out of this for loop
				}
			}

			// Loop through the "checked this generation" list
			for (int z = 0; z < checkedNeighbors.size(); z++)
			{
				// If the "checked this generation" list contains the current neighbor
				if (neighbors[j][0] == checkedNeighbors[z][0] && neighbors[j][1] == checkedNeighbors[z][1])
				{
					checkedThisGen = true;   // The current neighbor has already been considered for life this generation
					break;				     // Step out of this for loop
				}
			}

			// If the current neighbor cell being evaluated is dead and has not already been considered for life this generation
			if (!isAlive && !checkedThisGen)
			{
				// Store the current neighbor cells 9 adjacent neighbors in a nested neighbors list
				vector<vector<signed long long>> nestedNeighbors = getNeighbors(neighbors[j]);

				int neighborAliveSum = 0;   // Number of alive neighbors adjacent to the current neighbor cell

				// Loop through the current neighbors 9 adjacent nested neighbors
				for (int p = 0; p < nestedNeighbors.size(); p++)
				{
					for (int k = 0; k < aliveCoords.size(); k++)   // Loop through the alive coordinates list
					{
						// If the alive coordinates list contains the current nested neighbor
						if (nestedNeighbors[p][0] == aliveCoords[k][0] && nestedNeighbors[p][1] == aliveCoords[k][1])
						{
							neighborAliveSum++;   // Increment the number of alive neighbors adjacent to the current neighbor 
							break;	              // Step out of this for loop
						}
					}
				}
				if (neighborAliveSum == 3)				     // If the nested neighbor sum is exactly 3
					nxtGenCoords.push_back(neighbors[j]);    // Add it to the next generation list

				checkedNeighbors.push_back(neighbors[j]);    // Add the current neighbor to the "checked this generation" list
			}
		}

		// If the number of alive neighbors adjacent to the current alive cell is either 2 or 3
		if (aliveSum >= 2 && aliveSum <= 3)			        // i.e. Alive cell remains alive
			nxtGenCoords.push_back(aliveCoords[i]);     //  ==> Add it to the next generation list
	}

	return nxtGenCoords;   // Return the next state of The Game of Life as alive coordinates
}

/*
	Description: Helper function. Retrieves a cells adjacent neighbors.
		 Params: Vector containing two 64-bit integer coordinates.
		Returns: Vector of vectors containing 9 adjacent neighbor coordinates.
*/
vector<vector<signed long long>> getNeighbors(vector<signed long long> coord)
{
	vector<vector<signed long long>> neighbors;
	signed long long x = coord[0];
	signed long long y = coord[1];

	neighbors.push_back(insertPair(x - 1, y - 1));   // Top left neighbor
	neighbors.push_back(insertPair(x, y - 1));       // Top neighbor
	neighbors.push_back(insertPair(x + 1, y - 1));   // Top right neighbor

	neighbors.push_back(insertPair(x - 1, y));       // Left neighbor
	neighbors.push_back(insertPair(x + 1, y));       // Right neighbor

	neighbors.push_back(insertPair(x - 1, y + 1));   // Bottom left neighbor
	neighbors.push_back(insertPair(x, y + 1));       // Bottom neighbor
	neighbors.push_back(insertPair(x + 1, y + 1));   // Bottom right neighbor

	return neighbors;
}

/*
	Description: Helper function. Inserts two 64-bit integer coordinates into a vector.
		 Params: Two 64-bit integer coordinates.
		Returns: Vector containing two 64-bit integer coordinates.
*/
vector<signed long long> insertPair(signed long long x, signed long long y)
{
	vector<signed long long> tempCoordinate;

	tempCoordinate.push_back(x);
	tempCoordinate.push_back(y);

	return tempCoordinate;
}

/*
	Description: Helper function. Prints the current state of the Game of Life to standard ouput in Life 1.06 format.
		 Params: Vector of vectors containing the current state of the Game of Life as (x,y) coordinates.
*/
void printCoordinates(vector<vector<signed long long>> coords)
{
	cout << "#Life 1.06\n";
	for (int i = 0; i < coords.size(); i++)
		cout << coords[i][0] << " " << coords[i][1] << endl;

	cout << endl;
}

/*
	Description: Helper function. Reads the state of the simulation from standard input.
		 Params: Empty vector of vectors used to store the user-defined game state as (x,y) coordinates.
*/
void userInput(vector<vector<signed long long>>& coords)
{
	int numCoords = 0;
	signed long long tempInt = 0;

	cout << "Enter the number of alive (x, y) integer coordinates in the list: ";
	cin >> numCoords;

	while (numCoords <= 0 || numCoords > 20)
	{
		cout << "\nEnter a valid number of alive (x, y) integer coordinates ";
		cin >> numCoords;
	}
	cout << endl;

	for (int i = 0; i < numCoords; i++)
	{
		vector<signed long long> currCoord;
		cout << "[Coordinate " << i + 1 << "] " << "Enter the x coordinate: ";
		cin >> tempInt;
		currCoord.push_back(tempInt);
		cout << "[Coordinate " << i + 1 << "] " << "Enter the y coordinate: ";
		cin >> tempInt;
		currCoord.push_back(tempInt);

		coords.push_back(currCoord);
	}
	cout << endl;
}

/*
	Description: Helper function. Inserts sample data into the alive coordinates list. Used for testing purposes only.
		 Params: Vector of vectors containing the current state of the Game of Life as (x,y) coordinates.
*/
void testInput(vector<vector<signed long long>>& coords)
{
	vector<signed long long> tempVec;

	tempVec.push_back(0);
	tempVec.push_back(1);
	coords.push_back(tempVec);
	tempVec.pop_back();
	tempVec.pop_back();

	tempVec.push_back(1);
	tempVec.push_back(2);
	coords.push_back(tempVec);
	tempVec.pop_back();
	tempVec.pop_back();

	tempVec.push_back(2);
	tempVec.push_back(0);
	coords.push_back(tempVec);
	tempVec.pop_back();
	tempVec.pop_back();

	tempVec.push_back(2);
	tempVec.push_back(1);
	coords.push_back(tempVec);
	tempVec.pop_back();
	tempVec.pop_back();

	tempVec.push_back(2);
	tempVec.push_back(2);
	coords.push_back(tempVec);
	tempVec.pop_back();
	tempVec.pop_back();

	tempVec.push_back(-2000000000000);
	tempVec.push_back(-2000000000000);
	coords.push_back(tempVec);
	tempVec.pop_back();
	tempVec.pop_back();

	tempVec.push_back(-2000000000001);
	tempVec.push_back(-2000000000001);
	coords.push_back(tempVec);
	tempVec.pop_back();
	tempVec.pop_back();
}