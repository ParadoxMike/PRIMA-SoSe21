namespace L02_SpaceInvaders {
    import ƒ = FudgeCore;

    export class Projectile extends ƒ.Node {
        constructor(_x: number, _y: number, _id: string) {
            super("Projectile" + _id);
            
            //add transform component and move cover into possiton
            this.addComponent(new ƒ.ComponentTransform());
            this.mtxLocal.translateX(_x);
            this.mtxLocal.translateY(_y);
            //add geometry
            let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(quadMesh);
            this.addComponent(cmpMesh);
            //scale geometry
            cmpMesh.mtxPivot.scaleX(1 / 16);
            cmpMesh.mtxPivot.scaleY(1 / 2);
            //add material
            this.addComponent(new ƒ.ComponentMaterial(materialRed));
        }
    }
}