/*
 *    glitch.js for deglitcher13k
 *    Copyright 2016 by Dustin Pfister (GPL v3)
 *
 *    used for glitch effects based on the number of glitches.
 *
 */

var glitchIt = (function () {

    var lastGlitch = new Date(),
    glitchRate = 100,

    effects = [

        function (button) {

            var roll;

            roll = Math.random();

            if (roll > 0.9) {

                if (button.x === button.homeX) {

                    button.x = 10;

                } else {

                    button.x = button.homeX;

                }

            }

        }

    ];

    return function () {

        if (new Date() - lastGlitch >= glitchRate) {

            game.pubState.buttons.forEach(function (button) {

                effects[0](button);

            });

            lastGlitch = new Date();

        }

    };

}

    ());
