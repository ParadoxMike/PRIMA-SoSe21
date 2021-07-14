"use strict";
var DoodleSpace;
(function (DoodleSpace) {
    var ƒ = FudgeCore;
    window.addEventListener("load", init);
    let worldNode = new ƒ.Node("World Node");
    let viewport = new ƒ.Viewport();
    function init(_event) {
        const canvas = document.querySelector("canvas");
        worldNode.addComponent(new ƒ.ComponentTransform());
        let mesh = new ƒ.MeshQuad("Quad");
        worldNode.addComponent(new ƒ.ComponentMesh(mesh));
        let material = new ƒ.Material("Florian", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 1, 1, 1)));
        let cmpMaterial = new ƒ.ComponentMaterial(material);
        worldNode.addComponent(cmpMaterial);
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.mtxPivot.translateZ(5);
        cmpCamera.mtxPivot.rotateY(180);
        // console.log(cmpCamera);
        viewport.initialize("Viewport", worldNode, cmpCamera, canvas);
        viewport.draw();
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 60);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
    }
    function update(_event) {
        // console.log(_event);
        let rotSpeed = 90;
        let secondsSinceLastFrame = ƒ.Loop.timeFrameReal / 1000;
        worldNode.getComponent(ƒ.ComponentMesh).mtxPivot.rotateZ(rotSpeed * secondsSinceLastFrame);
        viewport.draw();
    }
})(DoodleSpace || (DoodleSpace = {}));
//# sourceMappingURL=main.js.map