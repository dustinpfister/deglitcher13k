/*
 *    control.js for deglitcher13k
 *    Copyright 2016 by Dustin Pfister (GPL v3)
 *
 *    control.js contains event handlers that are used to change the machine state
 *    as well as game state data.
 *
 */
 
var control = (function () {

    // return a position that is relative to the upper left point of the canvas rather then the window.
    var fixPos = function (e) {

        var box = e.target.getBoundingClientRect(),
        x,
        y;

        if (e.touches) {

            return {

                x : e.touches[0].clientX - box.left,
                y : e.touches[0].clientY - bot.top

            };

        }

        return {

            x : e.clientX - box.left,
            y : e.clientY - box.top

        };

    },

    // control methods for each machine state
    states = {

        start : function (pos, e) {},

        title : function (pos, e) {

            main.stateChange('game');

        },

        game : function (pos, e) {}

    },

    // the public API that is to be returned to the control global
    pubAPI = {

        // attach events to the given canvas
        attachEvents : function (canvas) {

            canvas.addEventListener('mousedown', function (e) {

                var pos = fixPos(e);

                console.log(pos);

                console.log();

                states[main.getState()](pos, e)

            });

        }

    };

    // return the public API to the control global
    return pubAPI;

}
    ());
