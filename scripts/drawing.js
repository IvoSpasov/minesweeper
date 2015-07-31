function drawTiles() {
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

function fillTileWithValue(tile) {
    context.fillStyle = 'blue';
    context.font = 'bold 28px Consolas';
    context.fillText(tile.value, tile.startX + 13, tile.startY + 30);
}

function draw() {
    drawTiles();
}