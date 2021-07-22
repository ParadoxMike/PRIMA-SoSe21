"use strict";
var DoodleSpace;
(function (DoodleSpace) {
    var ƒ = FudgeCore;
    class PlayerProjectiles extends ƒ.Node {
        constructor() {
            super("Player Projectiles");
            this.deleteAt = 33;
        }
        getLastProjectile() {
            const projectiles = this.getChildren();
            return this.getChild(projectiles.length - 1);
        }
        spawnProjectilePlayer(_playerObject) {
            if (!this.getLastProjectile()) {
                this.addChild(new PlayerProjectile(_playerObject.mtxLocal.translation.x + 1, _playerObject.mtxLocal.translation.y));
            }
            else if (this.getLastProjectile().mtxLocal.translation.x > _playerObject.mtxLocal.translation.x + 3) {
                this.addChild(new PlayerProjectile(_playerObject.mtxLocal.translation.x + 1, _playerObject.mtxLocal.translation.y));
            }
        }
        handleMovement() {
            let projectiles = this.getChildren();
            for (let i = 0; i < projectiles.length; i++) {
                const projectileOffset = DoodleSpace.gameSpeed * ƒ.Loop.timeFrameReal / 1000;
                const projectilePos = projectiles[i].getPos();
                if (projectilePos.x >= this.deleteAt) {
                    this.removeChild(projectiles[i]);
                }
                else {
                    projectiles[i].moveBy(new ƒ.Vector2(projectileOffset, 0));
                }
            }
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
            super(_x, _y, 1, 0.22, "ProjectilePlayer", 1, "./textures/projectile.png");
        }
    }
    DoodleSpace.PlayerProjectile = PlayerProjectile;
    class EnemyProjectile extends DoodleSpace.BaseEntity {
        constructor(_x, _y) {
            super(_x, _y, 1, 0.22, "ProjectileEnemy", 1, "./textures/projectile.png");
        }
    }
    DoodleSpace.EnemyProjectile = EnemyProjectile;
})(DoodleSpace || (DoodleSpace = {}));
//# sourceMappingURL=Projectiles.js.map