"use strict";
var L02_SpaceInvaders;
(function (L02_SpaceInvaders) {
    var ƒ = FudgeCore;
    let xPos = [-1 / 4, 0, 1 / 4, -1 / 2, -1 / 4, 0, 1 / 4, 1 / 2, -3 / 4, -1 / 2, -1 / 4, 1 / 4, 1 / 2, 3 / 4, -3 / 4, -1 / 2, 1 / 2, 3 / 4, -3 / 4, -1 / 2, 1 / 2, 3 / 4];
    let yPos = [1 / 2, 1 / 2, 1 / 2, 1 / 4, 1 / 4, 1 / 4, 1 / 4, 1 / 4, 0, 0, 0, 0, 0, 0, -1 / 4, -1 / 4, -1 / 4, -1 / 4, -1 / 2, -1 / 2, -1 / 2, -1 / 2];
    let blockCnt = 22;
    //         [01][02][03]
    //     [04][05][06][07][08]
    // [09][10][11](XY)[12][13][14]
    // [15][16]            [17][18]
    // [19][20]            [21][22]
    //(XY) = Node Zero
    class Cover extends ƒ.Node {
        constructor(_x, _y, _num) {
            super("Cover" + _num);
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
                cmpMesh.mtxPivot.scaleX(1 / 4);
                cmpMesh.mtxPivot.scaleY(1 / 4);
                //move geometry into possition
                blockNode.mtxLocal.translateX(xPos[i]);
                blockNode.mtxLocal.translateY(yPos[i]);
                //add material
                blockNode.addComponent(new ƒ.ComponentMaterial(L02_SpaceInvaders.materialGreen));
            }
        }
    }
    L02_SpaceInvaders.Cover = Cover;
})(L02_SpaceInvaders || (L02_SpaceInvaders = {}));
//# sourceMappingURL=Cover.js.map