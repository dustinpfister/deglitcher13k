/*
 *    main.js for deglitcher13k
 *    Copyright 2016 by Dustin Pfister (GPL v3)
 *
 *    main.js contains the main app state machine, and game loop.
 *    yes as the name sugests this is where it all begins.
 *
 */

var main = (function () {

    // the current app state
    var current = 'start',

    // does the states first run methond need to be called before moving onto the first tick?
    firstRun = true,

    // frame rate
    lastTick = new Date(0),
    tickRate = 40,

    // what needs to happen on any state change
    stateChange = function (state) {

        current = state;
        firstRun = true;

    },

    // main app state machine
    state = {

        // start state is called just once
        start : {

            // what needs to happen before we start the app
            firstRun : function () {

                console.log('start state first run:');

                render.setup('gamearea', 640, 480);

            },

            // if we make it here change over to title state
            tick : function () {

                stateChange('game');

            }

        },

        // the actual game state
        title : {

            // set up a new game
            firstRun : function () {

                console.log('title state first run:');

            },

            // what to do for each tick durring the game state
            tick : function () {}

        },

        // the actual game state
        game : {

            // set up a new game
            firstRun : function () {

                console.log('game state first run:');

            },

            // what to do for each tick durring the game state
            tick : function () {

                game.update();

            }

        }

    },

    // main app loop
    loop = function () {

        var now = new Date();

        requestAnimationFrame(loop);

        // is this a first run?
        if (firstRun) {

            state[current].firstRun();

            firstRun = false;

        }

        // is it time to update, and render?
        if (now - lastTick > tickRate) {

            // update model
            state[current].tick();

            // render model
            render.draw();

            // update lastTick to now
            lastTick = now;

        }

    };

    // return a public API
    return {

        // this can be used to change state from control.js
        stateChange : function (state) {

            stateChange(state);

        },

        // get the current app state (used by render.js, and control.js)
        getState : function () {

            return current;

        },

        // start the state machine
        start : function () {

            loop();

        }

    };

}
    ());

// hold onto your butts...
main.start();
