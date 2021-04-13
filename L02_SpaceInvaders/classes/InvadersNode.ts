namespace L02_SpaceInvaders {
    import ƒ = FudgeCore;
    
    export class InvadersNode extends ƒ.Node {
        private movementDirection: boolean = true; //false = to right, true = to left
        private hitBorderRight: boolean = false;
        private hitBorderLeft: boolean = false;

        constructor() {
            super("InvadersNode");
            
            //add transform component and move cover into possiton
            this.addComponent(new ƒ.ComponentTransform());
        }

        public createInvaders(): void {
            // iterates for every invader
            let xPos:       number[] = [-7.5, -6, -4.5, -3, -1.5, 0, 1.5, 3, 4.5, 6, 7.5];
            // iterates for every row
            let yPos:       number[] = [10, 8.5, 7, 5.5];
    
            let rowCnt:     number   = 4;
            let cntPerRow:  number   = 11;
            let cnt:        number   = 0;
    
            for (let i: number = 0; i < rowCnt; i++) {
                for (let k: number = 0; k < cntPerRow; k++) {
                    let invader: ƒ.Node = new Invader(xPos[k], yPos[i], cnt);
                    this.appendChild(invader);
                    cnt++;
                }
            }
        }

        public handleAllInvadersHit(_target: Projectile): boolean {
            for (let invader of this.getChildren() as Invader[]) {
                if (invader.checkCollision(_target)) {
                    this.removeChild(invader);
                    return true;
                }
            }
            return false;
        }

        public handleAllInvadersMovement(): void {
            let invaders: Invader[] = this.getChildren() as Invader[];
            let invaderOffset: number = gameSpeed * ƒ.Loop.timeFrameReal / 5000;

            for (let i = 0; i < invaders.length; i++) {
                if (invaders[i].mtxLocal.translation.x <= -movementBorderX) {
                    this.hitBorderLeft = true;
                    this.movementDirection = false;
                }
                else if (invaders[i].mtxLocal.translation.x >= movementBorderX) {
                    this.hitBorderRight = true;
                    this.movementDirection = true;
                }
            }

            if (this.movementDirection && !this.hitBorderLeft) {
                if (!this.hitBorderRight) {
                    // to left
                    for (let i = 0; i < invaders.length; i++) {
                        invaders[i].moveNode(-invaderOffset, 0);
                    }
                }
                else {
                    // to left & down
                    for (let i = 0; i < invaders.length; i++) {
                        invaders[i].moveNode(-invaderOffset, -invaderOffset);
                    }
                    this.hitBorderRight = false;
                }
            }
            else if (!this.movementDirection && !this.hitBorderRight){
                if (!this.hitBorderLeft) {
                    //to right
                    for (let i = 0; i < invaders.length; i++) {
                        invaders[i].moveNode(invaderOffset, 0);
                    }
                }
                else {
                    //to right & down
                    for (let i = 0; i < invaders.length; i++) {
                        invaders[i].moveNode(invaderOffset, -invaderOffset);
                    }
                    this.hitBorderLeft = false;
                }
            }
        }
    }
}