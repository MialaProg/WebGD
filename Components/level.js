var Level = {
    x: 0,
    y: 9.0,
    followF: 1,

    data: {},

    init: async () => {
        Level.data = JSON.parse(await getDb('./Assets/Levels/default.db.mi'));
        // Level.createXLine(0, 15, 98, 'black');
        // Level.createXLine(0, 15, 99, 'black');
    },

    createXLine: (xi, xf, y, item) => {
        for (let x = xi; x < xf; x++) {
            Level.data[[x, y]] = item;
        }
    },

    move: (delta) => {
        const [dx,dy]=[
            (Player.x - .8 - Level.x)/Level.followF,
            (Player.y - .7 - Level.y)/Level.followF
        ]
        Level.x += dx;
        Level.y += dy;
    },

    draw: () => {
        const lvlX = 10*Level.x;
        const lvlY = 10*Level.y;
        const maxX = Math.ceil(lvlX) + 20;
        const maxY = Math.ceil(lvlY) + 10;
        for (let x = Math.floor(lvlX); x < maxX; x++) {
            for (let y = Math.floor(lvlY); y < maxY; y++) {
                const data = Level.data[[x,y]];
                if (!data) continue;
                Canvas.drawRect(.5*(x*.1 - Level.x), y*.1-Level.y, .051, .11, data, 'green');
            }
        }
    }
}



var LevelJSLoaded = true;