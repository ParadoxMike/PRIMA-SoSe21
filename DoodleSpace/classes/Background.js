"use strict";
var DoodleSpace;
(function (DoodleSpace) {
    var ƒ = FudgeCore;
    class Background extends ƒ.Node {
        constructor() {
            super("Background");
            //add transform component and move background into possiton
            this.addComponent(new ƒ.ComponentTransform());
            this.mtxLocal.translateZ(-0.1);
            this.mtxLocal.translateX(17);
            //create and add a mesh
            let cmpMesh = new ƒ.ComponentMesh(new ƒ.MeshQuad("Quad"));
            this.addComponent(cmpMesh);
            //add and load texture
            let texture = new ƒ.TextureImage("./textures/bg.jpg");
            let textureCoat = new ƒ.CoatTextured();
            textureCoat.texture = texture;
            let backgroundMaterial = new ƒ.Material("Background Material", ƒ.ShaderTexture, textureCoat);
            let cmpBackgroundMaterial = new ƒ.ComponentMaterial(backgroundMaterial);
            //add textured material to node
            this.addComponent(cmpBackgroundMaterial);
            //scale background Mesh
            this.getComponent(ƒ.ComponentMesh).mtxPivot.scaleX(34);
            this.getComponent(ƒ.ComponentMesh).mtxPivot.scaleY(26);
        }
    }
    DoodleSpace.Background = Background;
})(DoodleSpace || (DoodleSpace = {}));
//# sourceMappingURL=Background.js.map