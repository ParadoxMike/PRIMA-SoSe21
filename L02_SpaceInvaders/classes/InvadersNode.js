"use strict";
var L02_SpaceInvaders;
(function (L02_SpaceInvaders) {
    var ƒ = FudgeCore;
    class InvadersNode extends ƒ.Node {
        constructor() {
            super("InvadersNode");
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
    }
    L02_SpaceInvaders.InvadersNode = InvadersNode;
})(L02_SpaceInvaders || (L02_SpaceInvaders = {}));
//# sourceMappingURL=InvadersNode.js.map