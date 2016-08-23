/*
 *    render.js for deglitcher13k
 *    Copyright 2016 by Dustin Pfister (GPL v3)
 *
 *    used for rendering to a canvas.
 *
 */

var render = (function () {

    var canvas, // canvas dom ref
    ctx, // 2d context
    con, // container

    // the default style
    defaultStyle = function () {

        // default style

        // just bg and fg colors
        ctx.fillStyle = '#000000';
        ctx.strokeStyle = '#00ffff';

        // text
        ctx.font = '20px courier';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'center'

    },

    // clear method
    cls = function () {

        defaultStyle();

        ctx.fillRect(0, 0, canvas.width, canvas.height);

    },

    // draw methods for each machine state
    states = {

        start : function () {},

        title : function () {

            ctx.strokeText('deglitcher13k.', canvas.width / 2, 100);

            ctx.strokeText('(click screen)', canvas.width / 2, 200);

        },

        game : function () {

            var state = game.pubState;

            // fix yourself
            ctx.strokeRect(10, 400, 64, 64);
            ctx.strokeText('fix', 42, 420);

            // self fix bar(s)
            ctx.fillStyle = 'rgba(0,255,255,.2)';
            state.selfFix.current.forEach(function (fix) {

                ctx.fillRect(0, 470, 640 * fix.progress, 10);

            });

            // workers
            ctx.fillStyle = 'rgba(255,255,255,.2)';
            state.workers.current.forEach(function (worker) {

                ctx.fillRect(0, 470, 640 * worker.progress, 10);

            });

            ctx.textAlign = 'left';
            ctx.strokeText('wave:' + state.wave+';', 10, 20);
            ctx.strokeText('level : '+state.level+', exp: ' + state.exp+';', 10, 40);
            ctx.strokeText('glitches: ' + state.glitch+';', 10, 60);

        }
    },

    // the public API that will be returned to the canvas global variable
    pubAPI = {

        // the main draw method that will be called on each tick
        draw : function () {

            cls();

            states[main.getState()]();

        },

        // setup with new canvas element, and append to the element of the given id
        setup : function (id, w, h) {

            con = document.getElementById(id),

            canvas = document.createElement('canvas'),

            ctx = canvas.getContext('2d');

            canvas.width = w;
            canvas.height = h;

            con.appendChild(canvas);

            cls();

            control.attachEvents(canvas);

        }

    };

    // return the public API to the canvas global vaibale
    return pubAPI;

}
    ());
