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
        glitch : 100

    },

    // public API
    pubAPI = {

        pubState : pubState,

        update : function () {}

    };

    return pubAPI;

}
    ());
