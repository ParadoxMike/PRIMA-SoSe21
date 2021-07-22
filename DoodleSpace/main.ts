namespace DoodleSpace {
    import ƒ = FudgeCore;
    window.addEventListener("load", init);

    const fps: number = 60;
    const gameSpeed: number = 10;

    let counter: number = 0;

    let spawner: Spawner = new Spawner();

    let worldNode: ƒ.Node = new ƒ.Node("World Node");
    let playerProjectiles: PlayerProjectiles = new PlayerProjectiles();
    let enemies: Enemies = new Enemies();
    let background: Background;
    let player: Player;

    
    let viewport: ƒ.Viewport = new ƒ.Viewport();
    
    function init(_event: Event): void {

        background = new Background();
        player = new Player(1.5, 0);

        const canvas: HTMLCanvasElement = document.querySelector("canvas");

        // worldNode.addChild(Quad);
        // worldNode.addChild(generateDummy());
        worldNode.addChild(background);
        worldNode.addChild(player);
        worldNode.addChild(playerProjectiles);
        worldNode.addChild(enemies);
        console.log(worldNode);
        
        // Quad.addComponent(new ƒ.ComponentTransform());

        // Quad.addComponent(new ƒ.ComponentMesh(meshQuad));

        // let material: ƒ.Material = new ƒ.Material("Florian", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(0, 1, 0, 1)));
        // let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(material);
        // Quad.addComponent(cmpMaterial);

        let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
        cmpCamera.mtxPivot.translateZ(35);
        cmpCamera.mtxPivot.translateX(16.8);
        cmpCamera.mtxPivot.rotateY(180);
        // console.log(cmpCamera);

        viewport.initialize("Viewport", worldNode, cmpCamera, canvas);
        viewport.draw();

        
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, fps);
        ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, loop);
    }
    
    function loop(_event: Event): void {
        player.handleMovement(gameSpeed);
        player.handleFiring(playerProjectiles);

        playerProjectiles.handleMovement(gameSpeed*1.2);

        enemies.handleCollisionWithPlayerProjectiles(playerProjectiles);
        enemies.handleCollisionWithPlayer(player);
        enemies.handleMovement(gameSpeed/4);

        if (counter == fps){
            spawner.spawnEnemy(enemies);
            counter = 0;
        }
        else {
            counter++;
        }

        // console.log(_event);
        // let rotSpeed: number = 90;
        // let secondsSinceLastFrame: number = ƒ.Loop.timeFrameReal / 1000;
        // player.getComponent(ƒ.ComponentMesh).mtxPivot.rotateZ(rotSpeed * secondsSinceLastFrame);
        viewport.draw();
    }
}
