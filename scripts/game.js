var tilesWithoutMines = (verticalTiles * horizontalTiles) - numberOfMines,
    tilesWithoutMinesCounter = 0;

function addEventListeners() {
    canvas.addEventListener('click', onTileClick, false);
    document.getElementById('restart').addEventListener('click', restart, false);
}

function removeEventListenerFromCanvas (){
    canvas.removeEventListener('click', onTileClick, false);
}

function onTileClick(event) {
    //console.log('type ' + event.type);
    //console.log('button ' + event.button);
    //console.log('target' + event.target);
    var bodyMarginInPx = 8,
        x = event.clientX,
        y = event.clientY,
        tile;

    tile = tiles.find(function (tile) {
        return tile.startX + bodyMarginInPx + tileSize > x &&
            tile.startY + bodyMarginInPx + tileSize > y;
    });

    if (tile) {
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
        checkIsGameWon(tile);
        tile.isVisited = true;
        drawTileWithValue(tile);
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

    checkIsGameWon(currentTile);
    currentTile.isVisited = true;

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

function gameOver() {
    var currentTile,
        gameOverText = 'You hit a mine. Game Over.';

    addTextInStatusField(gameOverText);
    removeEventListenerFromCanvas();

    for (var index in tiles) {
        currentTile = tiles[index];
        if (currentTile.value === mineSymbol) {
            drawTileWithValue(currentTile);
        }
    }
}

function addTextInStatusField(text){
    var statusField = document.getElementById('game-status');
    statusField.innerHTML = '<div>' + text + '</div>';
}

function clearStatusField(){
    addTextInStatusField('');
}

function gameWon() {
    var gameWonText = 'Congratulations. You win.';
    addTextInStatusField(gameWonText);
    removeEventListenerFromCanvas();
}

function checkIsGameWon(tile) {
    if (!tile.isVisited) {
        tilesWithoutMinesCounter += 1;
    }

    console.log('counter: ' + tilesWithoutMinesCounter + ' out of ' + tilesWithoutMines);

    if (tilesWithoutMinesCounter === tilesWithoutMines) {
        gameWon();
    }
}

function initializeGame() {
    addEventListeners();
    clearStatusField();
}

function resetTilesCounter (){
    tilesWithoutMines = (verticalTiles * horizontalTiles) - numberOfMines;
        tilesWithoutMinesCounter = 0;
}