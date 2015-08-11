var canvas = document.getElementById('mines-canvas'),
    context = canvas.getContext('2d'),
    valueXOffset = 13,
    valueYOffset = 30,
    fontStyle = 'bold 28px Consolas';

function drawOneTile(tile, isGrey) {
    if (isGrey) {
        context.fillStyle = 'grey';
    }
    else {
        context.fillStyle = 'rgba(146, 186, 209, 1)'; //'rgb(107, 187, 201)';
    }

    context.fillRect(tile.startX, tile.startY, tileSize, tileSize);
}

function drawInitialTiles() {
    // clear canvas when starting new game
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (var index in tiles) {
        drawOneTile(tiles[index], false);
    }
}

function drawTileWithValue(tile) {
    drawOneTile(tile, true);
    switch (tile.value) {
        case mineSymbol:
            context.fillStyle = 'red';
            break;
        case 1:
            context.fillStyle = 'blue';
            break;
        case 2:
            context.fillStyle = 'green';
            break;
        case 3:
            context.fillStyle = 'yellow';
            break;
        case 4:
            context.fillStyle = 'purple';
            break;
        case 5:
            context.fillStyle = 'orange';
            break;
        default :
            context.fillStyle = 'black';
            break;
    }

    context.font = fontStyle;
    context.fillText(tile.value, tile.startX + valueXOffset, tile.startY + valueYOffset);
}

function drawMineFlag(tile) {
    context.fillStyle = 'red';
    context.font = fontStyle;
    context.fillText('M', tile.startX + valueXOffset, tile.startY + valueYOffset);
}