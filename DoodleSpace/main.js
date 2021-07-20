"use strict";
var DoodleSpace;
(function (DoodleSpace) {
    var ƒ = FudgeCore;
    window.addEventListener("load", init);
    let worldNode = new ƒ.Node("World Node");
    let background;
    let player;
    let ufo;
    let aseroid;
    let viewport = new ƒ.Viewport();
    function init(_event) {
        background = new DoodleSpace.Background();
        player = new DoodleSpace.Player(2, 0);
        ufo = new DoodleSpace.EnemyType01(0, 6, 3);
        aseroid = new DoodleSpace.EnemyType00(0, 9, -4);
        const canvas = document.querySelector("canvas");
        // worldNode.addChild(Quad);
        // worldNode.addChild(generateDummy());
        worldNode.addChild(background);
        worldNode.addChild(player);
        worldNode.addChild(ufo);
        worldNode.addChild(aseroid);
        console.log(worldNode);
        // Quad.addComponent(new ƒ.ComponentTransform());
        // Quad.addComponent(new ƒ.ComponentMesh(meshQuad));
        // let material: ƒ.Material = new ƒ.Material("Florian", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(0, 1, 0, 1)));
        // let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(material);
        // Quad.addComponent(cmpMaterial);
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.mtxPivot.translateZ(35);
        cmpCamera.mtxPivot.translateX(16.8);
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
        // player.getComponent(ƒ.ComponentMesh).mtxPivot.rotateZ(rotSpeed * secondsSinceLastFrame);
        viewport.draw();
    }
})(DoodleSpace || (DoodleSpace = {}));
//# sourceMappingURL=main.js.map