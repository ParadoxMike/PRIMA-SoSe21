"use strict";
var L02_SpaceInvaders;
(function (L02_SpaceInvaders) {
    var ƒ = FudgeCore;
    let xPos = [0, 0, -2 / 8, 2 / 8, 0, -5 / 16, 5 / 16, -3 / 16, 3 / 16];
    let yPos = [2 / 8, 1 / 8, 0, 0, -1 / 8, -2 / 8, -2 / 8, -3 / 8, -3 / 8];
    let width = [2 / 8, 4 / 8, 2 / 8, 2 / 8, 4 / 8, 1 / 8, 1 / 8, 1 / 8, 1 / 8];
    let blockCnt = 9;
    //         [xx01xx]
    //     [xxxxxx02xxxxxx]
    // [xx03xx]        [xx04xx]
    //     [xxxxxx05xxxxxx]
    // [06]                [07]
    //     [08]        [09]
    class Invader extends ƒ.Node {
        constructor(_x, _y, _num) {
            super("Invader" + _num);
            //add transform component and move cover into possiton
            this.addComponent(new ƒ.ComponentTransform());
            this.mtxLocal.translateX(_x);
            this.mtxLocal.translateY(_y);
            for (let i = 0; i < blockCnt; i++) {
                //add node for block
                let blockNode = new ƒ.Node("blockNode" + i);
                blockNode.addComponent(new ƒ.ComponentTransform());
                this.addChild(blockNode);
                //add geometry
                let cmpMesh = new ƒ.ComponentMesh(L02_SpaceInvaders.quadMesh);
                blockNode.addComponent(cmpMesh);
                //scale geometry
                cmpMesh.mtxPivot.scaleX(width[i]);
                cmpMesh.mtxPivot.scaleY(1 / 8);
                //move geometry into possition
                blockNode.mtxLocal.translateX(xPos[i]);
                blockNode.mtxLocal.translateY(yPos[i]);
                //add material
                blockNode.addComponent(new ƒ.ComponentMaterial(L02_SpaceInvaders.materialWhite));
            }
        }
    }
    L02_SpaceInvaders.Invader = Invader;
})(L02_SpaceInvaders || (L02_SpaceInvaders = {}));
//# sourceMappingURL=Invader.js.map