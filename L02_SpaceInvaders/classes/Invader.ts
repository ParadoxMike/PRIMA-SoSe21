namespace L02_SpaceInvaders {
    import ƒ = FudgeCore;
    
    //         [xx01xx]
    //     [xxxxxx02xxxxxx]
    // [xx03xx]        [xx04xx]
    //     [xxxxxx05xxxxxx]
    // [06]                [07]
    //     [08]        [09]
    
    export class Invader extends BasicHitboxNode {
        static xPos: number[] =  [0    , 0    , -2 / 8, 2 / 8,  0    , -5 / 16,  5 / 16, -3 / 16,  3 / 16];
        static yPos: number[] =  [2 / 8, 1 / 8,  0    , 0    , -1 / 8, -2 /  8, -2 /  8, -3 /  8, -3 /  8];
        static width: number[] = [2 / 8, 4 / 8,  2 / 8, 2 / 8,  4 / 8,  1 /  8,  1 /  8,  1 /  8,  1 /  8];
        static blockCnt: number = 9;
        static scale: number = 6 / 8;

        constructor(_x: number, _y: number, _num: number) {
            super(_x, _y, Invader.scale, Invader.scale, "Invader" + _num);

            for (let i: number = 0; i < Invader.blockCnt; i++) {
                //add node for block
                let blockNode: ƒ.Node = new ƒ.Node("blockNode" + i);
                blockNode.addComponent(new ƒ.ComponentTransform());
                this.addChild(blockNode);
                //add geometry
                let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(quadMesh);
                blockNode.addComponent(cmpMesh);
                //scale geometry
                cmpMesh.mtxPivot.scaleX(Invader.width[i]);
                cmpMesh.mtxPivot.scaleY(1 / 8);
                //move geometry into possition
                blockNode.mtxLocal.translateX(Invader.xPos[i]);
                blockNode.mtxLocal.translateY(Invader.yPos[i]);
                //add material
                blockNode.addComponent(new ƒ.ComponentMaterial(materialWhite));
            }
        }
    }
}