namespace DoodleSpace {
    import ƒ = FudgeCore;
    window.addEventListener("load", load);
    
    let settings: any; //define settings object 
    
    let spawner: Spawner; //define spawner object

    let cmpAudioBackgroundMusic: ƒ.ComponentAudio; //deffine background music component

    let soundPaths = {
        enemy_hit: "noSound",
        hp_up: "noSound",
        player_hit: "noSound",
        shot: "noSound"
    };
    
    //define Nodes globally
    let worldNode: ƒ.Node;
    let playerProjectiles: PlayerProjectiles;
    let enemyProjectiles: EnemyProjectiles;
    let enemies: Enemies;
    let background: Background;
    let player: Player;
    let healthPacks: HealthPacks;
    
    //define & init viewport
    let viewport: ƒ.Viewport = new ƒ.Viewport();

    async function load(_event: Event): Promise<void> {
        settings = await (await fetch("./settings.json")).json(); //load settings from json into object
        document.getElementById("btn_start").addEventListener("click", startBtn);
        document.getElementById("btn_retry").addEventListener("click", retryBtn);
        
        cmpAudioBackgroundMusic = new ƒ.ComponentAudio(new ƒ.Audio("./sounds/background_music.mp3"), true, false);
        cmpAudioBackgroundMusic.connect(true);
    }

    function startBtn(_event: Event): void {
        const difficulty: HTMLSelectElement = document.getElementById("difficulty") as HTMLSelectElement;
        const soundSelect: HTMLSelectElement = document.getElementById("sound") as HTMLSelectElement;

        document.getElementsByClassName("start_screen")[0].classList.add("inviasble");
        
        if (difficulty.value as unknown as number == 2) {
            settings.enemy.spawnsPerSecond = 2;
            settings.enemy.ufoHealth = 2;
        }
        else if (difficulty.value as unknown as number  == 3) {
            settings.enemy.spawnsPerSecond = 2;
            settings.enemy.asteroidHealth = 2;
            settings.enemy.ufoHealth = 3;
            settings.enemy.speed = 0.5
        }

        if (soundSelect.value == "1") {
            cmpAudioBackgroundMusic.play(true);
            soundPaths = {
                enemy_hit: "./sounds/enemy_hit.wav",
                hp_up: "./sounds/hp_up.mp3",
                player_hit: "./sounds/player_hit.wav",
                shot: "./sounds/shot.mp3"
            };
        }
        

        init(_event);
    }

    function retryBtn(_event: Event): void {
        init(_event);
        document.getElementsByClassName("game_over_screen")[0].classList.remove("viasble");
    }
    
    function init(_event: Event): void {
        //initialize nodes 
        worldNode = new ƒ.Node("World Node");
        playerProjectiles = new PlayerProjectiles();
        enemyProjectiles = new EnemyProjectiles(soundPaths.player_hit);
        background = new Background();
        player = new Player(settings.fps, settings.player.shotsPerSecond, soundPaths.shot);
        spawner = new Spawner(settings.fps, settings.enemy.spawnsPerSecond);
        enemies = new Enemies(settings.fps, settings.enemy.shotsPerSecond, settings.enemy.shotChance, settings.enemy.healthPackChance, settings.enemy.asteroidHealth, settings.enemy.ufoHealth, soundPaths.enemy_hit);
        healthPacks = new HealthPacks(soundPaths.hp_up);

        //get canves
        const canvas: HTMLCanvasElement = document.querySelector("canvas");

        //append all sub nodes to the worldNode
        worldNode.addChild(background);
        worldNode.addChild(player);
        worldNode.addChild(playerProjectiles);
        worldNode.addChild(enemyProjectiles);
        worldNode.addChild(enemies);
        worldNode.addChild(healthPacks);
        console.log(worldNode);

        //setup Camera
        let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
        cmpCamera.mtxPivot.translateZ(35);
        cmpCamera.mtxPivot.translateX(16.8);
        cmpCamera.mtxPivot.rotateY(180);

        //init viewport and draw for the first time
        viewport.initialize("Viewport", worldNode, cmpCamera, canvas);
        viewport.draw();

        //start the loop
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, settings.fps);
        ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, gameLoop);
    }
    
    function gameLoop(_event: Event): void {
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

        if(player.health < 1) { //temorary game stop when player dies
            ƒ.Loop.stop();
            document.getElementsByClassName("game_over_screen")[0].classList.add("viasble");
        }

        viewport.draw(); //draw the frame

        updateUI(player);
    }
}
