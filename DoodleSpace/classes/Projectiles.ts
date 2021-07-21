namespace DoodleSpace {
    import ƒ = FudgeCore;

    export class PlayerProjectiles extends ƒ.Node {
        constructor() {
            super("Player Projectiles");
        }

        public spawnProjectilePlayer(playerObject: Player): void {
            this.addChild(new PlayerProjectile(playerObject.mtxLocal.translation.x + 1, playerObject.mtxLocal.translation.y));
        }
    }

    export class EnemyProjectiles extends ƒ.Node {
        constructor() {
            super("Enemy Projectiles")
            
        }
    }

    class PlayerProjectile extends BaseEntity {
        constructor(_x: number, _y: number) {
            super (_x, _y, 1, 0.22, "ProjectilePlayer", "./textures/projectile.png");
        }
    }

    class EnemyProjectile extends BaseEntity {
        constructor(_x: number, _y: number) {
            super (_x, _y, 1, 0.22, "ProjectileEnemy", "./textures/projectile.png");
        }
    }
}