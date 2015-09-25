var tilesWithoutMines,
    tilesWithoutMinesCounter;

function addEventListeners() {
    canvas.addEventListener('click', onTileClick, false);
    canvas.addEventListener('contextmenu', onTileRightClick, false);
    document.getElementById('easy').addEventListener('click', startEasyGame, false);
    document.getElementById('intermediate').addEventListener('click', startIntermediateGame, false);
}

function startEasyGame() {
    startNewGame('easy');
}

function startIntermediateGame() {
    startNewGame('intermediate');
}

function removeEventListenersFromCanvas() {
    canvas.removeEventListener('click', onTileClick, false);
    canvas.removeEventListener('contextmenu', onTileRightClick, false);
}

function onTileClick(event) {
    var tile;

    // To enable only left mouse button click. Scroll is disabled
    if (event.button === 0) {
        tile = getClickedTile(event);
        if (tile && !tile.isVisited && !tile.hasMineFlag) {
            showBehindTile(tile);
        }
    }
}

function onTileRightClick(event) {
    var tile;

    // disable menu
    event.preventDefault();

    tile = getClickedTile(event);
    if (tile && !tile.isVisited) {
        if (!tile.hasMineFlag) {
            tile.hasMineFlag = true;
            drawMineFlag(tile);
        }
        else {
            tile.hasMineFlag = false;
            drawOneTile(tile, false);
        }
    }
}

function getClickedTile(event) {
    var rect = canvas.getBoundingClientRect(),
        x = event.clientX - rect.left,
        y = event.clientY - rect.top,
        tile;

    tile = tiles.find(function (tile) {
        return tile.startX + tileSize > x &&
            tile.startY + tileSize > y;
    });

    return tile;
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
    drawOneTile(currentTile, true);

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
    $('.alert-success').removeClass('hidden');
    removeEventListenersFromCanvas();
}

// TODO: separate this function to two. One for uncovering all mines
function gameOver() {
    var currentTile;

    $('.alert-danger').removeClass('hidden');
    removeEventListenersFromCanvas();

    for (var index in tiles) {
        currentTile = tiles[index];
        if (currentTile.value === mineSymbol) {
            drawTileWithValue(currentTile);
        }
    }
}

function hideAlertMessages() {
    $('.alert-danger').addClass('hidden');
    $('.alert-success').addClass('hidden');
}

function setTilesCounters() {
    tilesWithoutMines = (verticalTiles * horizontalTiles) - numberOfMines;
    tilesWithoutMinesCounter = 0;
}

function initializeGame() {
    setTilesCounters();
    addEventListeners();
    hideAlertMessages();
}