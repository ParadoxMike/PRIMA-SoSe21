namespace L02_SpaceInvaders {
    import ƒ = FudgeCore;

    export class Boss extends ƒ.Node {
        constructor(_x: number, _y: number) {
            super("Boss");
            
            //add transform component and move boss into possiton
            this.addComponent(new ƒ.ComponentTransform());
            this.mtxLocal.translateX(_x);
            this.mtxLocal.translateY(_y);

            //add subNodes
            let nodeMain01: ƒ.Node = new ƒ.Node("nodeMain01");
            nodeMain01.addComponent(new ƒ.ComponentTransform());
            this.addChild(nodeMain01);
            let nodeMain02: ƒ.Node = new ƒ.Node("nodeMain02");
            nodeMain02.addComponent(new ƒ.ComponentTransform());
            this.addChild(nodeMain02);
            let nodeLeg01: ƒ.Node = new ƒ.Node("nodeLeg01");
            nodeLeg01.addComponent(new ƒ.ComponentTransform());
            this.addChild(nodeLeg01);
            let nodeLeg02: ƒ.Node = new ƒ.Node("nodeLeg02");
            nodeLeg02.addComponent(new ƒ.ComponentTransform());
            this.addChild(nodeLeg02);
            let nodeLeg03: ƒ.Node = new ƒ.Node("nodeLeg03");
            nodeLeg03.addComponent(new ƒ.ComponentTransform());
            this.addChild(nodeLeg03);

            //add geometry
            let cmpMeshMain01: ƒ.ComponentMesh = new ƒ.ComponentMesh(quadMesh);
            nodeMain01.addComponent(cmpMeshMain01);
            let cmpMeshMain02: ƒ.ComponentMesh = new ƒ.ComponentMesh(quadMesh);
            nodeMain02.addComponent(cmpMeshMain02);
            let cmpMeshLeg01: ƒ.ComponentMesh = new ƒ.ComponentMesh(quadMesh);
            nodeLeg01.addComponent(cmpMeshLeg01);
            let cmpMeshLeg02: ƒ.ComponentMesh = new ƒ.ComponentMesh(quadMesh);
            nodeLeg02.addComponent(cmpMeshLeg02);
            let cmpMeshLeg03: ƒ.ComponentMesh = new ƒ.ComponentMesh(quadMesh);
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
            nodeMain01.addComponent(new ƒ.ComponentMaterial(materialWhite));
            nodeMain02.addComponent(new ƒ.ComponentMaterial(materialWhite));
            nodeLeg01.addComponent(new ƒ.ComponentMaterial(materialWhite));
            nodeLeg02.addComponent(new ƒ.ComponentMaterial(materialWhite));
            nodeLeg03.addComponent(new ƒ.ComponentMaterial(materialWhite));
        }
    }
}