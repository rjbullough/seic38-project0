let currentColumn, $gameBoard, $dropZone;

// Stores a column number based on mouse position
// Provides a visual clue as to which player's turn it is and what column they're over
$(document).on("mousemove", function (e) {
  $dropZone = $("#token-drop-zone");
  currentColumn = Math.floor((e.clientX - $gameBoard.offset().left) / 54);
  currentColumn < 0
    ? (currentColumn = 0)
    : currentColumn > 6
    ? (currentColumn = 6)
    : currentColumn;
  $dropZone
    .css({
      top: "1px",
      left: function () {
        return `${$gameBoard.offset().left + 55 * currentColumn}px`;
      },
      "background-color": function () {
        if (currentPlayer === 1) {
          return `rgb(230, 93, 93)`;
        } else {
          return `rgb(90, 90, 194)`;
        }
      },
    })
    .addClass("disc");
});

// Updates the game board with the current players move
$(document).on("click", function () {
  takeMove(currentColumn);
  const drawToken = $("<div>")
    .addClass(function () {
      return currentPlayer === 1 ? `player1 disc` : `player2 disc`;
    })
    .css({
      top: function () {
        return `${rowNumber * 55}px`;
      },
      left: function () {
        return `${55 * currentColumn}px`;
      },
    })
    .appendTo($gameBoard);
});
