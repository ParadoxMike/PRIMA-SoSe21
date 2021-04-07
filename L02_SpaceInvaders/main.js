"use strict";
var L02_SpaceInvaders;
(function (L02_SpaceInvaders) {
    var ƒ = FudgeCore;
    window.addEventListener("load", init);
    //define globally used stuff
    L02_SpaceInvaders.quadMesh = new ƒ.MeshQuad("quadMesh");
    L02_SpaceInvaders.materialWhite = new ƒ.Material("materialWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 1, 1, 1)));
    L02_SpaceInvaders.materialGreen = new ƒ.Material("materialGreen", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(0, 1, 0, 1)));
    let viewport = new ƒ.Viewport();
    function init(_event) {
        //define master node
        let masterNode = new ƒ.Node("masterNode");
        //define main nodes
        let worldNode = new ƒ.Node("worldNode");
        let entityNode = new ƒ.Node("entityNode");
        //define world object and entity nodes
        let player = new L02_SpaceInvaders.Player(0, 0);
        let boss = new L02_SpaceInvaders.Boss(0, 12);
        let coversNode = new ƒ.Node("coversNode");
        L02_SpaceInvaders.createCovers(coversNode);
        let invadersNode = new ƒ.Node("invadersNode");
        L02_SpaceInvaders.createInvaders(invadersNode);
        const canvas = document.querySelector("canvas");
        //append world and entity nodes to main nodes
        worldNode.addChild(coversNode);
        entityNode.addChild(player);
        entityNode.addChild(boss);
        entityNode.addChild(invadersNode);
        //append main nodes to master node
        masterNode.addChild(worldNode);
        masterNode.addChild(entityNode);
        //define and possition camera
        let cmpCamera = new ƒ.ComponentCamera();
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
})(L02_SpaceInvaders || (L02_SpaceInvaders = {}));
//# sourceMappingURL=main.js.map