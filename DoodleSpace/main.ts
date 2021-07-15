namespace DoodleSpace {
    import ƒ = FudgeCore;
    window.addEventListener("load", init);

    let worldNode: ƒ.Node = new ƒ.Node("World Node");
    let background: Background;
    let player: Player;
    
    let viewport: ƒ.Viewport = new ƒ.Viewport();
    
    function init(_event: Event): void {

        background = new Background();
        player = new Player(-10, 0);


        const canvas: HTMLCanvasElement = document.querySelector("canvas");

        // worldNode.addChild(Quad);
        worldNode.addChild(generateDummy());
        worldNode.addChild(background);
        worldNode.addChild(player);
        console.log(worldNode);
        
        // Quad.addComponent(new ƒ.ComponentTransform());

        // Quad.addComponent(new ƒ.ComponentMesh(meshQuad));

        // let material: ƒ.Material = new ƒ.Material("Florian", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(0, 1, 0, 1)));
        // let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(material);
        // Quad.addComponent(cmpMaterial);

        let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
        cmpCamera.mtxPivot.translateZ(35);
        cmpCamera.mtxPivot.rotateY(180);
        // console.log(cmpCamera);

        viewport.initialize("Viewport", worldNode, cmpCamera, canvas);
        viewport.draw();

        
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 60);
        ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    }
    
    function update(_event: Event): void {
        // console.log(_event);
        // let rotSpeed: number = 90;
        // let secondsSinceLastFrame: number = ƒ.Loop.timeFrameReal / 1000;
        // Quad.getComponent(ƒ.ComponentMesh).mtxPivot.rotateZ(rotSpeed * secondsSinceLastFrame);
        viewport.draw();
    }
}
