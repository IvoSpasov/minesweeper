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

function draw(){
    drawTiles();
}