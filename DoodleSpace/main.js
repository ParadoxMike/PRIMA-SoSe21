"use strict";
var DoodleSpace;
(function (DoodleSpace) {
    var ƒ = FudgeCore;
    window.addEventListener("load", init);
    let settings;
    let spawner;
    let worldNode = new ƒ.Node("World Node");
    let playerProjectiles = new DoodleSpace.PlayerProjectiles();
    let enemyProjectiles = new DoodleSpace.EnemyProjectiles();
    let enemies;
    let background;
    let player;
    let viewport = new ƒ.Viewport();
    async function init(_event) {
        settings = await (await fetch("./settings.json")).json();
        background = new DoodleSpace.Background();
        player = new DoodleSpace.Player(1.5, 0);
        spawner = new DoodleSpace.Spawner(settings.fps, 1);
        enemies = new DoodleSpace.Enemies(settings.fps, 5);
        const canvas = document.querySelector("canvas");
        // worldNode.addChild(Quad);
        // worldNode.addChild(generateDummy());
        worldNode.addChild(background);
        worldNode.addChild(player);
        worldNode.addChild(playerProjectiles);
        worldNode.addChild(enemyProjectiles);
        worldNode.addChild(enemies);
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
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, settings.fps);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, loop);
    }
    function loop(_event) {
        player.handleMovement(settings.gameSpeed);
        player.handleFiring(playerProjectiles);
        playerProjectiles.handleMovement(settings.gameSpeed * 1.2);
        enemyProjectiles.handleMovement(settings.gameSpeed * 1.2);
        enemies.handleCollisionWithPlayerProjectiles(playerProjectiles);
        enemies.handleCollisionWithPlayer(player);
        enemies.handleMovement(settings.gameSpeed / 4);
        enemies.handleFiring(enemyProjectiles);
        spawner.spawnEnemy(enemies);
        if (player.health < 1)
            ƒ.Loop.stop();
        // console.log(_event);
        // let rotSpeed: number = 90;
        // let secondsSinceLastFrame: number = ƒ.Loop.timeFrameReal / 1000;
        // player.getComponent(ƒ.ComponentMesh).mtxPivot.rotateZ(rotSpeed * secondsSinceLastFrame);
        viewport.draw();
    }
})(DoodleSpace || (DoodleSpace = {}));
//# sourceMappingURL=main.js.map