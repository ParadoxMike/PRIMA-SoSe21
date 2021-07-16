"use strict";
var TexureDemo;
(function (TexureDemo) {
    // import ƒ = FudgeCore;
    class Player extends TexureDemo.BaseEntity {
        constructor(_x, _y) {
            super(_x, _y, 1, 1, "Player");
        }
    }
    TexureDemo.Player = Player;
})(TexureDemo || (TexureDemo = {}));
//# sourceMappingURL=Player.js.map