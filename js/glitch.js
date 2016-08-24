/*
 *    glitch.js for deglitcher13k
 *    Copyright 2016 by Dustin Pfister (GPL v3)
 *
 *    used for glitch effects based on the number of glitches.
 *
 */

var glitchIt = (function () {

    var lastGlitch = new Date(),
    glitchRate = 30,

    effects = [

        function () {

            var roll;

            this.buttons.forEach(function (button) {

                roll = Math.random();

                if (roll > 0.9) {

                    if (button.x === button.homeX) {

                        button.x = 10;

                    } else {

                        button.x = button.homeX;

                    }

                }

            });

        }

    ];

    return function () {

        if (new Date() - lastGlitch >= glitchRate) {

            effects[0].call(game.pubState);

            lastGlitch = new Date();

        }

    };

}

    ());
