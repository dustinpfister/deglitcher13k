/*
 *    glitch.js for deglitcher13k
 *    Copyright 2016 by Dustin Pfister (GPL v3)
 *
 *    used for glitch effects based on the number of glitches.
 *
 */

var glitchIt = (function () {

    var effects = [

        function () {

            var roll;

            this.buttons.forEach(function (button) {

                roll = Math.random();

                if (roll > 0.5) {

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

        effects[0].call(game.pubState);

    };

}

    ());
