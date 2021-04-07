namespace L02_SpaceInvaders {
    import ƒ = FudgeCore;
    window.addEventListener("load", init);

    //define globally used stuff
    export let quadMesh: ƒ.MeshQuad = new ƒ.MeshQuad("quadMesh");
    export let materialWhite: ƒ.Material = new ƒ.Material("materialWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 1, 1, 1)));
    export let materialGreen: ƒ.Material = new ƒ.Material("materialGreen", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(0, 1, 0, 1)));

    let viewport: ƒ.Viewport = new ƒ.Viewport();


    function init(_event: Event): void {
        //define master node
        let masterNode: ƒ.Node = new ƒ.Node("masterNode");
        
        //define main nodes
        let worldNode: ƒ.Node = new ƒ.Node("worldNode");
        let entityNode: ƒ.Node = new ƒ.Node("entityNode");
        
        //define world object and entity nodes
        let player: ƒ.Node = new Player(0, 0);
        let boss: ƒ.Node = new Boss(0, 12);
        let coversNode: ƒ.Node = new ƒ.Node("coversNode");
        createCovers(coversNode);
        let invadersNode: ƒ.Node = new ƒ.Node("invadersNode");
        createInvaders(invadersNode);

        const canvas: HTMLCanvasElement = document.querySelector("canvas");


    
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

        console.log(boss);
        boss.mtxLocal.translation.set(0, 0, 0);
        console.log(boss);

        //initialize viewport and draw once
        viewport.initialize("Viewport", masterNode, cmpCamera, canvas);
        viewport.draw();
    }
}
