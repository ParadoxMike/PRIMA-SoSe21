"use strict";
var DoodleSpace;
(function (DoodleSpace) {
    var ƒ = FudgeCore;
    //Basic class for moveable and textured Nodes with a Hitbox - is the base for every enemy and the player
    //TODO: Add Texture functionallitiy to replace basic Color
    class BaseEntity extends ƒ.Node {
        constructor(_name, _color, _spawnAtX, _spawnAtY, _xScale, _yScale) {
            super(_name);
            //add transform component and move into possiton
            this.addComponent(new ƒ.ComponentTransform());
            this.mtxLocal.translateX(_spawnAtX);
            this.mtxLocal.translateY(_spawnAtY);
            //create and add an mesh
            let cmpMesh = new ƒ.ComponentMesh(new ƒ.MeshQuad("Quad"));
            this.addComponent(cmpMesh);
            //add color - to be replaced with texture!
            this.addComponent(new ƒ.ComponentMaterial(new ƒ.Material(_name + "Material", ƒ.ShaderUniColor, new ƒ.CoatColored(_color))));
            //add and possition hitbox
            this.hitbox = new ƒ.Rectangle(_spawnAtX, _spawnAtY, _xScale, _yScale, ƒ.ORIGIN2D.CENTER);
        }
        checkCollision(_target) {
            return this.hitbox.collides(_target.hitbox);
        }
        moveBy(_x, _y) {
            this.mtxLocal.translateX(_x);
            this.mtxLocal.translateY(_y);
            this.hitbox.position.x = this.mtxLocal.translation.x - this.hitbox.size.x / 2;
            this.hitbox.position.y = this.mtxLocal.translation.y - this.hitbox.size.y / 2;
            console.log(_x);
            console.log(this.mtxLocal.translation.x);
            console.log(this.mtxWorld.translation.x);
        }
        moveTo(_x, _y) {
            this.mtxLocal.translateX(_x - this.mtxLocal.translation.x);
            this.mtxLocal.translateY(_y - this.mtxLocal.translation.y);
            this.hitbox.position.x = _x - this.hitbox.size.x / 2;
            this.hitbox.position.y = _y - this.hitbox.size.y / 2;
        }
    }
    DoodleSpace.BaseEntity = BaseEntity;
})(DoodleSpace || (DoodleSpace = {}));
//# sourceMappingURL=BaseEntity.js.map