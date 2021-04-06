"use strict";
var L02_SpaceInvaders;
(function (L02_SpaceInvaders) {
    var ƒ = FudgeCore;
    class Boss extends ƒ.Node {
        constructor(_x, _y) {
            super("Boss");
            //add transform component and move boss into possiton
            this.addComponent(new ƒ.ComponentTransform());
            this.mtxLocal.translateX(_x);
            this.mtxLocal.translateY(_y);
            //add subNodes
            let nodeMain01 = new ƒ.Node("nodeMain01");
            nodeMain01.addComponent(new ƒ.ComponentTransform());
            this.addChild(nodeMain01);
            let nodeMain02 = new ƒ.Node("nodeMain02");
            nodeMain02.addComponent(new ƒ.ComponentTransform());
            this.addChild(nodeMain02);
            let nodeLeg01 = new ƒ.Node("nodeLeg01");
            nodeLeg01.addComponent(new ƒ.ComponentTransform());
            this.addChild(nodeLeg01);
            let nodeLeg02 = new ƒ.Node("nodeLeg02");
            nodeLeg02.addComponent(new ƒ.ComponentTransform());
            this.addChild(nodeLeg02);
            let nodeLeg03 = new ƒ.Node("nodeLeg03");
            nodeLeg03.addComponent(new ƒ.ComponentTransform());
            this.addChild(nodeLeg03);
            //add geometry
            let cmpMeshMain01 = new ƒ.ComponentMesh(L02_SpaceInvaders.quadMesh);
            nodeMain01.addComponent(cmpMeshMain01);
            let cmpMeshMain02 = new ƒ.ComponentMesh(L02_SpaceInvaders.quadMesh);
            nodeMain02.addComponent(cmpMeshMain02);
            let cmpMeshLeg01 = new ƒ.ComponentMesh(L02_SpaceInvaders.quadMesh);
            nodeLeg01.addComponent(cmpMeshLeg01);
            let cmpMeshLeg02 = new ƒ.ComponentMesh(L02_SpaceInvaders.quadMesh);
            nodeLeg02.addComponent(cmpMeshLeg02);
            let cmpMeshLeg03 = new ƒ.ComponentMesh(L02_SpaceInvaders.quadMesh);
            nodeLeg03.addComponent(cmpMeshLeg03);
            //scale geometry
            cmpMeshMain01.mtxPivot.scaleX(9 / 4);
            cmpMeshMain01.mtxPivot.scaleY(1 / 2);
            cmpMeshMain02.mtxPivot.scaleX(5 / 4);
            cmpMeshMain02.mtxPivot.scaleY(1 / 2);
            cmpMeshLeg01.mtxPivot.scaleX(1 / 4);
            cmpMeshLeg01.mtxPivot.scaleY(1 / 2);
            cmpMeshLeg02.mtxPivot.scaleX(1 / 4);
            cmpMeshLeg02.mtxPivot.scaleY(1 / 4);
            cmpMeshLeg03.mtxPivot.scaleX(1 / 4);
            cmpMeshLeg03.mtxPivot.scaleY(1 / 2);
            //move geometry into possition
            nodeMain02.mtxLocal.translateY(1 / 2);
            nodeLeg01.mtxLocal.translateX(-1 / 2);
            nodeLeg01.mtxLocal.translateY(-1 / 2);
            nodeLeg02.mtxLocal.translateY(-3 / 8);
            nodeLeg03.mtxLocal.translateX(1 / 2);
            nodeLeg03.mtxLocal.translateY(-1 / 2);
            //add material
            nodeMain01.addComponent(new ƒ.ComponentMaterial(L02_SpaceInvaders.materialWhite));
            nodeMain02.addComponent(new ƒ.ComponentMaterial(L02_SpaceInvaders.materialWhite));
            nodeLeg01.addComponent(new ƒ.ComponentMaterial(L02_SpaceInvaders.materialWhite));
            nodeLeg02.addComponent(new ƒ.ComponentMaterial(L02_SpaceInvaders.materialWhite));
            nodeLeg03.addComponent(new ƒ.ComponentMaterial(L02_SpaceInvaders.materialWhite));
        }
    }
    L02_SpaceInvaders.Boss = Boss;
})(L02_SpaceInvaders || (L02_SpaceInvaders = {}));
//# sourceMappingURL=Boss.js.map