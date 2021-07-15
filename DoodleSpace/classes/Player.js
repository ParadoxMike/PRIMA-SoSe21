"use strict";
var DoodleSpace;
(function (DoodleSpace) {
    class Player extends DoodleSpace.BaseEntity {
        constructor(_x, _y) {
            super(_x, _y, 1, 1, "Player");
        }
    }
    DoodleSpace.Player = Player;
})(DoodleSpace || (DoodleSpace = {}));
//# sourceMappingURL=Player.js.map