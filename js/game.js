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
        level : 1,
        glitch : 0,
        exp : 0, //Math.pow(10,9),
        // one billion dollars! ( places pinkie up near mouth )
        //maxExp : 100000000000,
        maxExp : Math.pow(10,9),

        //selfFix
        selfFix : {

            maxTime : 10000,
            maxCount : 1,
            last : new Date(0),
            multi : false,
            delay : 300,
            inProgress : []

        },

        workers : {

            current : []// current list of workers

        }

    },

    // pubState method (used with call): set's self fix values by amount of exp made
    setByExp = function () {

        // progress by Math.log
        var logPro = Math.log(this.exp) / Math.log(this.maxExp);

        // no -Infinity if exp is zero
        logPro = logPro < 0 ? 0 : logPro;

		console.log(logPro)
		
        this.level = Math.floor(499 * logPro * logPro) + 1;
        this.selfFix.maxCount = Math.floor(9 * logPro) + 1;

    }

    // pubState method (used with call): set the game to the given wave
    setWave = function (wave) {

        this.wave = wave;
        this.glitch = 5 * wave + Math.pow(2, wave - 1);

    },

    // pubState method (used with call): what to do on a win
    onWin = function () {

        this.wave += 1;

        this.selfFix.inProgress = [];

        setWave.call(this, this.wave);

    },

    // public API
    pubAPI = {

        pubState : pubState,

        // deglitch a count of glitches
        deglitch : function (count) {

            if (typeof count === 'number' && count > 0) {

                if (pubState.glitch >= count) {

                    pubState.glitch -= count;

                    pubState.exp += count;

                } else {

                    pubState.exp += pubState.glitch;

                    pubState.glitch = 0;

                }

                if (pubState.exp > 1000000000) {
                    pubState.exp = 1000000000;
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

                var fixTime = pubState.selfFix.maxTime,
                fixPer;

                if (new Date() - pubState.selfFix.last >= pubState.selfFix.delay) {

                    if (pubState.selfFix.inProgress.length < pubState.selfFix.maxCount) {

                        if (pubState.selfFix.multiBonus) {

                            fixPer = pubState.selfFix.inProgress.length / pubState.selfFix.maxCount;

                            fixTime = pubState.selfFix.maxTime - pubState.selfFix.maxTime * .90 * fixPer;

                        }

                        pubState.selfFix.inProgress.push(new SelfFix(fixTime));

                    }

                    pubState.selfFix.last = new Date();

                }

            };

            // what to do on each frame tick
            pub.tick = function () {

                var i = pubState.selfFix.inProgress.length,
                selfFix;
                while (i--) {

                    selfFix = pubState.selfFix.inProgress[i];

                    selfFix.update();

                    if (selfFix.progress === 1) {

                        pubAPI.deglitch(1);

                        // purge
                        pubState.selfFix.inProgress.splice(i, 1);

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

            //setSelfByExp();

            setByExp.call(pubState);

            if (pubState.glitch === 0) {

                onWin.call(pubState);

            }

        }

    };

    // defaut to wave 1
    setWave.call(pubState, 1);

    // return the public API to the game global variable
    return pubAPI;

}
    ());
