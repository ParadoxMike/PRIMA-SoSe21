"use strict";
var L02_SpaceInvaders;
(function (L02_SpaceInvaders) {
    var ƒ = FudgeCore;
    class InvadersNode extends ƒ.Node {
        constructor() {
            super("InvadersNode");
            this.movementDirection = true; //false = to right, true = to left
            this.hitBorderRight = false;
            this.hitBorderLeft = false;
            //add transform component and move cover into possiton
            this.addComponent(new ƒ.ComponentTransform());
        }
        createInvaders() {
            // iterates for every invader
            let xPos = [-7.5, -6, -4.5, -3, -1.5, 0, 1.5, 3, 4.5, 6, 7.5];
            // iterates for every row
            let yPos = [10, 8.5, 7, 5.5];
            let rowCnt = 4;
            let cntPerRow = 11;
            let cnt = 0;
            for (let i = 0; i < rowCnt; i++) {
                for (let k = 0; k < cntPerRow; k++) {
                    let invader = new L02_SpaceInvaders.Invader(xPos[k], yPos[i], cnt);
                    this.appendChild(invader);
                    cnt++;
                }
            }
        }
        handleAllInvadersHit(_target) {
            for (let invader of this.getChildren()) {
                if (invader.checkCollision(_target)) {
                    this.removeChild(invader);
                    return true;
                }
            }
            return false;
        }
        handleAllInvadersMovement() {
            let invaders = this.getChildren();
            for (let i = 0; i < invaders.length; i++) {
                if (invaders[i].mtxLocal.translation.x <= -L02_SpaceInvaders.movementBorderX) {
                    this.hitBorderLeft = true;
                    this.movementDirection = false;
                }
                else if (invaders[i].mtxLocal.translation.x >= L02_SpaceInvaders.movementBorderX) {
                    this.hitBorderRight = true;
                    this.movementDirection = true;
                }
            }
            if (this.movementDirection && !this.hitBorderLeft) {
                if (!this.hitBorderRight) {
                    // to left
                    for (let i = 0; i < invaders.length; i++) {
                        invaders[i].moveNode(-0.1, 0);
                    }
                }
                else {
                    // to left & down
                    for (let i = 0; i < invaders.length; i++) {
                        invaders[i].moveNode(-0.1, -0.1);
                    }
                    this.hitBorderRight = false;
                }
            }
            else if (!this.movementDirection && !this.hitBorderRight) {
                if (!this.hitBorderLeft) {
                    //to right
                    for (let i = 0; i < invaders.length; i++) {
                        invaders[i].moveNode(0.1, 0);
                    }
                }
                else {
                    //to right & down
                    for (let i = 0; i < invaders.length; i++) {
                        invaders[i].moveNode(0.1, -0.1);
                    }
                    this.hitBorderLeft = false;
                }
            }
        }
    }
    L02_SpaceInvaders.InvadersNode = InvadersNode;
})(L02_SpaceInvaders || (L02_SpaceInvaders = {}));
//# sourceMappingURL=InvadersNode.js.map