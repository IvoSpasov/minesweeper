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
    if (!isInBoard(row, col)) {
        return;
    }

    var currentTile = tiles.find(function (tile) {
        return tile.row === row && tile.col === col;
    });

    // if the cell has a number indicating one or more mines
    // draw the tile with the value of mines which was reached
    // and return to find other empty cells
    if (board[row][col] !== 0) {
        if (board[row][col] !== 'v'){
            drawTileWithValue(currentTile);
        }

        return;
    }

    drawGrayTile(currentTile);

    // temporary mark cell as visited
    board[row][col] = 'v';

    // Invoke recursion the explore all possible directions
    showAllTilesWithoutValue(row, col - 1); // left
    showAllTilesWithoutValue(row - 1, col); // up
    showAllTilesWithoutValue(row, col + 1); // right
    showAllTilesWithoutValue(row + 1, col); // down
}