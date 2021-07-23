"use strict";
var DoodleSpace;
(function (DoodleSpace) {
    var ƒ = FudgeCore;
    //Basic class for moveable and textured Nodes with a Hitbox - is the base for every enemy and the player
    class BaseEntity extends ƒ.Node {
        constructor(_spawnAtX, _spawnAtY, _xScale, _yScale, _name, _initHealth, _texturePath = "./textures/default.png", _soundPath) {
            super(_name);
            //set initail health
            this.health = _initHealth;
            //add transform component and move into possiton
            this.addComponent(new ƒ.ComponentTransform());
            this.mtxLocal.translateX(_spawnAtX);
            this.mtxLocal.translateY(_spawnAtY);
            //create, add and scale mesh
            let cmpMesh = new ƒ.ComponentMesh(new ƒ.MeshQuad("Quad"));
            this.addComponent(cmpMesh);
            this.getComponent(ƒ.ComponentMesh).mtxPivot.scaleX(_xScale);
            this.getComponent(ƒ.ComponentMesh).mtxPivot.scaleY(_yScale);
            //add and load texture
            let texture = new ƒ.TextureImage(_texturePath);
            let textureCoat = new ƒ.CoatTextured();
            textureCoat.texture = texture;
            let material = new ƒ.Material(_name + "Material", ƒ.ShaderTexture, textureCoat);
            let cmpMaterial = new ƒ.ComponentMaterial(material);
            //add textured material to node
            this.addComponent(cmpMaterial);
            //add and possition hitbox
            this.hitbox = new ƒ.Rectangle(_spawnAtX, _spawnAtY, _xScale, _yScale, ƒ.ORIGIN2D.CENTER);
            //add sound if path is given
            if (_soundPath && _soundPath != "noSound") {
                this.sound = new ƒ.ComponentAudio(new ƒ.Audio(_soundPath), false, false);
                this.sound.connect(true);
                this.sound.volume = 0.5;
            }
        }
        checkCollision(_target) {
            return this.hitbox.collides(_target.hitbox);
        }
        checkHealth() {
            if (this.health < 1) {
                let parent = this.getParent();
                if (parent)
                    parent.removeChild(this);
            }
        }
        moveBy(_pos) {
            this.mtxLocal.translateX(_pos.x);
            this.mtxLocal.translateY(_pos.y);
            this.hitbox.position.x = this.mtxLocal.translation.x - this.hitbox.size.x / 2;
            this.hitbox.position.y = this.mtxLocal.translation.y - this.hitbox.size.y / 2;
        }
        moveTo(_pos) {
            this.mtxLocal.translateX(_pos.x - this.mtxLocal.translation.x);
            this.mtxLocal.translateY(_pos.y - this.mtxLocal.translation.y);
            this.hitbox.position.x = _pos.x - this.hitbox.size.x / 2;
            this.hitbox.position.y = _pos.y - this.hitbox.size.y / 2;
        }
        getPos() {
            return new ƒ.Vector2(this.mtxLocal.translation.x, this.mtxLocal.translation.y);
        }
        playSound() {
            if (this.sound)
                this.sound.play(true);
        }
    }
    DoodleSpace.BaseEntity = BaseEntity;
})(DoodleSpace || (DoodleSpace = {}));
//# sourceMappingURL=BaseEntity.js.map