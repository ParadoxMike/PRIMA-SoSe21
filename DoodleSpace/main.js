"use strict";
var DoodleSpace;
(function (DoodleSpace) {
    var ƒ = FudgeCore;
    window.addEventListener("load", load);
    let settings; //define settings object 
    let spawner; //define spawner object
    let cmpAudioBackgroundMusic; //deffine background music component
    //define Nodes globally
    let worldNode;
    let playerProjectiles;
    let enemyProjectiles;
    let enemies;
    let background;
    let player;
    let healthPacks;
    //define & init viewport
    let viewport = new ƒ.Viewport();
    async function load(_event) {
        settings = await (await fetch("./settings.json")).json(); //load settings from json into object
        document.getElementById("btn_start").addEventListener("click", startBtn);
        document.getElementById("btn_retry").addEventListener("click", retryBtn);
        cmpAudioBackgroundMusic = new ƒ.ComponentAudio(new ƒ.Audio("./sounds/background_music.mp3"), true, false);
        cmpAudioBackgroundMusic.connect(true);
    }
    function startBtn(_event) {
        const difficulty = document.getElementById("difficulty");
        const soundSelect = document.getElementById("sound");
        document.getElementsByClassName("start_screen")[0].classList.add("inviasble");
        if (difficulty.value == 2) {
            settings.enemy.spawnsPerSecond = 2;
            settings.enemy.ufoHealth = 2;
        }
        else if (difficulty.value == 3) {
            settings.enemy.spawnsPerSecond = 2;
            settings.enemy.asteroidHealth = 2;
            settings.enemy.ufoHealth = 3;
            settings.enemy.speed = 0.5;
        }
        cmpAudioBackgroundMusic.play(soundSelect.value);
        init(_event);
    }
    function retryBtn(_event) {
        init(_event);
        document.getElementsByClassName("game_over_screen")[0].classList.remove("viasble");
    }
    function init(_event) {
        //initialize nodes 
        worldNode = new ƒ.Node("World Node");
        playerProjectiles = new DoodleSpace.PlayerProjectiles();
        enemyProjectiles = new DoodleSpace.EnemyProjectiles();
        background = new DoodleSpace.Background();
        player = new DoodleSpace.Player(settings.fps, settings.player.shotsPerSecond);
        spawner = new DoodleSpace.Spawner(settings.fps, settings.enemy.spawnsPerSecond);
        enemies = new DoodleSpace.Enemies(settings.fps, settings.enemy.shotsPerSecond, settings.enemy.shotChance, settings.enemy.healthPackChance, settings.enemy.asteroidHealth, settings.enemy.ufoHealth);
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
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, gameLoop);
    }
    function gameLoop(_event) {
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
        if (player.health < 1) { //temorary game stop when player dies
            ƒ.Loop.stop();
            document.getElementsByClassName("game_over_screen")[0].classList.add("viasble");
        }
        viewport.draw(); //draw the frame
        DoodleSpace.updateUI(player);
    }
})(DoodleSpace || (DoodleSpace = {}));
//# sourceMappingURL=main.js.map