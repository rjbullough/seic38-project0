let currentPlayer = 1,
  rowNumber,
  winningPlayer = 0,
  movesTaken = 0,
  $gameBoard;
const boardArray = [];

// Initialise empty game array
const setTheScene = () => {
  boardArray.length = 0;
  $gameBoard = $("#game-board");
  for (let i = 0; i < 6; i++) {
    boardArray[i] = [];
    for (let j = 0; j < 7; j++) {
      boardArray[i].push(0);
    }
  }
};

// Resets beginning game state
const replay = () => {
  currentPlayer = 1;
  winningPlayer = 0;
  movesTaken = 0;
  setTheScene();
  $("#game-board").empty();
  $("div").first().remove();
  // Prevents placing a token when clicking restart
  setTimeout(function () {
    $(document).on("click", placeToken);
  }, 700);
};

// Places token in the first available row of the passed column, checks for victory
// Stores row number for visual positioning in renderGame.js
const takeMove = (column) => {
  for (let i = boardArray.length - 1; i >= 0; i--) {
    if (boardArray[i][column] === 0) {
      boardArray[i][column] = currentPlayer;
      movesTaken++;
      rowNumber = i + 1;
      currentPlayer = (currentPlayer % 2) + 1;
      checkForVictory();
      return true;
    }
  }
};

// Checks if all tokens belong to the same player
const equalityCheck = (index1, index2, index3, index4) => {
  return (
    index1 != 0 && index1 === index2 && index1 === index3 && index1 === index4
  );
};

// Search the top 3 rows for a vertical match
const searchDown = () => {
  for (let row = 0; row < 3; row++)
    for (let column = 0; column < 7; column++)
      if (
        equalityCheck(
          boardArray[row][column],
          boardArray[row + 1][column],
          boardArray[row + 2][column],
          boardArray[row + 3][column]
        )
      )
        winningPlayer = boardArray[row][column];
};

// Search the left 4 columns for a horizontal match
const searchRight = () => {
  for (let row = 0; row < 6; row++)
    for (let column = 0; column < 4; column++)
      if (
        equalityCheck(
          boardArray[row][column],
          boardArray[row][column + 1],
          boardArray[row][column + 2],
          boardArray[row][column + 3]
        )
      )
        winningPlayer = boardArray[row][column];
};

// Search the top 3 rows, starting from the left, for a diagonal match
const searchDiagonalRight = () => {
  for (let row = 0; row < 3; row++)
    for (let column = 0; column < 4; column++)
      if (
        equalityCheck(
          boardArray[row][column],
          boardArray[row + 1][column + 1],
          boardArray[row + 2][column + 2],
          boardArray[row + 3][column + 3]
        )
      )
        winningPlayer = boardArray[row][column];
};

// Search the top 3 rows, starting from the right, for a diagonal match
const searchDiagonalLeft = () => {
  for (let row = 3; row < 6; row++)
    for (let column = 0; column < 4; column++)
      if (
        equalityCheck(
          boardArray[row][column],
          boardArray[row - 1][column + 1],
          boardArray[row - 2][column + 2],
          boardArray[row - 3][column + 3]
        )
      )
        winningPlayer = boardArray[row][column];
};

const checkForVictory = () => {
  searchDown();
  searchRight();
  searchDiagonalRight();
  searchDiagonalLeft();
  return winningPlayer;
};
