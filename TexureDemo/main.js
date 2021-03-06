"use strict";
var TexureDemo;
(function (TexureDemo) {
    var ƒ = FudgeCore;
    window.addEventListener("load", init);
    let worldNode = new ƒ.Node("World Node");
    let background;
    let player;
    let viewport = new ƒ.Viewport();
    function init(_event) {
        background = new TexureDemo.Background();
        player = new TexureDemo.Player(-10, 0);
        const canvas = document.querySelector("canvas");
        // worldNode.addChild(Quad);
        worldNode.addChild(TexureDemo.generateDummy());
        worldNode.addChild(background);
        worldNode.addChild(player);
        console.log(worldNode);
        // Quad.addComponent(new ƒ.ComponentTransform());
        // Quad.addComponent(new ƒ.ComponentMesh(meshQuad));
        // let material: ƒ.Material = new ƒ.Material("Florian", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(0, 1, 0, 1)));
        // let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(material);
        // Quad.addComponent(cmpMaterial);
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.mtxPivot.translateZ(35);
        cmpCamera.mtxPivot.rotateY(180);
        // console.log(cmpCamera);
        viewport.initialize("Viewport", worldNode, cmpCamera, canvas);
        viewport.draw();
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 60);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
    }
    function update(_event) {
        // console.log(_event);
        // let rotSpeed: number = 90;
        // let secondsSinceLastFrame: number = ƒ.Loop.timeFrameReal / 1000;
        // Quad.getComponent(ƒ.ComponentMesh).mtxPivot.rotateZ(rotSpeed * secondsSinceLastFrame);
        viewport.draw();
    }
})(TexureDemo || (TexureDemo = {}));
//# sourceMappingURL=main.js.map