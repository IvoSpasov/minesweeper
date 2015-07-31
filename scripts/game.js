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
    drawGrayTile(tile);

    if (tile.value === 0) {
        //drawGrayTile(tile);
    }
    else {
        fillTileWithValue(tile);
    }
}

//function showAllTilesWithoutValue(tileWithoutValue) {
//    var row = tileWithoutValue.row,
//        col = tileWithoutValue.col,
//        currentRow = row,
//        currentCol = col,
//        currentTile,
//        isInBoard;
//
//    while (true) {
//        currentRow -= 1;
//        currentCol -= 1;
//        isInBoard = 0 <= currentRow && currentRow < verticalTiles &&
//            0 <= currentCol && currentCol < horizontalTiles;
//
//        if (!isInBoard) {
//            break;
//        }
//
//        currentTile = tiles.find(function (tile) {
//            return tile.row === currentRow && tile.col === currentCol;
//        });
//
//        drawGrayTile(currentTile);
//
//        if (board[currentRow][currentCol] !== 0) {
//            fillTileWithValue(currentTile);
//            break;
//        }
//    }
//}

function showAllTilesWithoutValue(row, col){

}