let currentColumn, $gameBoard, $dropZone;

// Stores a column number based on mouse position
// Provides a visual cue for the current player and the column they're over
$(document).on("mousemove", function (e) {
  $dropZone = $("#token-drop-zone");
  currentColumn = Math.floor((e.clientX - $gameBoard.offset().left) / 70);
  currentColumn < 0
    ? (currentColumn = 0)
    : currentColumn > 6
    ? (currentColumn = 6)
    : currentColumn;
  $dropZone
    .css({
      top: "4px",
      left: function () {
        return `${$gameBoard.offset().left + 71 * currentColumn}px`;
      },
      "background-color": function () {
        return currentPlayer === 1 ? `rgb(230, 93, 93)` : `rgb(90, 90, 194)`;
      },
    })
    .addClass("disc");
});

// Updates the game board with the player's move if a space is available
$(document).on("click", function () {
  if (takeMove(currentColumn)) {
    const drawToken = $("<div>")
      .addClass(function () {
        return currentPlayer === 1 ? `player2 disc` : `player1 disc`; // function has run and updated player already, logic swapped
      })
      .css({
        top: function () {
          return `${--rowNumber * 71 + 1}px`;
        },
        left: function () {
          return `${71 * currentColumn + 1}px`;
        },
      })
      .appendTo($gameBoard);
    if (checkForVictory() != 0) {
      checkForVictory() === 1 ? ggNoRe(1) : ggNoRe(2);
    }
  }
});

// Victory state - displays a page depending on who won
const ggNoRe = (player) => {
  $(document).off("click");
  const background = () => {
    return player === 1 ? `rgb(230, 93, 93)` : `rgb(90, 90, 194)`;
  };
  const $victoryScreen = $("<div>");
  const $victoryMessage = $("<p>").html(
    `<span>Player ${player}!</span> <br>*chef's kiss*`
  );
  const $reload = $("<img>").attr("src", "images/reload.png");
  $victoryMessage.css({
    "font-family": `'Pacifico', cursive`,
    "font-size": "3em",
    "text-align": "center",
  });
  $victoryScreen
    .css({
      "background-color": background(),
      position: "absolute",
      top: "0",
      left: "0",
      display: "flex",
      width: "100%",
      height: "100%",
      "flex-direction": "column",
      "justify-content": "center",
      "align-items": "center",
      "z-index": "2",
    })
    .append($victoryMessage, $reload)
    .prependTo($("body"));
  $("span").css({
    "font-family": `'Bangers', cursive`,
    "letter-spacing": "3px",
    "font-size": "4em",
  });
  $("img").hover(function () {
    $(this).css({
      cursor: "pointer",
    });
  });
  $("img").on("click", function () {
    location.reload();
  });
};
