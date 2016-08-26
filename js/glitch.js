/*
 *    glitch.js for deglitcher13k
 *    Copyright 2016 by Dustin Pfister (GPL v3)
 *
 *    used for glitch effects based on the number of glitches.
 *
 */

var glitchIt = (function () {

    var lastGlitch = new Date(),
    glitchRate = 1000,
    glitchChance = 0,

    effects = [

        // x gets set to 0
        function (button) {

                button.x = 0;

        },

        // random x,y location
        function (button) {

            button.x = Math.round(Math.random() * (640 - button.w));
            button.y = Math.round(Math.random() * (480 - button.h));

        }

    ];

    return function () {

        var roll,

        glitchStart = false,

        maxEffect = Math.floor(game.pubState.level / 100 * 10) + 1;

        if (maxEffect > effects.length) {

            maxEffect = effects.length;

        }

        glitchChance = 0.3 * game.pubState.glitch / game.pubState.gOutOf;

        glitchRate = 1000 + 3000 * (1 - game.pubState.glitch / game.pubState.gOutOf);

        if (new Date() - lastGlitch >= glitchRate) {

            glitchStart = true;
            lastGlitch = new Date();

        }

        game.pubState.buttons.forEach(function (button) {

            // if button.glitched > 0
            if (button.glitched) {

                effects[button.glitched - 1](button);

                button.count -= 1;

                if (button.count <= 0) {

                    button.glitched = 0;

                }

            } else {

                button.setHome();

            }

            if (glitchStart) {

                roll = Math.random();

                if (roll < glitchChance) {

                    //effects[Math.floor(Math.random() * maxEffect)](button);

                    button.glitched = Math.floor(Math.random() * maxEffect) + 1;

                    button.count = 10;

                }
            }

        });

    };

}

    ());
