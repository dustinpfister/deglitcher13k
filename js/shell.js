/*
 *    shell.js for deglitcher13k
 *    Copyright 2016 by Dustin Pfister (GPL v3)
 *
 *    Hello I am shell.js, I am just a simple custom framework for deglitcher13k!
 *    I have stuff that might be used accross one or more modules that depend on me.
 *    As of this writing control.js uses me at least.
 *
 */

var Shell = (function () {

    var pubAPI = {

        // your basic bounding box collision detection
        boundingBox : function (x1, y1, w1, h1, x2, y2, w2, h2) {

            // if the two objects do not overlap
            if ((x1 > x2 + w2) || (x1 + w1 < x2) || (y1 + h1 < y2) || (y1 > y2 + h2)) {

                //then they do not overlap
                return false;

            }

            // else they do
            return true;

        },

        // Button Constructor.
        Button : function (id,x,y,w,h) {

            this.id = id;
            this.disp = this.id;

            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;

        }

    };

    return pubAPI;

}
    ());
