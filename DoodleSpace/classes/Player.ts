namespace DoodleSpace {
    import ƒ = FudgeCore;

    export class Player extends BaseEntity {
        private movementBorderTop: number = 11.5;
        private movementBorderBottom: number = -11.5;
        private movementBorderLeft: number = 1.5;
        private movementBorderRight: number = 32;
        private fps: number;
        private counter: number = 0;
        private counterMax: number;
        private hasFiered: boolean;

        constructor(_fps: number, _shotsPerSecond: number, _soundPath: string) {
            super (1.5, 0, 1.75, 1, "Player", 3, "./textures/player.png", _soundPath);

            this.fps = _fps;
            this.counterMax = Math.floor(this.fps / _shotsPerSecond);
        }

        public handleMovement(_speed: number): void {
            const playerOffset: number = _speed * ƒ.Loop.timeFrameReal / 1000;
            const playerPos: ƒ.Vector2 = this.getPos();

            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A]) && playerPos.x >= this.movementBorderLeft) {
                this.moveBy(new ƒ.Vector2(-playerOffset , 0));
            }

            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D]) && playerPos.x <= this.movementBorderRight) {
                this.moveBy(new ƒ.Vector2(+playerOffset , 0));
            }

            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W]) && playerPos.y <= this.movementBorderTop) {
                this.moveBy(new ƒ.Vector2(0 , +playerOffset));
            }

            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.S]) && playerPos.y >= this.movementBorderBottom) {
                this.moveBy(new ƒ.Vector2(0 , -playerOffset));
            }
        }

        public handleFiring(_projectiles: PlayerProjectiles): void {
            if (this.hasFiered) {
                if (this.counter ==  this.counterMax) {
                    this.counter = 0;
                    this.hasFiered = false;
                }
                else {
                    this.counter++;
                }
            }
            else {
                if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SPACE])) {
                    _projectiles.spawnProjectilePlayer(this);
                    this.playSound();
                    this.hasFiered = true;
                }
            }

        }

        public handleCollisionWithEnemyProjectiles(_enemyProjectiles: EnemyProjectiles): void {
            //setup working arrays
            let projectilesArray: EnemyProjectile[] = _enemyProjectiles.getChildren() as EnemyProjectile[];

            //iterate through all enemy projectiles
            for (let i = 0; i < projectilesArray.length; i++) {
                if (projectilesArray[i].checkCollision(this)) {

                    //decrease health by 1 for projectile and player
                    projectilesArray[i].health--;
                    this.health--;

                    //run checkHealth for both
                    projectilesArray[i].checkHealth();
                    this.checkHealth();

                    //play sound
                    projectilesArray[i].playSound();
                }
            }
        }
    }
}