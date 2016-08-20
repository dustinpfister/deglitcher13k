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

        wave : 1,
        glitch : 100,

        selfFixTime : 10000,
        selfFixProgress : 0

    },

    // public API
    pubAPI = {

        pubState : pubState,

        // if you want a job done right, you need to do it yourself.
        fix : (function () {

            var startTime = new Date(0),
            fixing = false;

            return {

                start : function () {

                    if (!fixing) {

                        fixing = true;

                        startTime = new Date();

                    }

                },

                tick : function () {

                    var now = new Date();

                    if (fixing) {

                        pubState.selfFixProgress = (now - startTime) / pubState.selfFixTime;

                        pubState.selfFixProgress = pubState.selfFixProgress > 1 ? 1 : pubState.selfFixProgress;

                        if (pubState.selfFixProgress === 1) {

                            pubState.glitch -= 1;
                            fixing = false;

                        }

                    }

                }

            };

        }
            ()),

        update : function () {

            this.fix.tick();

        }

    };

    return pubAPI;

}
    ());
