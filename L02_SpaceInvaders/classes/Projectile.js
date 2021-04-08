"use strict";
var L02_SpaceInvaders;
(function (L02_SpaceInvaders) {
    var ƒ = FudgeCore;
    class Projectile extends ƒ.Node {
        constructor(_x, _y, _id) {
            super("Projectile" + _id);
            //add transform component and move cover into possiton
            this.addComponent(new ƒ.ComponentTransform());
            this.mtxLocal.translateX(_x);
            this.mtxLocal.translateY(_y);
            //add geometry
            let cmpMesh = new ƒ.ComponentMesh(L02_SpaceInvaders.quadMesh);
            this.addComponent(cmpMesh);
            //scale geometry
            cmpMesh.mtxPivot.scaleX(1 / 16);
            cmpMesh.mtxPivot.scaleY(1 / 2);
            //add material
            this.addComponent(new ƒ.ComponentMaterial(L02_SpaceInvaders.materialRed));
        }
    }
    L02_SpaceInvaders.Projectile = Projectile;
})(L02_SpaceInvaders || (L02_SpaceInvaders = {}));
//# sourceMappingURL=Projectile.js.map