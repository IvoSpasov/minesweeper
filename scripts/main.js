var canvas = document.getElementById('mines-canvas');
var context = canvas.getContext('2d');


function main() {
    var horizontalTiles = 10,
        verticalTiles = 10;
    drawTilesAnimated(horizontalTiles, verticalTiles);

    displayNumberOfMines();
}

function drawTiles(horizontalTiles, verticalTiles) {
    horizontalTiles = horizontalTiles || 10;
    verticalTiles = verticalTiles || 10;

    var numberOfTiles = horizontalTiles * verticalTiles,
        tileSize = 40,
        tileStartPositionX = 5,
        tileStartPositionY = tileStartPositionX,
        tileStep = tileSize + tileStartPositionX;

    context.fillStyle = 'rgb(107, 187, 201)';
    for (var i = 1; i <= numberOfTiles; i += 1) {
        context.fillRect(tileStartPositionX, tileStartPositionY, tileSize, tileSize);
        tileStartPositionX += tileStep;
        if (i % horizontalTiles === 0) {
            tileStartPositionX = 5;
            tileStartPositionY += tileStep;
        }
    }
}

function drawTilesAnimated(horizontalTiles, verticalTiles) {
    horizontalTiles = horizontalTiles || 10;
    verticalTiles = verticalTiles || 10;

    var numberOfTiles = horizontalTiles * verticalTiles,
        tileSize = 40,
        tileStartPositionX = 5,
        tileStartPositionY = tileStartPositionX,
        tileStep = tileSize + tileStartPositionX,
        i = 1;
    
    function animate() {
        context.fillStyle = 'rgb(107, 187, 201)';
        context.fillRect(tileStartPositionX, tileStartPositionY, tileSize, tileSize);
        tileStartPositionX += tileStep;
        if (i % horizontalTiles === 0) {
            tileStartPositionX = 5;
            tileStartPositionY += tileStep;
        }

        if (i < numberOfTiles) {
            setTimeout(animate, 5);
        }

        i += 1;
    }

    animate();
}


function displayNumberOfMines() {
    context.fillStyle = 'black';
    context.font = '28px Arial';
    context.fillText('1', 20, 30);
}

main();