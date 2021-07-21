"use strict";
var DoodleSpace;
(function (DoodleSpace) {
    var ƒ = FudgeCore;
    class PlayerProjectiles extends ƒ.Node {
        constructor() {
            super("Player Projectiles");
        }
        spawnProjectilePlayer(playerObject) {
            this.addChild(new PlayerProjectile(playerObject.mtxLocal.translation.x + 1, playerObject.mtxLocal.translation.y));
        }
    }
    DoodleSpace.PlayerProjectiles = PlayerProjectiles;
    class EnemyProjectiles extends ƒ.Node {
        constructor() {
            super("Enemy Projectiles");
        }
    }
    DoodleSpace.EnemyProjectiles = EnemyProjectiles;
    class PlayerProjectile extends DoodleSpace.BaseEntity {
        constructor(_x, _y) {
            super(_x, _y, 1, 0.22, "ProjectilePlayer", "./textures/projectile.png");
        }
    }
    class EnemyProjectile extends DoodleSpace.BaseEntity {
        constructor(_x, _y) {
            super(_x, _y, 1, 0.22, "ProjectileEnemy", "./textures/projectile.png");
        }
    }
})(DoodleSpace || (DoodleSpace = {}));
//# sourceMappingURL=Projectiles.js.map