var tilesWithoutMines,
    tilesWithoutMinesCounter;

function addEventListeners() {
    canvas.addEventListener('click', onTileClick, false);
    document.getElementById('restart-btn').addEventListener('click', startNewGame, false);
}

function removeEventListenerFromCanvas() {
    canvas.removeEventListener('click', onTileClick, false);
}

function onTileClick(event) {
    var rect = canvas.getBoundingClientRect(),
        x = event.clientX - rect.left,
        y = event.clientY - rect.top,
        tile;

    tile = tiles.find(function (tile) {
        return tile.startX + tileSize > x &&
            tile.startY + tileSize > y;
    });

    if (tile && !tile.isVisited) {
        showBehindTile(tile);
    }
}

function showBehindTile(tile) {
    if (tile.value === 0) {
        showAllTilesWithoutValue(tile.row, tile.col);
    }
    else if (tile.value === '*') {
        gameOver();
    }
    else {
        tile.isVisited = true;
        drawTileWithValue(tile);
        countAndCheckForWin();
    }
}

function isInBoard(row, col) {
    var rowInRange = 0 <= row && row < verticalTiles,
        colInRange = 0 <= col && col < horizontalTiles;
    return rowInRange && colInRange;
}

function showAllTilesWithoutValue(row, col) {
    var currentTile;

    // if we are outside the board then stop
    if (!isInBoard(row, col)) {
        return;
    }

    currentTile = tiles.find(function (tile) {
        return tile.row === row && tile.col === col;
    });

    if (currentTile.isVisited) {
        return;
    }

    currentTile.isVisited = true;

    // if we perform the check here we count all tiles
    countAndCheckForWin();

    // when we reach tile indicating the number of mines then draw it and stop
    if (currentTile.value !== 0) {
        drawTileWithValue(currentTile);
        return;
    }

    // if everything is ok then draw the grey tile that was reached
    drawGrayTile(currentTile);

    // Invoke recursion to explore all possible directions
    showAllTilesWithoutValue(row, col - 1); // left
    showAllTilesWithoutValue(row - 1, col); // up
    showAllTilesWithoutValue(row, col + 1); // right
    showAllTilesWithoutValue(row + 1, col); // down

    // diagonally as well to open tiles with values in corners
    showAllTilesWithoutValue(row - 1, col - 1); // 10 o'clock
    showAllTilesWithoutValue(row - 1, col + 1); // 2 o'clock
    showAllTilesWithoutValue(row + 1, col + 1); // 4 o'clock
    showAllTilesWithoutValue(row + 1, col - 1); // 8 o'clock
}

function countAndCheckForWin() {
    tilesWithoutMinesCounter += 1;

    if (tilesWithoutMinesCounter === tilesWithoutMines) {
        gameWon();
    }
}

function gameWon() {
    var gameWonText = 'Congratulations. You win.';
    addTextInStatusField(gameWonText, true);
    removeEventListenerFromCanvas();
}

function gameOver() {
    var currentTile,
        gameOverText = 'You hit a mine. Game Over.';

    addTextInStatusField(gameOverText, false);
    removeEventListenerFromCanvas();

    for (var index in tiles) {
        currentTile = tiles[index];
        if (currentTile.value === mineSymbol) {
            drawTileWithValue(currentTile);
        }
    }
}

function addTextInStatusField(text, isWon) {
    var statusField = document.getElementById('game-status');
    if (isWon) {
        statusField.style.color = 'green';
    }
    else {
        statusField.style.color = 'darkred';
    }

    statusField.innerHTML = '<div>' + text + '</div>';
}

function clearStatusField() {
    addTextInStatusField('');
}

function setTilesCounters() {
    tilesWithoutMines = (verticalTiles * horizontalTiles) - numberOfMines;
    tilesWithoutMinesCounter = 0;
}

function initializeGame() {
    setTilesCounters();
    addEventListeners();
    clearStatusField();
}
