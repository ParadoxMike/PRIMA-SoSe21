namespace L02_SpaceInvaders {
    import ƒ = FudgeCore;

    export class Player extends ƒ.Node {
        constructor(_x: number, _y: number) {
            super("Player");
            
            //add transform component and move player into possiton
            this.addComponent(new ƒ.ComponentTransform());
            this.mtxLocal.translateX(_x);
            this.mtxLocal.translateY(_y);

            //add geometry
            let cmpMeshMain: ƒ.ComponentMesh = new ƒ.ComponentMesh(quadMesh);
            let cmpMeshCannon: ƒ.ComponentMesh = new ƒ.ComponentMesh(quadMesh);
            cmpMeshMain.mtxPivot.scaleY(1 / 2);
            cmpMeshCannon.mtxPivot.scaleX(1 / 4);
            cmpMeshCannon.mtxPivot.scaleY(1 / 4);

            let nodeMain: ƒ.Node = new ƒ.Node("nodeMain");
            nodeMain.addComponent(new ƒ.ComponentTransform());
        
            let nodeCannon: ƒ.Node = new ƒ.Node("nodeCannon");
            nodeCannon.addComponent(new ƒ.ComponentTransform());
            nodeCannon.mtxLocal.translateY(1 / 4);
            
            nodeMain.addComponent(cmpMeshMain);
            nodeCannon.addComponent(cmpMeshCannon);

            nodeMain.addComponent(new ƒ.ComponentMaterial(materialGreen));
            nodeCannon.addComponent(new ƒ.ComponentMaterial(materialGreen));

            this.addChild(nodeMain);
            this.addChild(nodeCannon);
        }
    }
}