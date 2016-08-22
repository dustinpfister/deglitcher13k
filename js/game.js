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
        exp : 0,
        // one billion dollars! ( places pinkie up near mouth )
        maxExp : 1000000000,

        /*
        selfFixMaxTime : 20000,
        selfFixMax : 1,
        selfFixLast : new Date(0),
        selfFixMultiBonus : false,
        selfFixDelay : 300,
        selfFix : [],
         */

        selfFix : {

            maxTime : 20000,
            maxCount : 1,
            last : new Date(0),
            multi : false,
            delay : 300,
            inProgress : []

        },

        // set self fix values by amount of exp made
        setByExp : function () {

            // progress by Math.log
            var logPro = Math.log(this.exp) / Math.log(this.maxExp);

            // no -Infinity if exp is zero
            logPro = logPro < 0 ? 0 : logPro;

            this.selfFix.maxCount = Math.floor(9 * logPro) + 1;

        }

    },

	/*
    // set self fix values by amount of exp made
    setSelfByExp = function () {

        // progress by Math.log
        var logPro = Math.log(pubState.exp) / Math.log(maxExp);

        // no -Infinity if exp is zero
        logPro = logPro < 0 ? 0 : logPro;

        pubState.selfFixMax = Math.floor(9 * logPro) + 1;

    },

	*/
	
    // set the game to the given wave
    setWave = function (wave) {

        pubState.wave = wave;
        pubState.glitch = 5 * wave + Math.pow(2, wave - 1);

    },

    // what to do on a win
    onWin = function () {

        pubState.wave += 1;

        pubState.selfFix.inProgress = [];

        setWave(pubState.wave);

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

            pubState.setByExp();

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
