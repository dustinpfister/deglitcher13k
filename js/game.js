/*
 *    game.js for deglitcher13k
 *    Copyright 2016 by Dustin Pfister (GPL v3)
 *
 *    game.js contains the game model, that is updated, and rendered.
 *
 */

var game = (function () {

    // public state
    var pubState = {

        wave : 1,  // wave and glitch are set by setWave helper
        glitch : 0,

        selfFixTime : 1000,
        selfFixProgress : 0

    },

    // set the game to the given wave
    setWave = function (wave) {

        pubState.wave = wave;
        pubState.glitch = 5 * wave + Math.pow(2, wave - 1);

    },

    // what to do on a win
    onWin = function () {

        pubState.wave += 1;

        setWave(pubState.wave);

    },

    // public API
    pubAPI = {

        pubState : pubState,

        // deglitch a count of glitches
        deglitch : function (count) {

            if (typeof count === 'number' && count > 0) {

                if (pubState.glitch > count) {

                    pubState.glitch -= count;

                } else {

                    pubState.glitch = 0;

                }

                if (pubState.glitch === 0) {

                    onWin();

                }

            }

        },

        // if you want a job done right, you need to do it yourself.
        fix : (function () {

            var startTime = new Date(0),
            fixing = false,

            // game.fix() will start a new fix if one is not in progress.
            pub = function () {

                if (!fixing) {

                    fixing = true;

                    startTime = new Date();

                }

            };

            // what to do on each frame tick
            pub.tick = function () {

                var now = new Date();

                if (fixing) {

                    pubState.selfFixProgress = (now - startTime) / pubState.selfFixTime;

                    pubState.selfFixProgress = pubState.selfFixProgress > 1 ? 1 : pubState.selfFixProgress;

                    if (pubState.selfFixProgress === 1) {

                        pubAPI.deglitch(1);
                        fixing = false;
                        pubState.selfFixProgress = 0;

                    }

                }
            };

            return pub;

        }
            ()),

        update : function () {

            this.fix.tick();

        }

    };

    // defaut to wave 1
    setWave(1);

    return pubAPI;

}
    ());
