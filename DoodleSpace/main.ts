namespace DoodleSpace {
    import ƒ = FudgeCore;
    window.addEventListener("load", init);

    const fps: number = 60;
    export const gameSpeed: number = 10;

    let worldNode: ƒ.Node = new ƒ.Node("World Node");
    let playerProjectiles: PlayerProjectiles = new PlayerProjectiles();
    let background: Background;
    let player: Player;
    
    let ufo: EnemyType01;
    let aseroid: EnemyType00;
    
    let viewport: ƒ.Viewport = new ƒ.Viewport();
    
    function init(_event: Event): void {

        background = new Background();
        player = new Player(1.5, 0);

        ufo = new EnemyType01(0, 6, 3);
        aseroid = new EnemyType00(0, 9, -4);


        const canvas: HTMLCanvasElement = document.querySelector("canvas");

        // worldNode.addChild(Quad);
        // worldNode.addChild(generateDummy());
        worldNode.addChild(background);
        worldNode.addChild(player);
        worldNode.addChild(playerProjectiles);
        worldNode.addChild(ufo);
        worldNode.addChild(aseroid);
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
        player.handleMovement();
        player.handleFiring(playerProjectiles);

        playerProjectiles.handleMovement();

        // console.log(_event);
        // let rotSpeed: number = 90;
        // let secondsSinceLastFrame: number = ƒ.Loop.timeFrameReal / 1000;
        // player.getComponent(ƒ.ComponentMesh).mtxPivot.rotateZ(rotSpeed * secondsSinceLastFrame);
        viewport.draw();
    }
}
