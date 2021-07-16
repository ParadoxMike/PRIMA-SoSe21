"use strict";
var TexureDemo;
(function (TexureDemo) {
    var ƒ = FudgeCore;
    //Basic class for moveable and textured Nodes with a Hitbox - is the base for every enemy and the player
    class BaseEntity extends ƒ.Node {
        constructor(_spawnAtX, _spawnAtY, _xScale, _yScale, _name, _texturePath = "./textures/default.png") {
            super(_name);
            //add transform component and move into possiton
            this.addComponent(new ƒ.ComponentTransform());
            this.mtxLocal.translateX(_spawnAtX);
            this.mtxLocal.translateY(_spawnAtY);
            //create and add an mesh
            let cmpMesh = new ƒ.ComponentMesh(new ƒ.MeshQuad("Quad"));
            this.addComponent(cmpMesh);
            //add and load texture
            let texture = new ƒ.TextureImage();
            let textureCoat = new ƒ.CoatTextured();
            let material = new ƒ.Material(_name + "Material", ƒ.ShaderTexture, textureCoat);
            let cmpMaterial = new ƒ.ComponentMaterial(material);
            texture.load(_texturePath);
            textureCoat.texture = texture;
            //fix texture 
            cmpMaterial.mtxPivot = ƒ.Matrix3x3.PROJECTION(-2, -2);
            cmpMaterial.mtxPivot.rotate(180);
            cmpMaterial.mtxPivot.translateX(0.5);
            cmpMaterial.mtxPivot.translateY(0.5);
            //add textured material to node
            this.addComponent(cmpMaterial);
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
        }
        moveTo(_x, _y) {
            this.mtxLocal.translateX(_x - this.mtxLocal.translation.x);
            this.mtxLocal.translateY(_y - this.mtxLocal.translation.y);
            this.hitbox.position.x = _x - this.hitbox.size.x / 2;
            this.hitbox.position.y = _y - this.hitbox.size.y / 2;
        }
    }
    TexureDemo.BaseEntity = BaseEntity;
})(TexureDemo || (TexureDemo = {}));
//# sourceMappingURL=BaseEntity.js.map