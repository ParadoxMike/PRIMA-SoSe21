namespace L02_SpaceInvaders {
    import ƒ = FudgeCore;
    let xPos: number[] =  [0    , 0    , -2 / 8, 2 / 8,  0    , -5 / 16,  5 / 16, -3 / 16,  3 / 16];
    let yPos: number[] =  [2 / 8, 1 / 8,  0    , 0    , -1 / 8, -2 /  8, -2 /  8, -3 /  8, -3 /  8];
    let width: number[] = [2 / 8, 4 / 8,  2 / 8, 2 / 8,  4 / 8,  1 /  8,  1 /  8,  1 /  8,  1 /  8];
    let blockCnt: number = 9;

    //         [xx01xx]
    //     [xxxxxx02xxxxxx]
    // [xx03xx]        [xx04xx]
    //     [xxxxxx05xxxxxx]
    // [06]                [07]
    //     [08]        [09]

    export class Invader extends ƒ.Node {
        constructor(_x: number, _y: number, _num: number) {
            super("Invader" + _num);
            
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
                cmpMesh.mtxPivot.scaleX(width[i]);
                cmpMesh.mtxPivot.scaleY(1 / 8);
                //move geometry into possition
                blockNode.mtxLocal.translateX(xPos[i]);
                blockNode.mtxLocal.translateY(yPos[i]);
                //add material
                blockNode.addComponent(new ƒ.ComponentMaterial(materialWhite));    
            }

        }
    }
}