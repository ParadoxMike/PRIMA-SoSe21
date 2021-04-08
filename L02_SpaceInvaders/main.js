"use strict";
var L02_SpaceInvaders;
(function (L02_SpaceInvaders) {
    var ƒ = FudgeCore;
    window.addEventListener("load", init);
    //define globally used stuff
    L02_SpaceInvaders.gameSpeed = 10;
    L02_SpaceInvaders.quadMesh = new ƒ.MeshQuad("quadMesh");
    L02_SpaceInvaders.materialWhite = new ƒ.Material("materialWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 1, 1, 1)));
    L02_SpaceInvaders.materialGreen = new ƒ.Material("materialGreen", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(0, 1, 0, 1)));
    L02_SpaceInvaders.materialRed = new ƒ.Material("materialGreen", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 0, 0, 1)));
    L02_SpaceInvaders.playerFiring = false;
    //define world object and entity nodes
    let player;
    let boss;
    let coversNode;
    let invadersNode;
    let playerProjectileNode;
    //used in whole file
    let viewport = new ƒ.Viewport();
    function init(_event) {
        //define the canvas
        const canvas = document.querySelector("canvas");
        //define master node
        let masterNode = new ƒ.Node("masterNode");
        //define main nodes
        let worldNode = new ƒ.Node("worldNode");
        let entityNode = new ƒ.Node("entityNode");
        //init world object and entity nodes
        player = new L02_SpaceInvaders.Player(0, 0);
        boss = new L02_SpaceInvaders.Boss(0, 12);
        coversNode = new ƒ.Node("coversNode");
        L02_SpaceInvaders.createCovers(coversNode);
        invadersNode = new ƒ.Node("invadersNode");
        L02_SpaceInvaders.createInvaders(invadersNode);
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
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.mtxPivot.translateZ(20);
        cmpCamera.mtxPivot.translateY(6.5);
        cmpCamera.mtxPivot.rotateY(180);
        //initialize viewport and draw once
        viewport.initialize("Viewport", masterNode, cmpCamera, canvas);
        viewport.draw();
        //start game loop
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 30);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, loop);
    }
    function loop(_event) {
        let playerMovementCurrent = player.mtxLocal.translation.x;
        L02_SpaceInvaders.handlePlayerMovement(player, playerMovementCurrent);
        L02_SpaceInvaders.handlePlayerProjectile(playerProjectileNode, playerMovementCurrent);
        viewport.draw();
    }
})(L02_SpaceInvaders || (L02_SpaceInvaders = {}));
//# sourceMappingURL=main.js.map