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

            var roll = Math.random();

            if (roll > 0.5) {

                if (this.buttons[0].x === this.buttons[0].homeX) {

                    this.buttons[0].x = 10;

                } else {

                    this.buttons[0].x = this.buttons[0].homeX;

                }

            }

        }

    ];

    return function () {

        effects[0].call(game.pubState);

    };

}

    ());
