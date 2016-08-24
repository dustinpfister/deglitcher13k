/*
 *    glitch.js for deglitcher13k
 *    Copyright 2016 by Dustin Pfister (GPL v3)
 *
 *    used for glitch effects based on the number of glitches.
 *
 */

var glitchIt = (function () {

    var lastGlitch = new Date(),
    glitchRate = 500,
    glitchChance = 0.8,

    effects = [

        // x gets set to 0, or home
        function (button) {

            if (button.x === button.homeX) {

                button.x = 10;

            } else {

                button.x = button.homeX;

            }

        },

        // random x,y location
        function (button) {

            button.x = Math.round(Math.random() * (640 - button.w));
            button.y = Math.round(Math.random() * (480 - button.h));

        }

    ];

    return function () {

        var roll,

        maxEffect = Math.floor(game.pubState.level / 100 * 10) + 1;

        if (maxEffect > effects.length) {

            maxEffect = effects.length;

        }

        glitchChance = 0.9 * game.pubState.glitch / game.pubState.gOutOf;

        console.log(glitchChance);

        if (new Date() - lastGlitch >= glitchRate) {

            game.pubState.buttons.forEach(function (button) {

                roll = Math.random();

                if (roll < glitchChance) {

                    effects[Math.floor(Math.random() * maxEffect)](button);

                } else {

                    button.setHome();

                }

            });

            lastGlitch = new Date();

        }

    };

}

    ());
