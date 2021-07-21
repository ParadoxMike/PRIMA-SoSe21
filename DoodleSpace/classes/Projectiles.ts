namespace DoodleSpace {
    import ƒ = FudgeCore;

    export class PlayerProjectiles extends ƒ.Node {
        private deleteAt: number = 33;

        constructor() {
            super("Player Projectiles");
        }
        
                private getLastProjectile(): PlayerProjectile {
                    const projectiles: PlayerProjectile[] = this.getChildren() as PlayerProjectile[];
                    return this.getChild(projectiles.length - 1) as PlayerProjectile;
                }

        public spawnProjectilePlayer(playerObject: Player): void {
            if (! this.getLastProjectile()) {
                this.addChild(new PlayerProjectile(playerObject.mtxLocal.translation.x + 1, playerObject.mtxLocal.translation.y));
            }
            else if (this.getLastProjectile().mtxLocal.translation.x > playerObject.mtxLocal.translation.x + 3) {
                this.addChild(new PlayerProjectile(playerObject.mtxLocal.translation.x + 1, playerObject.mtxLocal.translation.y));
            }
        }

        public handleMovement(): void {
            let projectiles: PlayerProjectile[] = this.getChildren() as PlayerProjectile[];

            for (let i = 0; i < projectiles.length; i++) {
                const projectileOffset: number = gameSpeed * ƒ.Loop.timeFrameReal / 1000;
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