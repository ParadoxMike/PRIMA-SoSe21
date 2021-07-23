"use strict";
var DoodleSpace;
(function (DoodleSpace) {
    var ƒ = FudgeCore;
    window.addEventListener("load", init);
    let settings; //define settings object 
    let spawner; //define spawner object
    //define Nodes globally
    let worldNode = new ƒ.Node("World Node");
    let playerProjectiles = new DoodleSpace.PlayerProjectiles();
    let enemyProjectiles = new DoodleSpace.EnemyProjectiles();
    let enemies;
    let background;
    let player;
    let healthPacks;
    //define viewport
    let viewport = new ƒ.Viewport();
    async function init(_event) {
        settings = await (await fetch("./settings.json")).json(); //load settings from json into object
        //initialize nodes 
        background = new DoodleSpace.Background();
        player = new DoodleSpace.Player(settings.fps, settings.player.shotsPerSecond);
        spawner = new DoodleSpace.Spawner(settings.fps, settings.enemy.spawnsPerSecond);
        enemies = new DoodleSpace.Enemies(settings.fps, settings.enemy.shotsPerSecond, settings.enemy.shotChance, settings.enemy.healthPackChance);
        healthPacks = new DoodleSpace.HealthPacks();
        //get canves
        const canvas = document.querySelector("canvas");
        //append all sub nodes to the worldNode
        worldNode.addChild(background);
        worldNode.addChild(player);
        worldNode.addChild(playerProjectiles);
        worldNode.addChild(enemyProjectiles);
        worldNode.addChild(enemies);
        worldNode.addChild(healthPacks);
        console.log(worldNode);
        //setup Camera
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.mtxPivot.translateZ(35);
        cmpCamera.mtxPivot.translateX(16.8);
        cmpCamera.mtxPivot.rotateY(180);
        //init viewport and draw for the first time
        viewport.initialize("Viewport", worldNode, cmpCamera, canvas);
        viewport.draw();
        //start the loop
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, settings.fps);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, loop);
    }
    function loop(_event) {
        player.handleMovement(settings.gameSpeed * settings.player.speed);
        player.handleFiring(playerProjectiles);
        player.handleCollisionWithEnemyProjectiles(enemyProjectiles);
        playerProjectiles.handleMovement(settings.gameSpeed * settings.player.projectileSpeed);
        enemyProjectiles.handleMovement(settings.gameSpeed * settings.enemy.projectileSpeed);
        enemies.handleCollisionWithPlayerProjectiles(playerProjectiles, healthPacks);
        enemies.handleCollisionWithPlayer(player);
        enemies.handleMovement(settings.gameSpeed * settings.enemy.speed);
        enemies.handleFiring(enemyProjectiles);
        healthPacks.handleCollisionWithPlayer(player);
        spawner.spawnEnemy(enemies);
        if (player.health < 1) //temorary game stop when player dies
            ƒ.Loop.stop();
        viewport.draw(); //draw the frame
    }
})(DoodleSpace || (DoodleSpace = {}));
//# sourceMappingURL=main.js.map