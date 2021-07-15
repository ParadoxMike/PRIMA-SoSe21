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
            // this.mtxLocal.translateX(_x);
            // this.mtxLocal.translateY(_y);
            //create and add an mesh
            let cmpMesh = new ƒ.ComponentMesh(new ƒ.MeshQuad("Quad"));
            this.addComponent(cmpMesh);
            let texture = new ƒ.TextureImage();
            let textureCoat = new ƒ.CoatTextured();
            let backgroundMaterial = new ƒ.Material("Background Material", ƒ.ShaderTexture, textureCoat);
            let cmpBackgroundMaterial = new ƒ.ComponentMaterial(backgroundMaterial);
            texture.load("./textures/bgTest.jpg");
            textureCoat.texture = texture;
            // cmpBackgroundMaterial.material = backgroundMaterial;
            this.getComponent(ƒ.ComponentMesh).mtxPivot.scaleX(34);
            this.getComponent(ƒ.ComponentMesh).mtxPivot.scaleY(26);
            this.addComponent(cmpBackgroundMaterial);
        }
    }
    DoodleSpace.Background = Background;
})(DoodleSpace || (DoodleSpace = {}));
//# sourceMappingURL=Background.js.map