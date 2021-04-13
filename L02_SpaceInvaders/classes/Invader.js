"use strict";
var L02_SpaceInvaders;
(function (L02_SpaceInvaders) {
    var ƒ = FudgeCore;
    //         [xx01xx]
    //     [xxxxxx02xxxxxx]
    // [xx03xx]        [xx04xx]
    //     [xxxxxx05xxxxxx]
    // [06]                [07]
    //     [08]        [09]
    class Invader extends L02_SpaceInvaders.BasicHitboxNode {
        constructor(_x, _y, _num) {
            super(_x, _y, Invader.scale, Invader.scale, "Invader" + _num);
            for (let i = 0; i < Invader.blockCnt; i++) {
                //add node for block
                let blockNode = new ƒ.Node("blockNode" + i);
                blockNode.addComponent(new ƒ.ComponentTransform());
                this.addChild(blockNode);
                //add geometry
                let cmpMesh = new ƒ.ComponentMesh(L02_SpaceInvaders.quadMesh);
                blockNode.addComponent(cmpMesh);
                //scale geometry
                cmpMesh.mtxPivot.scaleX(Invader.width[i]);
                cmpMesh.mtxPivot.scaleY(1 / 8);
                //move geometry into possition
                blockNode.mtxLocal.translateX(Invader.xPos[i]);
                blockNode.mtxLocal.translateY(Invader.yPos[i]);
                //add material
                blockNode.addComponent(new ƒ.ComponentMaterial(L02_SpaceInvaders.materialWhite));
            }
        }
    }
    Invader.xPos = [0, 0, -2 / 8, 2 / 8, 0, -5 / 16, 5 / 16, -3 / 16, 3 / 16];
    Invader.yPos = [2 / 8, 1 / 8, 0, 0, -1 / 8, -2 / 8, -2 / 8, -3 / 8, -3 / 8];
    Invader.width = [2 / 8, 4 / 8, 2 / 8, 2 / 8, 4 / 8, 1 / 8, 1 / 8, 1 / 8, 1 / 8];
    Invader.blockCnt = 9;
    Invader.scale = 6 / 8;
    L02_SpaceInvaders.Invader = Invader;
})(L02_SpaceInvaders || (L02_SpaceInvaders = {}));
//# sourceMappingURL=Invader.js.map