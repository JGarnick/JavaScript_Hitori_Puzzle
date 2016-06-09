/*
   New Perspectives on HTML, CSS, and JavaScript
   Tutorial 13
   Review Assignment

   Author: Josh Garnick
   Date:   3/3/16

   Function List
   =============

   init()
      Run when the Web page is loaded; displays puzzle 1
      and loads the event handlers for the Web page buttons.

   swapPuzzle()
      Swaps one puzzle for another based on the button being clicked
      by the user. Confirms the change before swapping in the
      new puzzle.

   setupPuzzle()
      Sets up a new puzzle, adding the onclick event handlers for
      every puzzle cell.

   changeBackground()
      Changes the cell background from grey to circled to black and
      back to grey again. Checks the puzzle for a complete solution.

   peek()
      Temporarily displays incorrect cells with the numbers highlighted
      in a red font.

   unpeek()
      Returns the puzzle to its original state prior to peeking.

   showSolution()
      Removes all inline background color styles from the puzzle, showing
      the complete solution.

   checkSolution()
      Checks the current state of the puzzle, determining whether it 
      respreents a complete solution.

   drawHitori(numbers, blocks)
      Returns a text string of the HTML code to
      display a Hitori Web table based on the contents of
      multi-dimensional arrays: numbers and blocks.
	
*/

window.onload = init;

function init()
{
	document.getElementsByTagName("h1")[0].innerHTML = "Hitori Puzzle 1";
	document.getElementsByTagName("h2")[0].innerHTML = hitori1Rating;
	document.getElementById("puzzle").innerHTML = drawHitori(hitori1Numbers, hitori1Blocks);
	var puzzleButtons = document.getElementsByClassName("puzzles");
	for (var i = 0; i < puzzleButtons.length; i++) 
	{
		puzzleButtons[i].onclick = swapPuzzle;
	}
	setupPuzzle();
	document.getElementById("peek").onclick = peek;
	document.getElementById("solve").onclick = showSolution;
}

function setupPuzzle()
{
	var puzzleCells = document.querySelectorAll("#hitoriGrid td");
	for (var i = 0; i < puzzleCells.length; i++)
	{
		puzzleCells[i].style.backgroundColor = "rgb(211, 211, 211)";
		puzzleCells[i].style.color = "black";
		puzzleCells[i].style.backgroundImage = "none";
		puzzleCells[i].onclick = changeBackground;
	}
}

function swapPuzzle() 
{
   if (confirm("You will lose all of your work on the puzzle! Continue?")) 
   {
      var title = "Hitori " + this.value;
      var rating = eval(this.id + "Rating");
      var numbers = eval(this.id + "Numbers");
	  var blocks = eval(this.id + "Blocks");
	  document.getElementsByTagName("h1")[0].innerHTML = title;
      document.getElementsByTagName("h2")[0].innerHTML = rating;
      document.getElementById("puzzle").innerHTML = drawHitori(numbers, blocks);
	  setupPuzzle();
   }
}

function changeBackground() 
{
   var bColor = this.style.backgroundColor;
   
   if (bColor == "rgb(211, 211, 211)")
   {
	   this.style.backgroundColor = "white";
	   this.style.color = "black";
	   this.style.backgroundImage = "url(circle.png)";
   }
   else if (bColor == "white")
   {
	   this.style.backgroundColor = "black";
	   this.style.color = "white";
	   this.style.backgroundImage = "none";
   }
   else
   {
	   this.style.backgroundColor = "rgb(211, 211, 211)";
	   this.style.color = "black";
	   this.style.backgroundImage = "none";
   }   
   checkSolution();
	   
}

function checkSolution()
{
	var allCells = document.querySelectorAll("#hitoriGrid td");
	var solved = true;
	for (var i = 0; i < allCells.length; i++)
	{
		var cellColor = allCells[i].style.backgroundColor;
		var cellClass = allCells[i].className;
		if ((cellClass == "circles" && cellColor !== "white") || 
			(cellClass == "blocks" && cellColor !== "black"))
			{
				solved = false;
				break;
			}
	}
	if (solved)
		alert("Congratulations! You're a Rockstar!")
}

function showSolution()
{
	var circleCells = document.querySelectorAll("#hitoriGrid td.circles"); //grab all circles
	for (var i = 0; i < circleCells.length; i++)
	{
		circleCells[i].style.backgroundColor = "white"; //set all circles to look like circles
		circleCells[i].style.color = "black";
		circleCells[i].style.backgroundImage = "url(circle.png)"
	}
	var blockCells = document.querySelectorAll("#hitoriGrid td.blocks"); //get all blocks
	for (var i = 0; i < blockCells.length; i++)
	{
		blockCells[i].style.backgroundColor = "black"; //set all blocks to look like blocks
		blockCells[i].style.color = "white";
		blockCells[i].style.backgroundImage = "none"
	}
}

function peek() 
{
   var blockCells = document.querySelectorAll("#hitoriGrid td.blocks");
   var circleCells = document.querySelectorAll("#hitoriGrid td.circles");
   for (var i = 0; i < blockCells.length; i++) 
   {
      cell = blockCells[i];
      if (cell.style.backgroundColor == "white") 
		cell.style.color = "red";
   } 

   for (var i = 0; i < circleCells.length; i++)
   {
      var cell = circleCells[i];
      if (cell.style.backgroundColor == "black")
		cell.style.color = "red";  
	}
   setTimeout("unpeek()", 500);
}

function unpeek() //peek and unpeek work together
{
   var allCells = document.querySelectorAll("#hitoriGrid td");
   for (var i = 0; i < allCells.length; i++) 
   {
      var cell = allCells[i];
      if (cell.style.color == "red")
			if (cell.className == "blocks")
				cell.style.color = "black";
      else
		  cell.style.color = "white";
   }
}



function drawHitori(numbers, blocks) {

   /* Initial HTML String for the Hitori Puzzle */
   var htmlString = "";

   /* numbers is a multidimensional array containing the
      Hitori numbers; blocks is a corresponding 
      multidimensional array containing the location of the
      blocks which are indicated by the # character.
      Non-blocking cells are indicated by a blank character.
  */

   /* Create a Web table with the id, hitoriGrid, containing
      the numeric values. Blocks cells have the class name,
      blocks. Non-blocking cells have the class name, circles
  */

   var totalRows = numbers.length;
   var totalCols = numbers[0].length;
   htmlString = "<table id='hitoriGrid'>";
   

   for (var i = 0; i < totalRows; i++) {
      htmlString += "<tr>";

      for (var j = 0; j < totalCols; j++) {
         if (blocks[i][j] == "#") htmlString += "<td  class='blocks'>"
         else htmlString += "<td class='circles'>";

         htmlString += numbers[i][j];
         htmlString +="</td>";
      }

      htmlString += "</tr>";
   }

   htmlString += "</table>";

   return htmlString;
}
