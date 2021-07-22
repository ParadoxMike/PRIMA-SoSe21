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
            this.movementBorderRight = 20;
        }
        handleMovement() {
            const playerOffset = DoodleSpace.gameSpeed * ƒ.Loop.timeFrameReal / 1000;
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
        handleFiring(projectiles) {
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SPACE])) {
                projectiles.spawnProjectilePlayer(this);
            }
        }
    }
    DoodleSpace.Player = Player;
})(DoodleSpace || (DoodleSpace = {}));
//# sourceMappingURL=Player.js.map