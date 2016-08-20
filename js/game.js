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

        wave : 1, // wave and glitch are set by setWave helper
        glitch : 0,

        selfFixMax : 8,
        selfFixLast : new Date(0),
        selfFixMultiBonus : true,
        selfFixDelay : 300,
        selfFix : [],

    },

    // set the game to the given wave
    setWave = function (wave) {

        pubState.wave = wave;
        pubState.glitch = 5 * wave + Math.pow(2, wave - 1);

    },

    // what to do on a win
    onWin = function () {

        pubState.wave += 1;

        pubState.selfFix = [];

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

            }

        },

        // if you want a job done right, you need to do it yourself.
        fix : (function () {

            // self fix constructor
            var SelfFix = function (fixTime) {

                this.startTime = new Date();
                this.fixTime = fixTime;
                this.progress = 0;

            },

            proto = SelfFix.prototype;

            proto.update = function () {

                var now = new Date();

                this.progress = (now - this.startTime) / this.fixTime;

                this.progress = this.progress > 1 ? 1 : this.progress;

            };

            // game.fix() will start a new fix if one is not in progress.
            var pub = function () {

                var fixTime = 20000;

                if (new Date() - pubState.selfFixLast >= pubState.selfFixDelay) {

                    if (pubState.selfFix.length < pubState.selfFixMax) {

                        if (pubState.selfFixMultiBonus) {

                            fixTime = 20000 - 15000 * pubState.selfFix.length / pubState.selfFixMax;

                        }

                        pubState.selfFix.push(new SelfFix(fixTime));

                    }

                    pubState.selfFixLast = new Date();

                }

            };

            // what to do on each frame tick
            pub.tick = function () {

                var i = pubState.selfFix.length,
                selfFix;
                while (i--) {

                    selfFix = pubState.selfFix[i];

                    selfFix.update();

                    if (selfFix.progress === 1) {

                        pubAPI.deglitch(1);

                        // purge
                        pubState.selfFix.splice(i, 1);

                    }

                }

            };

            // return public function to game.fix
            return pub;

        }
            ()),

        // what to do on each frame tick
        update : function () {

            this.fix.tick();

            if (pubState.glitch === 0) {

                onWin();

            }

        }

    };

    // defaut to wave 1
    setWave(1);

    // return the public API to the game global variable
    return pubAPI;

}
    ());
