"use strict";
var L02_SpaceInvaders;
(function (L02_SpaceInvaders) {
    var ƒ = FudgeCore;
    class Projectile extends L02_SpaceInvaders.BasicHitboxNode {
        constructor(_x, _y, _id) {
            super(_x, _y, Projectile.scaleX, Projectile.scaleY, "Projectile" + _id);
            //add geometry
            let cmpMesh = new ƒ.ComponentMesh(L02_SpaceInvaders.quadMesh);
            this.addComponent(cmpMesh);
            //scale geometry
            cmpMesh.mtxPivot.scaleX(Projectile.scaleX);
            cmpMesh.mtxPivot.scaleY(Projectile.scaleY);
            //add material
            this.addComponent(new ƒ.ComponentMaterial(L02_SpaceInvaders.materialRed));
        }
    }
    Projectile.scaleX = 1 / 16;
    Projectile.scaleY = 1 / 2;
    L02_SpaceInvaders.Projectile = Projectile;
})(L02_SpaceInvaders || (L02_SpaceInvaders = {}));
//# sourceMappingURL=Projectile.js.map