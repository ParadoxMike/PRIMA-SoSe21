namespace DoodleSpace {
    import ƒ = FudgeCore;

    export class PlayerProjectiles extends ƒ.Node {
        private deleteAt: number = 33;

        constructor() {
            super("Player Projectiles");
        }

        public spawnProjectilePlayer(_playerObject: Player): void {
            this.addChild(new PlayerProjectile(_playerObject.mtxLocal.translation.x + 1, _playerObject.mtxLocal.translation.y));
        }

        public handleMovement(_speed: number): void {
            let projectiles: PlayerProjectile[] = this.getChildren() as PlayerProjectile[];
            const projectileOffset: number = _speed * ƒ.Loop.timeFrameReal / 1000;

            for (let i = 0; i < projectiles.length; i++) {
                const projectilePos: ƒ.Vector2 = projectiles[i].getPos();
                
                if (projectilePos.x >= this.deleteAt) {
                    this.removeChild(projectiles[i]);
                }
                else {
                    projectiles[i].moveBy(new ƒ.Vector2(projectileOffset, 0));
                }
            }
        }
    }

    export class EnemyProjectiles extends ƒ.Node {
        private deleteAt: number = 0;

        constructor() {
            super("Enemy Projectiles")
            
        }

        public spawnProjectileEnemy(_enemyObject: UFO): void {
            this.addChild(new EnemyProjectile(_enemyObject.mtxLocal.translation.x - 1, _enemyObject.mtxLocal.translation.y));
        }

        public handleMovement(_speed: number): void {
            let projectiles: EnemyProjectile[] = this.getChildren() as EnemyProjectile[];
            const projectileOffset: number = _speed * ƒ.Loop.timeFrameReal / 1000;

            for (let i = 0; i < projectiles.length; i++) {
                const projectilePos: ƒ.Vector2 = projectiles[i].getPos();
                
                if (projectilePos.x <= this.deleteAt) {
                    this.removeChild(projectiles[i]);
                }
                else {
                    projectiles[i].moveBy(new ƒ.Vector2(-projectileOffset, 0));
                }
            }
        }
    }

    export class PlayerProjectile extends BaseEntity {
        constructor(_x: number, _y: number) {
            super (_x, _y, 1, 0.22, "ProjectilePlayer", 1, "./textures/projectile.png");
        }
    }

    export class EnemyProjectile extends BaseEntity {
        constructor(_x: number, _y: number) {
            super (_x, _y, 1, 0.22, "ProjectileEnemy",1, "./textures/projectile.png");
        }
    }
}