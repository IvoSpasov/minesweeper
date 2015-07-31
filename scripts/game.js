function startGame() {
    canvas.addEventListener('click', onTileClick, false);
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
    else {
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
}