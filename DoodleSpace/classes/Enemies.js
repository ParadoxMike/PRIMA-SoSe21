"use strict";
var DoodleSpace;
(function (DoodleSpace) {
    class EnemyType00 extends DoodleSpace.BaseEntity {
        constructor(_number, _x, _y) {
            super(_x, _y, 1, 1, "EnemyType00 No" + _number, "./textures/enemy_asteroid.png");
        }
    }
    DoodleSpace.EnemyType00 = EnemyType00;
    class EnemyType01 extends DoodleSpace.BaseEntity {
        constructor(_number, _x, _y) {
            super(_x, _y, 1.6, 1, "EnemyType00 No" + _number, "./textures/enemy_ufo.png");
        }
    }
    DoodleSpace.EnemyType01 = EnemyType01;
})(DoodleSpace || (DoodleSpace = {}));
//# sourceMappingURL=Enemies.js.map