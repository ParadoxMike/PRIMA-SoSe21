"use strict";
var DoodleSpace;
(function (DoodleSpace) {
    var ƒ = FudgeCore;
    function generateDummy() {
        let dummy = new ƒ.Node("Dummy");
        dummy.addComponent(new ƒ.ComponentTransform());
        dummy.mtxLocal.translateZ(-1);
        dummy.addComponent(new ƒ.ComponentMesh(new ƒ.MeshQuad("dummyMesh")));
        let dummyMaterial = new ƒ.Material("Dummy Material", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(0, 1, 0, 1)));
        let cmpMaterial = new ƒ.ComponentMaterial(dummyMaterial);
        dummy.addComponent(cmpMaterial);
        return dummy;
    }
    DoodleSpace.generateDummy = generateDummy;
})(DoodleSpace || (DoodleSpace = {}));
//# sourceMappingURL=functions.js.map