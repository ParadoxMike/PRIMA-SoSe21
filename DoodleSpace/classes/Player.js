"use strict";
var DoodleSpace;
(function (DoodleSpace) {
    class Player extends DoodleSpace.BaseEntity {
        constructor(_x, _y) {
            super(_x, _y, 1.75, 1, "Player", "./textures/player.png");
        }
    }
    DoodleSpace.Player = Player;
})(DoodleSpace || (DoodleSpace = {}));
//# sourceMappingURL=Player.js.map