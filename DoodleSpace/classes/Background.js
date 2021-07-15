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
            //create and add a mesh
            let cmpMesh = new ƒ.ComponentMesh(new ƒ.MeshQuad("Quad"));
            this.addComponent(cmpMesh);
            //add and load texture
            let texture = new ƒ.TextureImage();
            let textureCoat = new ƒ.CoatTextured();
            let backgroundMaterial = new ƒ.Material("Background Material", ƒ.ShaderTexture, textureCoat);
            let cmpBackgroundMaterial = new ƒ.ComponentMaterial(backgroundMaterial);
            texture.load("./textures/bg.jpg");
            textureCoat.texture = texture;
            //fix texture 
            cmpBackgroundMaterial.mtxPivot = ƒ.Matrix3x3.PROJECTION(-2, -2);
            cmpBackgroundMaterial.mtxPivot.rotate(180);
            cmpBackgroundMaterial.mtxPivot.translateX(0.5);
            cmpBackgroundMaterial.mtxPivot.translateY(0.5);
            //scale background Mesh
            this.getComponent(ƒ.ComponentMesh).mtxPivot.scaleX(34);
            this.getComponent(ƒ.ComponentMesh).mtxPivot.scaleY(26);
            //add textured material to node
            this.addComponent(cmpBackgroundMaterial);
        }
    }
    DoodleSpace.Background = Background;
})(DoodleSpace || (DoodleSpace = {}));
//# sourceMappingURL=Background.js.map