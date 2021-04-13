namespace L02_SpaceInvaders {
    import ƒ = FudgeCore;

    export class Projectile extends BasicHitboxNode {
        static scaleX: number = 1 / 16;
        static scaleY: number = 1 / 2;

        constructor(_x: number, _y: number, _id: string) {
            super(_x, _y, Projectile.scaleX, Projectile.scaleY, "Projectile" + _id);
            
            //add geometry
            let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(quadMesh);
            this.addComponent(cmpMesh);
            //scale geometry
            cmpMesh.mtxPivot.scaleX(Projectile.scaleX);
            cmpMesh.mtxPivot.scaleY(Projectile.scaleY);
            //add material
            this.addComponent(new ƒ.ComponentMaterial(materialRed));
        }
    }
}