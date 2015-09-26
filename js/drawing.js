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
    // gradient from top to bottom
    var gradient = context.createLinearGradient(tile.startXinPx, tile.startYinPx, tile.startXinPx, tile.startYinPx + tileSizeInPx);

    if (isOpened) {
        // grey
        gradient.addColorStop(0, "rgb(138, 145, 150)");
        gradient.addColorStop(0.6, "rgb(122, 130, 136)");
        gradient.addColorStop(1, "rgb(112, 120, 125)");
    }
    else {
        // blue
        gradient.addColorStop(0, "rgb(116, 202, 227)");
        gradient.addColorStop(0.6, "rgb(91, 192, 222)");
        gradient.addColorStop(1, "rgb(74, 185, 219)");
    }

    context.fillStyle = gradient;
    context.fillRect(tile.startXinPx, tile.startYinPx, tileSizeInPx, tileSizeInPx);
}

function drawInitialTiles(tiles, tileSizeInPx) {
    // clear canvas when starting new game
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (var index in tiles) {
        drawSingleTile(tiles[index], tileSizeInPx, false);
    }
}

function calculateValueOffsets(tileSizeInPx) {
    var fontSize;
    valueXOffset = tileSizeInPx / 3.3;
    valueYOffset = tileSizeInPx / 1.4;
    fontSize = tileSizeInPx / 1.4;

    fontStyle = 'bold ' + fontSize + 'px Consolas';
}

function drawTileWithValue(tile, settings) {
    drawSingleTile(tile, settings.tileSizeInPx, true);
    switch (tile.value) {
        case settings.mineSymbol:
            context.fillStyle = 'rgb(236, 72, 68)'; // red
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
    context.fillStyle = 'rgb(236, 72, 68)'; // red
    context.font = fontStyle;
    context.fillText('M', tile.startXinPx + valueXOffset, tile.startYinPx + valueYOffset);
}