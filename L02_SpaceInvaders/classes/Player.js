"use strict";
var L02_SpaceInvaders;
(function (L02_SpaceInvaders) {
    var ƒ = FudgeCore;
    class Player extends ƒ.Node {
        constructor(_x, _y) {
            super("Player");
            //add transform component and move player into possiton
            this.addComponent(new ƒ.ComponentTransform());
            this.mtxLocal.translateX(_x);
            this.mtxLocal.translateY(_y);
            //add geometry
            let cmpMeshMain = new ƒ.ComponentMesh(L02_SpaceInvaders.quadMesh);
            let cmpMeshCannon = new ƒ.ComponentMesh(L02_SpaceInvaders.quadMesh);
            cmpMeshMain.mtxPivot.scaleY(1 / 2);
            cmpMeshCannon.mtxPivot.scaleX(1 / 4);
            cmpMeshCannon.mtxPivot.scaleY(1 / 4);
            let nodeMain = new ƒ.Node("nodeMain");
            nodeMain.addComponent(new ƒ.ComponentTransform());
            let nodeCannon = new ƒ.Node("nodeCannon");
            nodeCannon.addComponent(new ƒ.ComponentTransform());
            nodeCannon.mtxLocal.translateY(1 / 4);
            nodeMain.addComponent(cmpMeshMain);
            nodeCannon.addComponent(cmpMeshCannon);
            nodeMain.addComponent(new ƒ.ComponentMaterial(L02_SpaceInvaders.materialGreen));
            nodeCannon.addComponent(new ƒ.ComponentMaterial(L02_SpaceInvaders.materialGreen));
            this.addChild(nodeMain);
            this.addChild(nodeCannon);
        }
    }
    L02_SpaceInvaders.Player = Player;
})(L02_SpaceInvaders || (L02_SpaceInvaders = {}));
//# sourceMappingURL=Player.js.map