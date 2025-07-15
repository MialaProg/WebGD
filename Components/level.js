var Level = {
    x: 0,
    y: 90,

    data: {},

    init: () => {
        Level.createXLine(0, 15, 98, 'black');
        Level.createXLine(0, 15, 99, 'black');
    },

    createXLine: (xi, xf, y, item) => {
        for (let x = xi; x < xf; x++) {
            Level.data[[x, y]] = item;
        }
    },

    move: (delta) => {

    },

    draw: () => {
        const maxX = Math.ceil(Level.x) + 20;
        const maxY = Math.ceil(Level.y) + 10;
        for (let x = Math.floor(Level.x); x < maxX; x++) {
            for (let y = Math.floor(Level.y); y < maxY; y++) {
                const data = Level.data[[x,y]];
                if (!data) continue;
                Canvas.drawRect((x - Level.x)/10, (y-Level.y)/10, .05, .1, data);
            }
        }
    }
}



var LevelJSLoaded = true;