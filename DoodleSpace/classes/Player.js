"use strict";
var DoodleSpace;
(function (DoodleSpace) {
    var ƒ = FudgeCore;
    class Player extends DoodleSpace.BaseEntity {
        constructor(_x, _y) {
            super(_x, _y, 1.75, 1, "Player", 1, "./textures/player.png");
            this.movementBorderTop = 11.5;
            this.movementBorderBottom = -11.5;
            this.movementBorderLeft = 1.5;
            this.movementBorderRight = 32;
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
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SPACE])) {
                _projectiles.spawnProjectilePlayer(this);
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
                }
            }
        }
    }
    DoodleSpace.Player = Player;
})(DoodleSpace || (DoodleSpace = {}));
//# sourceMappingURL=Player.js.map