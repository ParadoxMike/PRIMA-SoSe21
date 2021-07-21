namespace DoodleSpace {
    import ƒ = FudgeCore;

    export class Player extends BaseEntity {
        private movementBorderTop: number = 11.5;
        private movementBorderBottom: number = -11.5;
        private movementBorderLeft: number = 1.5;
        private movementBorderRight: number = 20;

        constructor(_x: number, _y: number) {
            super (_x, _y, 1.75, 1, "Player", "./textures/player.png");
        }

        public handleMovement(): void {
            const playerOffset: number = gameSpeed * ƒ.Loop.timeFrameReal / 1000;
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

        public handleFiring (projectiles: PlayerProjectiles): void {
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SPACE])) {
                projectiles.spawnProjectilePlayer(this);
            }
        }
    }
}