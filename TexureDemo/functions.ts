namespace TexureDemo {
    import ƒ = FudgeCore;

    export function generateDummy(): ƒ.Node {
        let dummy: ƒ.Node = new ƒ.Node("Dummy");
        dummy.addComponent(new ƒ.ComponentTransform());
        dummy.mtxLocal.translateZ(-1);
        dummy.addComponent(new ƒ.ComponentMesh(new ƒ.MeshQuad("dummyMesh")));
        let dummyMaterial: ƒ.Material = new ƒ.Material("Dummy Material", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(0, 1, 0, 1)));
        let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(dummyMaterial);
        dummy.addComponent(cmpMaterial);

        return dummy;
    }
}