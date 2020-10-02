let currentColumn;

// Stores a column number based on mouse position
// Provides a visual cue for the current player and the column they're over
const whereAmI = (e) => {
  currentColumn = Math.floor((e.clientX - $gameBoard.offset().left) / 70);
  currentColumn < 0
    ? (currentColumn = 0)
    : currentColumn > 6
    ? (currentColumn = 6)
    : currentColumn;
  tokenVisualCue();
};
const tokenVisualCue = () => {
  $("#token-drop-zone")
    .css({
      top: "130px",
      left: function () {
        return `${$gameBoard.offset().left + 71 * currentColumn}px`;
      },
      "background-color": function () {
        return currentPlayer === 1 ? `rgb(230, 93, 93)` : `rgb(90, 90, 194)`;
      },
    })
    .addClass("disc");
};

// If viable, updates the game board with that player's move
const placeToken = () => {
  if (movesTaken === 41) {
    alert("Yibidda Yibidda, that's all folks");
  }
  if (takeMove(currentColumn) && winningPlayer === 0) {
    $("<div>")
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
  }
  if (winningPlayer != 0) {
    gg(winningPlayer);
  }
};

// Victory state - displays who's won the game
const gg = (player) => {
  $(document).off("click");
  const background = () => {
    return player === 1 ? `rgb(230, 93, 93)` : `rgb(90, 90, 194)`;
  };
  const $victoryMessage = $("<p>").html(
    `<span>Player ${player}!</span> <br>*chef's kiss*`
  );
  $victoryMessage.css({
    "font-family": `'Pacifico', cursive`,
    "font-size": "3em",
    "text-align": "center",
  });
  const $reload = $("<img>").attr("src", "images/reload.png");
  // Div that fills entire screen with winning message
  $("<div>")
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
  // style and add function to recently added elements
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
  $("img").on("click", replay);
};
$(document).ready(setTheScene);
$(document).on("mousemove", whereAmI);
$(document).on("click", placeToken);
