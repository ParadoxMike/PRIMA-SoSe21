namespace DoodleSpace {
    import ƒ = FudgeCore;
    window.addEventListener("load", init);

    let settings: any; //define settings object 

    let spawner: Spawner; //define spawner object

    //define Nodes globally
    let worldNode: ƒ.Node = new ƒ.Node("World Node");
    let playerProjectiles: PlayerProjectiles = new PlayerProjectiles();
    let enemyProjectiles: EnemyProjectiles = new EnemyProjectiles();
    let enemies: Enemies;
    let background: Background;
    let player: Player;

    //define viewport
    let viewport: ƒ.Viewport = new ƒ.Viewport();
    
    async function init(_event: Event): Promise<void> {
        settings = await (await fetch("./settings.json")).json(); //load settings from json into object

        //initialize nodes 
        background = new Background();
        player = new Player(1.5, 0);
        spawner = new Spawner(settings.fps, 1);
        enemies = new Enemies(settings.fps, 5);

        //get canves
        const canvas: HTMLCanvasElement = document.querySelector("canvas");

        //append all sub nodes to the worldNode
        worldNode.addChild(background);
        worldNode.addChild(player);
        worldNode.addChild(playerProjectiles);
        worldNode.addChild(enemyProjectiles);
        worldNode.addChild(enemies);
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
        ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, loop);
    }
    
    function loop(_event: Event): void {
        player.handleMovement(settings.gameSpeed);
        player.handleFiring(playerProjectiles);
        player.handleCollisionWithEnemyProjectiles(enemyProjectiles);

        playerProjectiles.handleMovement(settings.gameSpeed*1.2);
        enemyProjectiles.handleMovement(settings.gameSpeed*1.2);

        enemies.handleCollisionWithPlayerProjectiles(playerProjectiles);
        enemies.handleCollisionWithPlayer(player);
        enemies.handleMovement(settings.gameSpeed/4);
        enemies.handleFiring(enemyProjectiles);

        spawner.spawnEnemy(enemies);

        if(player.health < 1) //temorary game stop when player dies
            ƒ.Loop.stop();

        viewport.draw(); //draw the frame
    }
}
