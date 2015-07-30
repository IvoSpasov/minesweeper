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

function addListener() {
    canvas.addEventListener('click', onTileClick, false);
}

function onTileClick(event) {
    //console.log('type ' + event.type);
    //console.log('button ' + event.button);
    //console.log('target' + event.target);
    var x = event.clientX,
        y = event.clientY;

    var tile = tiles.find(function (item) {
        return item.startX + bodyMarginInPx + tileSize > x &&
            item.startY + bodyMarginInPx + tileSize > y;
    });

    if (tile) {
        context.fillStyle = 'grey';
        context.fillRect(tile.startX, tile.startY, tileSize, tileSize);
        context.fillStyle = 'blue';
        context.font = 'bold 28px Consolas';
        context.fillText(tile.value, tile.startX + 13, tile.startY + 30);
    }
}

function draw() {
    drawTiles();
    addListener();
}