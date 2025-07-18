
var Player = {
    x: .4,
    y: 9,
    dy: 0,
    dyMax: 9/1000,
    dx: 0,
    deathY: [0, 22],

    death: () => {
        Player.x = .4;
        Player.y = 9;
        Player.dy = 0;
        Player.dx = 0;
        Game.lastTime = performance.now();
        audioActualLevel.currentTime = 0;
        console.error("You're dead");
    },

    move: (delta) => {
        // X move
        Player.dx = (!Game.isEditing || (Game.getState('ArrowRight') - Game.getState('ArrowLeft'))) * Game.velocity || Player.dx * Game.wind
        Player.x += Player.dx * delta;

        // Y move
        const GRAVITY = Game.gravity * (delta ** 2);
        let dyComputed = delta * Player.dy + GRAVITY;
        if (dyComputed > Player.dyMax) dyComputed = Player.dyMax;
        else if (dyComputed < - Player.dyMax) dyComputed = -Player.dyMax;
        Player.dy += GRAVITY;
        if (Player.dy > Player.dyMax) Player.dy = Player.dyMax;
        else if (Player.dy < -Player.dyMax) Player.dy = -Player.dyMax;

        Player.y += dyComputed;

        if (Player.y > Player.deathY[1]
            || Player.y < Player.deathY[0]
            || Game.getState('KeyR')) {
            Player.death();
            return;
        };

        // CONTACT VERIF

        const minCellX = Math.floor(10 * Player.x);
        const minCellY = Math.floor(10 * Player.y);

        const dataAbove = [
            Level.data[[minCellX, minCellY]],
            Level.data[[minCellX + 1, minCellY]]
        ];
        const dataBellow = [
            Level.data[[minCellX, minCellY + 1]],
            Level.data[[minCellX + 1, minCellY + 1]]
        ];
        // const data = dataAbove.concat(dataBellow);

        if (['black'].includes(dataAbove[1])) {
            Player.death();
            return;
        }

        if (dataAbove.includes('red')) {
            Player.death();
            return;
        }

        if (dataBellow.includes('black')) {
            Player.y = minCellY / 10 + .1;
            Player.dy = 0;
        }

        if (dataBellow.includes('black')) {
            Player.y = minCellY / 10;
            Player.dy = Game.getState('ArrowUp') * (-Game.jump);
        }
    },

    draw: () => {
        Canvas.drawRect(.5 * (Player.x - Level.x), Player.y - Level.y, .05, .1, 'orange');
    }
}





var PlayerJSLoaded = true;