var canvas,
    context,
    valueXOffset = 13,
    valueYOffset = 30,
    fontStyle = 'bold 28px Consolas';

function prepareCanvas(canvasSize) {
    canvas = $('#mines-canvas')
        .attr('width', canvasSize.canvasWidthInPx)
        .attr('height', canvasSize.canvasHeightInPx)[0];

    context = canvas.getContext('2d');
}

function drawSingleTile(tile, tileSizeInPx, isOpened) {
    if (isOpened) {
        context.fillStyle = 'grey';
    }
    else {
        context.fillStyle = 'rgba(146, 186, 209, 1)';
    }

    context.fillRect(tile.startXinPx, tile.startYinPx, tileSizeInPx, tileSizeInPx);
}

function drawInitialTiles(tiles, tileSizeInPx) {
    // clear canvas when starting new game
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (var index in tiles) {
        drawSingleTile(tiles[index], tileSizeInPx, false);
    }
}

function drawTileWithValue(tile, settings) {
    drawSingleTile(tile, settings.tileSizeInPx, true);
    switch (tile.value) {
        case settings.mineSymbol:
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
    context.fillText(tile.value, tile.startXinPx + valueXOffset, tile.startYinPx + valueYOffset);
}

function drawMineFlag(tile) {
    context.fillStyle = 'red';
    context.font = fontStyle;
    context.fillText('M', tile.startXinPx + valueXOffset, tile.startYinPx + valueYOffset);
}