namespace L02_SpaceInvaders {
    import ƒ = FudgeCore;
    window.addEventListener("load", init);
    
    //define globally used stuff
    export let gameSpeed: number = 10;
    export let quadMesh: ƒ.MeshQuad = new ƒ.MeshQuad("quadMesh");
    export let materialWhite: ƒ.Material = new ƒ.Material("materialWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 1, 1, 1)));
    export let materialGreen: ƒ.Material = new ƒ.Material("materialGreen", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(0, 1, 0, 1)));
    export let materialRed: ƒ.Material = new ƒ.Material("materialGreen", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 0, 0, 1)));
    export let playerFiring: boolean = false;
    export const movementBorderX: number = 8.5;
    
    //define world object and entity nodes
    let player: Player;
    let boss: Boss;
    let coversNode: ƒ.Node;
    export let invadersNode: InvadersNode;
    let playerProjectileNode: ƒ.Node;
    
    //used in whole file
    let viewport: ƒ.Viewport = new ƒ.Viewport();

    function init(_event: Event): void {
        //define the canvas
        const canvas: HTMLCanvasElement = document.querySelector("canvas");

        //define master node
        let masterNode: ƒ.Node = new ƒ.Node("masterNode");
        
        //define main nodes
        let worldNode: ƒ.Node = new ƒ.Node("worldNode");
        let entityNode: ƒ.Node = new ƒ.Node("entityNode");
        
        //init world object and entity nodes
        player = new Player(0, 0);
        boss = new Boss(0, 12);
        coversNode = new ƒ.Node("coversNode");
        createCovers(coversNode);
        invadersNode = new InvadersNode();
        invadersNode.createInvaders();
        playerProjectileNode = new ƒ.Node("playerProjectileNode");
    
        //append world and entity nodes to main nodes
        worldNode.addChild(coversNode);
        entityNode.addChild(player);
        entityNode.addChild(boss);
        entityNode.addChild(invadersNode);
        entityNode.addChild(playerProjectileNode);

        // entityNode.addChild(new Projectile(5, 0, "test"));

        //append main nodes to master node
        masterNode.addChild(worldNode);
        masterNode.addChild(entityNode);

        //define and possition camera
        let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
        cmpCamera.mtxPivot.translateZ(20);
        cmpCamera.mtxPivot.translateY(6.5);
        cmpCamera.mtxPivot.rotateY(180);

        //initialize viewport and draw once
        viewport.initialize("Viewport", masterNode, cmpCamera, canvas);
        viewport.draw();

        //start game loop
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 30);
        ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, loop);
    }

    function loop(_event: Event): void {
        let playerMovementCurrent: number = player.mtxLocal.translation.x;

        handlePlayerMovement(player, playerMovementCurrent);
        handlePlayerProjectile(playerProjectileNode, playerMovementCurrent);

        invadersNode.handleAllInvadersMovement();

        viewport.draw();
    }
}
