"use strict";
var DoodleSpace;
(function (DoodleSpace) {
    var ƒ = FudgeCore;
    class Player extends DoodleSpace.BaseEntity {
        constructor(_x, _y) {
            super("Player", new ƒ.Color(0, 1, 0, 1), _x, _y, 1, 1);
        }
    }
    DoodleSpace.Player = Player;
})(DoodleSpace || (DoodleSpace = {}));
//# sourceMappingURL=Player.js.map