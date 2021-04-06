namespace L02_SpaceInvaders {
    import ƒ = FudgeCore;
    let xPos: number[] = [-1 / 4, 0    , 1 / 4, -1 / 2, -1 / 4, 0    , 1 / 4, 1 / 2, -3 / 4, -1 / 2, -1 / 4, 1 / 4, 1 / 2, 3 / 4, -3 / 4, -1 / 2,  1 / 2,  3 / 4, -3 / 4, -1 / 2,  1 / 2,  3 / 4];
    let yPos: number[] = [ 1 / 2, 1 / 2, 1 / 2,  1 / 4,  1 / 4, 1 / 4, 1 / 4, 1 / 4,  0    ,  0    ,  0    , 0    , 0    , 0    , -1 / 4, -1 / 4, -1 / 4, -1 / 4, -1 / 2, -1 / 2, -1 / 2, -1 / 2];
    let blockCnt: number = 22;

    //         [01][02][03]
    //     [04][05][06][07][08]
    // [09][10][11](XY)[12][13][14]
    // [15][16]            [17][18]
    // [19][20]            [21][22]
    //(XY) = Node Zero

    export class Cover extends ƒ.Node {
        constructor(_x: number, _y: number, _num: number) {
            super("Cover" + _num);
            
            //add transform component and move cover into possiton
            this.addComponent(new ƒ.ComponentTransform());
            this.mtxLocal.translateX(_x);
            this.mtxLocal.translateY(_y);

            for (let i: number = 0; i < blockCnt; i++) {
                //add node for block
                let blockNode: ƒ.Node = new ƒ.Node("blockNode" + i);
                blockNode.addComponent(new ƒ.ComponentTransform());
                this.addChild(blockNode);
                //add geometry
                let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(quadMesh);
                blockNode.addComponent(cmpMesh);
                //scale geometry
                cmpMesh.mtxPivot.scaleX(1 / 4);
                cmpMesh.mtxPivot.scaleY(1 / 4);
                //move geometry into possition
                blockNode.mtxLocal.translateX(xPos[i]);
                blockNode.mtxLocal.translateY(yPos[i]);
                //add material
                blockNode.addComponent(new ƒ.ComponentMaterial(materialGreen));    
            }

        }
    }
}