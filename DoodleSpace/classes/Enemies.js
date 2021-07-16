"use strict";
var DoodleSpace;
(function (DoodleSpace) {
    class EnemyType00 extends DoodleSpace.BaseEntity {
        constructor(_number, _x, _y) {
            super(_x, _y, 1, 1, "EnemyType00 No" + _number);
        }
    }
    DoodleSpace.EnemyType00 = EnemyType00;
})(DoodleSpace || (DoodleSpace = {}));
//# sourceMappingURL=Enemies.js.map