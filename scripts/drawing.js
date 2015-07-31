function drawInitialTiles() {
    var x,
        y;

    context.fillStyle = 'rgb(107, 187, 201)';
    for (var index in tiles) {
        x = tiles[index].startX;
        y = tiles[index].startY;
        context.fillRect(x, y, tileSize, tileSize);
    }
}

function drawGrayTile(tile) {
    context.fillStyle = 'grey';
    context.fillRect(tile.startX, tile.startY, tileSize, tileSize);
}

function drawTileWithValue(tile) {
    drawGrayTile(tile);
    switch (tile.value) {
        case '*':
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
        default :
            context.fillStyle = 'black';
            break;
    }

    context.font = 'bold 28px Consolas';
    context.fillText(tile.value, tile.startX + 13, tile.startY + 30);
}