var canvas = document.getElementById('mines-canvas');
var canvasCtx = canvas.getContext('2d');


function main() {
    var horizontalTiles = 10,
        verticalTiles = 10,
        numberOfTiles = horizontalTiles * verticalTiles;
    drawTiles();
}

function drawTiles(horizontalTiles, verticalTiles) {
    horizontalTiles = horizontalTiles || 10;
    verticalTiles = verticalTiles || 10;
    var numberOfTiles = horizontalTiles * verticalTiles,
        tileSize = 30,
        tileStartPositionX = 5,
        tileStartPositionY = tileStartPositionX,
        tileStep = tileSize + tileStartPositionX;


    for (var i = 1; i <= numberOfTiles; i += 1) {
        canvasCtx.fillRect(tileStartPositionX, tileStartPositionY, tileSize, tileSize);
        tileStartPositionX += tileStep;
        if (i % horizontalTiles === 0) {
            tileStartPositionX = 5;
            tileStartPositionY += tileStep;
        }
    }
}

main();