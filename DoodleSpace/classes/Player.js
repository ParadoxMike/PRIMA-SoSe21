"use strict";
var DoodleSpace;
(function (DoodleSpace) {
    var ƒ = FudgeCore;
    class Player extends DoodleSpace.BaseEntity {
        constructor(_fps, _shotsPerSecond, _soundPath) {
            super(1.5, 0, 1.75, 1, "Player", 3, "./textures/player.png", _soundPath);
            this.movementBorderTop = 11.5;
            this.movementBorderBottom = -11.5;
            this.movementBorderLeft = 1.5;
            this.movementBorderRight = 32;
            this.counter = 0;
            this.fps = _fps;
            this.counterMax = Math.floor(this.fps / _shotsPerSecond);
        }
        handleMovement(_speed) {
            const playerOffset = _speed * ƒ.Loop.timeFrameReal / 1000;
            const playerPos = this.getPos();
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A]) && playerPos.x >= this.movementBorderLeft) {
                this.moveBy(new ƒ.Vector2(-playerOffset, 0));
            }
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D]) && playerPos.x <= this.movementBorderRight) {
                this.moveBy(new ƒ.Vector2(+playerOffset, 0));
            }
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W]) && playerPos.y <= this.movementBorderTop) {
                this.moveBy(new ƒ.Vector2(0, +playerOffset));
            }
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.S]) && playerPos.y >= this.movementBorderBottom) {
                this.moveBy(new ƒ.Vector2(0, -playerOffset));
            }
        }
        handleFiring(_projectiles) {
            if (this.hasFiered) {
                if (this.counter == this.counterMax) {
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
        handleCollisionWithEnemyProjectiles(_enemyProjectiles) {
            //setup working arrays
            let projectilesArray = _enemyProjectiles.getChildren();
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
    DoodleSpace.Player = Player;
})(DoodleSpace || (DoodleSpace = {}));
//# sourceMappingURL=Player.js.map