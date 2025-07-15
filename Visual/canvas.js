// V1.1.BL
// From: V1.EDDG

// The canvas is as a grid of 1x1.
var Canvas = {
    wait : false,

    init: (id = 'board') => {
        Canvas.HTMLE = document.getElementById(id);
        Canvas.ctx = Canvas.HTMLE.getContext("2d");
        window.addEventListener("resize", Canvas.Resize);
        Canvas.clearHistory();
        Canvas.Resize();
    },

    Resize: () => {
        Canvas.HTMLE.height = window.innerHeight;
        Canvas.HTMLE.width = window.innerWidth;
        Canvas.redraw();
    },

    clearHistory: () => {
        Canvas.history = [];
        Canvas.drawID = 0;
    },

    clear:()=> {
        Canvas.ctx.clearRect(0, 0, Canvas.HTMLE.width, Canvas.HTMLE.height);
        Canvas.clearHistory();
    },

    redraw: () => {
        const savedHistory = [...Canvas.history];
        Canvas.clear();
        // [func, [params]]
        savedHistory.forEach(action => {
            let params = "";
            action[1].forEach(parameter => {
                params += "," + JSON.stringify(parameter);
            });
            try {
                eval("Canvas." + action[0] + "(" + params.slice(1) + ")");
            } catch (e) {
                console.error(e);
            }
        });
        Canvas.history = savedHistory;
    },

    // Méthodes internes pour gérer les styles
    _saveStyles: () => {
        Canvas.ctx.save();
        Canvas._originalFill = Canvas.ctx.fillStyle;
        Canvas._originalStroke = Canvas.ctx.strokeStyle;
        Canvas._originalFilter = Canvas.ctx.filter;
    },

    _restoreStyles: () => {
        Canvas.ctx.fillStyle = Canvas._originalFill;
        Canvas.ctx.strokeStyle = Canvas._originalStroke;
        Canvas.ctx.filter = Canvas._originalFilter;
        Canvas.ctx.restore();
    },

    drawRect: async (x, y, w, h, fillClr, strokeClr, lineW) => {
        Canvas.history.push(['drawRect', [x, y, w, h, fillClr, strokeClr, lineW]]);
        const uid = Canvas.history.length;

        const px = x * Canvas.HTMLE.width;
        const py = y * Canvas.HTMLE.height;
        const width = w * Canvas.HTMLE.width;
        const height = h * Canvas.HTMLE.height;
        const dx = px - width / 2;
        const dy = py - height / 2;

        const timer = Date.now() + 5000;
        if (Canvas.wait) await wait(() => Canvas.drawID === uid || Date.now() > timer, 1);

        Canvas._saveStyles();
        if (fillClr) {
            Canvas.ctx.fillStyle = fillClr;
            Canvas.ctx.fillRect(dx, dy, width, height);
        }
        if (strokeClr) {
            Canvas.ctx.strokeStyle = strokeClr;
            Canvas.ctx.lineWidth = lineW;
            Canvas.ctx.strokeRect(dx, dy, width, height);
        }
        Canvas._restoreStyles();

        Canvas.drawID += 1;
    },

    drawImage: async (x, y, w, h, image, rounded, fillClr) => {
        Canvas.history.push(['drawImage', [x, y, w, h, imgName, rounded, fillClr]]);
        const uid = Canvas.history.length;

        if (typeof image === 'string') {
            const img = Assets.get(image, 'Image');
            const timer = Date.now() + 5000;
            if (Canvas.wait) await Assets.isAvaible(image, 1);
            if (Canvas.wait) await wait(() => Canvas.drawID === uid || Date.now() > timer, 1);
            Canvas.drawID += 1;
            if (!img.isLoaded) return;
            image = img;
        }

        Canvas._saveStyles();

        const px = x * Canvas.HTMLE.width;
        const py = y * Canvas.HTMLE.height;
        const maxWidth = w * Canvas.HTMLE.width;
        const maxHeight = h * Canvas.HTMLE.height;

        const ratio = Math.min(
            maxWidth / image.naturalWidth,
            maxHeight / image.naturalHeight
        );

        w = image.naturalWidth * ratio;
        h = image.naturalHeight * ratio;
        [x, y, w, h] = [px - w / 2, py - h / 2, w, h].map(coord => Math.round(coord));

        if (fillClr) {
            Canvas.ctx.filter = `hue-rotate(${fillClr})`;
        }

        if (x < 0 || y < 0) console.errror('Canvas: x|y<0 (enter the middle)');

        console.log('DrawImage', x, y, w, h);
        console.log(image);

        if (rounded) {
            // Calculate radius as 10% of the smaller dimension
            const radius = Math.min(w, h) * 0.1;
            // Create rounded rectangle path
            Canvas.ctx.beginPath();
            Canvas.ctx.moveTo(x + radius, y);
            Canvas.ctx.lineTo(x + w - radius, y);
            Canvas.ctx.arcTo(x + w, y, x + w, y + radius, radius);
            Canvas.ctx.lineTo(x + w, y + h - radius);
            Canvas.ctx.arcTo(x + w, y + h, x + w - radius, y + h, radius);
            Canvas.ctx.lineTo(x + radius, y + h);
            Canvas.ctx.arcTo(x, y + h, x, y + h - radius, radius);
            Canvas.ctx.lineTo(x, y + radius);
            Canvas.ctx.arcTo(x, y, x + radius, y, radius);
            Canvas.ctx.closePath();
            Canvas.ctx.clip();
        }

        Canvas.ctx.drawImage(
            image, x, y, w, h
        );

        Canvas._restoreStyles();
    }


}




var CanvasJSLoaded = true;
