let currentPlayer = 1,
  rowNumber,
  winningPlayer,
  $gameBoard;
const boardArray = [];

const setTheScene = () => {
  $gameBoard = $("#game-board");
  $gameBoard.html("");
  for (let i = 0; i < 6; i++) {
    boardArray[i] = [];
    for (let j = 0; j < 7; j++) {
      boardArray[i].push(0);
    }
  }
};

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

// Iterates over the game board, returns winning player if found
function checkForVictory(gameArray = boardArray) {
  const equalityCheck = (index1, index2, index3, index4) => {
    return (
      index1 != 0 && index1 === index2 && index1 === index3 && index1 === index4
    );
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
        winningPlayer = gameArray[row][column];
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
        winningPlayer = gameArray[row][column];
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
        winningPlayer = gameArray[row][column];
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
        winningPlayer = gameArray[row][column];
  return winningPlayer;
}
