var tilesWithoutMines,
    tilesWithoutMinesCounter;

function addEventListenersOnCanvas(tiles, settings) {
    $('canvas').on('click', {tiles: tiles, settings: settings}, onTileLeftClick).
        on('contextmenu', {tiles: tiles, settings: settings}, onTileRightClick);
}

function removeEventListenersFromCanvas() {
    $('canvas').off('click', onTileLeftClick).
        off('contextmenu', onTileRightClick);
}

function onTileLeftClick(event) {
    var tiles = event.data.tiles,
        settings = event.data.settings,
        tile;

    // To disable scroll click
    //if (event.button !== 1) {
        tile = getClickedTile(event, tiles, settings);
        if (tile && !tile.isVisited && !tile.hasMineFlag) {
            showBehindTile(tile, tiles, settings);
        }
    //}
}

function onTileRightClick(event) {
    var tiles = event.data.tiles,
        settings = event.data.settings,
        tile;

    // disable menu
    event.preventDefault();

    tile = getClickedTile(event, tiles, settings);
    if (tile && !tile.isVisited) {
        if (!tile.hasMineFlag) {
            tile.hasMineFlag = true;
            drawMineFlag(tile);
        }
        else {
            tile.hasMineFlag = false;
            drawSingleTile(tile, settings.tileSizeInPx, false);
        }
    }
}

function getClickedTile(event, tiles, settings) {
    var tile;

    tile = tiles.find(function (tile) {
        return tile.startXinPx < event.offsetX &&
            event.offsetX <= tile.startXinPx + settings.tileSizeInPx &&
            tile.startYinPx < event.offsetY &&
            event.offsetY <= tile.startYinPx + settings.tileSizeInPx;
    });

    return tile;
}

function showBehindTile(tile, tiles, settings) {
    if (tile.value === 0) {
        showAllTilesWithoutValue(tile.row, tile.col, tiles, settings);
    }
    else if (tile.value === '*') {
        gameOver(tiles, settings);
    }
    else {
        tile.isVisited = true;
        drawTileWithValue(tile, settings);
        countAndCheckForWin();
    }
}

function isInBoard(row, col, settings) {
    var rowInRange = 0 <= row && row < settings.difficulty.verticalTiles,
        colInRange = 0 <= col && col < settings.difficulty.horizontalTiles;
    return rowInRange && colInRange;
}

function showAllTilesWithoutValue(row, col, tiles, settings) {
    var currentTile;

    // if we are outside the board then stop
    if (!isInBoard(row, col, settings)) {
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
        drawTileWithValue(currentTile, settings);
        return;
    }

    // if everything is ok then draw the grey tile that was reached
    drawSingleTile(currentTile, settings.tileSizeInPx, true);

    // Invoke recursion to explore all possible directions
    showAllTilesWithoutValue(row, col - 1, tiles, settings); // left
    showAllTilesWithoutValue(row - 1, col, tiles, settings); // up
    showAllTilesWithoutValue(row, col + 1, tiles, settings); // right
    showAllTilesWithoutValue(row + 1, col, tiles, settings); // down

    // diagonally as well to open tiles with values in corners
    showAllTilesWithoutValue(row - 1, col - 1, tiles, settings); // 10 o'clock
    showAllTilesWithoutValue(row - 1, col + 1, tiles, settings); // 2 o'clock
    showAllTilesWithoutValue(row + 1, col + 1, tiles, settings); // 4 o'clock
    showAllTilesWithoutValue(row + 1, col - 1, tiles, settings); // 8 o'clock
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
function gameOver(tiles, settings) {
    var currentTile;

    $('.alert-danger').removeClass('hidden');
    removeEventListenersFromCanvas();

    for (var index in tiles) {
        currentTile = tiles[index];
        if (currentTile.value === settings.mineSymbol) {
            drawTileWithValue(currentTile, settings);
        }
    }
}

function hideAlertMessages() {
    $('.alert-danger').addClass('hidden');
    $('.alert-success').addClass('hidden');
}

function setTilesCounters(settings) {
    tilesWithoutMines = (settings.difficulty.verticalTiles * settings.difficulty.horizontalTiles)
        - settings.difficulty.numberOfMines;
    tilesWithoutMinesCounter = 0;
}

function initializeGame(tiles, settings) {
    setTilesCounters(settings);
    removeEventListenersFromCanvas();
    addEventListenersOnCanvas(tiles, settings);
    hideAlertMessages();
}