"use strict";
var DoodleSpace;
(function (DoodleSpace) {
    var ƒ = FudgeCore;
    class PlayerProjectiles extends ƒ.Node {
        constructor() {
            super("Player Projectiles");
            this.deleteAt = 33;
        }
        spawnProjectilePlayer(_playerObject) {
            this.addChild(new PlayerProjectile(_playerObject.mtxLocal.translation.x + 1, _playerObject.mtxLocal.translation.y));
        }
        handleMovement(_speed) {
            let projectiles = this.getChildren();
            const projectileOffset = _speed * ƒ.Loop.timeFrameReal / 1000;
            for (let i = 0; i < projectiles.length; i++) {
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
        constructor(_soundPath) {
            super("Enemy Projectiles");
            this.deleteAt = 0;
            this.soundPath = _soundPath;
        }
        spawnProjectileEnemy(_enemyObject) {
            this.addChild(new EnemyProjectile(_enemyObject.mtxLocal.translation.x - 1, _enemyObject.mtxLocal.translation.y, this.soundPath));
        }
        handleMovement(_speed) {
            let projectiles = this.getChildren();
            const projectileOffset = _speed * ƒ.Loop.timeFrameReal / 1000;
            for (let i = 0; i < projectiles.length; i++) {
                const projectilePos = projectiles[i].getPos();
                if (projectilePos.x <= this.deleteAt) {
                    this.removeChild(projectiles[i]);
                }
                else {
                    projectiles[i].moveBy(new ƒ.Vector2(-projectileOffset, 0));
                }
            }
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
        constructor(_x, _y, _soundPath) {
            super(_x, _y, 1, 0.22, "ProjectileEnemy", 1, "./textures/projectile.png", _soundPath);
            this.sound.volume = 1;
        }
    }
    DoodleSpace.EnemyProjectile = EnemyProjectile;
})(DoodleSpace || (DoodleSpace = {}));
//# sourceMappingURL=Projectiles.js.map