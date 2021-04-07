namespace L02_SpaceInvaders {
    import ƒ = FudgeCore;
    window.addEventListener("load", init);
    
    let gameSpeed: number = 10;
    
    //define globally used stuff
    export let quadMesh: ƒ.MeshQuad = new ƒ.MeshQuad("quadMesh");
    export let materialWhite: ƒ.Material = new ƒ.Material("materialWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 1, 1, 1)));
    export let materialGreen: ƒ.Material = new ƒ.Material("materialGreen", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(0, 1, 0, 1)));
    export let playerOffset: number;

    //define world object and entity nodes
    let player: Player;
    let boss: Boss;
    let coversNode: ƒ.Node;
    let invadersNode: ƒ.Node;

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
        invadersNode = new ƒ.Node("invadersNode");
        createInvaders(invadersNode);
    
        //append world and entity nodes to main nodes
        worldNode.addChild(coversNode);
        entityNode.addChild(player);
        entityNode.addChild(boss);
        entityNode.addChild(invadersNode);

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
        playerOffset = gameSpeed * ƒ.Loop.timeFrameReal / 1000;

        handlePlayerMovement(player);

        viewport.draw();
    }
}
