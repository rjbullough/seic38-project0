let currentPlayer = 1,
  rowNumber,
  $gameBoard;
const boardArray = [];

// Set the starting game state
$(document).ready(function () {
  $gameBoard = $("#game-board");
  newBoardArray = () => {
    $("#game-board").html("");
    for (let i = 0; i < 6; i++) {
      boardArray[i] = [];
      for (let j = 0; j < 7; j++) {
        boardArray[i].push(0);
      }
    }
  };
  newBoardArray();
});

// Fills the first available row in the specified column with the current player's token
// Stores row number for visual positioning
// Changes current player
const takeMove = (column) => {
  for (let i = boardArray.length - 1; i >= 0; i--) {
    if (boardArray[i][column] === 0) {
      boardArray[i][column] = currentPlayer;
      rowNumber = i + 1;
      currentPlayer *= -1;
      return true;
    }
  }
};

// Iterates over the entire game board and searches for a winner
function checkForVictory(gameArray = boardArray) {
  const equalityCheck = (cell1, cell2, cell3, cell4) => {
    return cell1 != 0 && cell1 === cell2 && cell1 === cell3 && cell1 === cell4;
  };
  // Will only check columns or rows where 4 in a row can exist
  // Down
  for (let row = 0; row < 3; row++)
    for (column = 0; column < 7; column++)
      if (
        equalityCheck(
          gameArray[row][column],
          gameArray[row + 1][column],
          gameArray[row + 2][column],
          gameArray[row + 3][column]
        )
      )
        return gameArray[row][column];
  //  Right
  for (let row = 0; row < 6; row++)
    for (column = 0; column < 4; column++)
      if (
        equalityCheck(
          gameArray[row][column],
          gameArray[row][column + 1],
          gameArray[row][column + 2],
          gameArray[row][column + 3]
        )
      )
        return gameArray[row][column];
  // Diagonal right
  for (let row = 0; row < 3; row++)
    for (column = 0; column < 4; column++)
      if (
        equalityCheck(
          gameArray[row][column],
          gameArray[row + 1][column + 1],
          gameArray[row + 2][column + 2],
          gameArray[row + 3][column + 3]
        )
      )
        return gameArray[row][column];
  // Diagonal left
  for (let row = 3; row < 6; row++)
    for (column = 0; column < 4; column++)
      if (
        equalityCheck(
          gameArray[row][column],
          gameArray[row - 1][column + 1],
          gameArray[row - 2][column + 2],
          gameArray[row - 3][column + 3]
        )
      )
        return gameArray[row][column];
  return 0;
}
