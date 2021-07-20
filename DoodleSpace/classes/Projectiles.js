"use strict";
var DoodleSpace;
(function (DoodleSpace) {
    class ProjectilePlayer extends DoodleSpace.BaseEntity {
        constructor(_number, _x, _y) {
            super(_x, _y, 1, 0.22, "ProjectilePlayer No" + _number, "./textures/projectile.png");
        }
    }
    DoodleSpace.ProjectilePlayer = ProjectilePlayer;
    class ProjectileEnemy extends DoodleSpace.BaseEntity {
        constructor(_number, _x, _y) {
            super(_x, _y, 1, 0.22, "ProjectileEnemy No" + _number, "./textures/projectile.png");
        }
    }
    DoodleSpace.ProjectileEnemy = ProjectileEnemy;
})(DoodleSpace || (DoodleSpace = {}));
//# sourceMappingURL=Projectiles.js.map