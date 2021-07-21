namespace DoodleSpace {
    import ƒ = FudgeCore;
    //Basic class for moveable and textured Nodes with a Hitbox - is the base for every enemy and the player

    export class BaseEntity extends ƒ.Node {
        public hitbox: ƒ.Rectangle;

        constructor(_spawnAtX: number, _spawnAtY: number, _xScale: number, _yScale: number, _name: string, _texturePath: string = "./textures/default.png") {
            super(_name);
            
            //add transform component and move into possiton
            this.addComponent(new ƒ.ComponentTransform());
            this.mtxLocal.translateX(_spawnAtX);
            this.mtxLocal.translateY(_spawnAtY);

            //create, add and scale mesh
            let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(new ƒ.MeshQuad("Quad"));
            this.addComponent(cmpMesh);
            this.getComponent(ƒ.ComponentMesh).mtxPivot.scaleX(_xScale);
            this.getComponent(ƒ.ComponentMesh).mtxPivot.scaleY(_yScale);

            //add and load texture
            let texture: ƒ.TextureImage = new ƒ.TextureImage(_texturePath);
            let textureCoat: ƒ.CoatTextured = new ƒ.CoatTextured();
            textureCoat.texture = texture;
            let material: ƒ.Material = new ƒ.Material(_name + "Material", ƒ.ShaderTexture, textureCoat);
            let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(material);

            //add textured material to node
            this.addComponent(cmpMaterial);

            //add and possition hitbox
            this.hitbox = new ƒ.Rectangle(_spawnAtX, _spawnAtY, _xScale, _yScale, ƒ.ORIGIN2D.CENTER);
        }

        public checkCollision(_target: BaseEntity): boolean {
            return this.hitbox.collides(_target.hitbox);
        }

        public moveBy(_pos: ƒ.Vector2): void {
            this.mtxLocal.translateX(_pos.x);
            this.mtxLocal.translateY(_pos.y);
            this.hitbox.position.x = this.mtxLocal.translation.x - this.hitbox.size.x / 2;
            this.hitbox.position.y = this.mtxLocal.translation.y - this.hitbox.size.y / 2;
        }

        public moveTo(_pos: ƒ.Vector2): void {
            this.mtxLocal.translateX(_pos.x - this.mtxLocal.translation.x);
            this.mtxLocal.translateY(_pos.y - this.mtxLocal.translation.y);
            this.hitbox.position.x = _pos.x - this.hitbox.size.x / 2;
            this.hitbox.position.y = _pos.y - this.hitbox.size.y / 2;
        }

        public getPos(): ƒ.Vector2 {
            return new ƒ.Vector2(this.mtxLocal.translation.x, this.mtxLocal.translation.y);
        }
    }
}